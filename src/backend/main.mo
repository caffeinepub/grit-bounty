import Principal "mo:core/Principal";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Nat64 "mo:core/Nat64";
import Int "mo:core/Int";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Runtime "mo:core/Runtime";
import ICP "mo:core/Nat64";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type TransactionType = {
    #deposit;
    #withdrawal;
    #taskPayment;
    #taskDeduction;
    #bountyContribution;
  };

  public type TransactionStatus = {
    #pending;
    #success;
    #failed;
  };

  public type Difficulty = {
    #easy;
    #medium;
    #hard;
  };

  public type QuestStatus = {
    #active;
    #inProgress;
    #pendingVerification;
    #completed;
    #disputed;
    #cancelled;
  };

  public type BountyContribution = {
    contributorId : Principal;
    amountE8 : Nat64;
    timestamp : Int;
  };

  public type CheckInRecord = {
    dayNumber : Nat;
    timestamp : Int;
    statusText : Text;
    photoUrl : ?Text;
  };

  public type Quest = {
    questId : Nat;
    title : Text;
    description : Text;
    difficulty : Difficulty;
    publisherId : Principal;
    warriorId : ?Principal;
    status : QuestStatus;
    reward : Nat64;
    originalBountyAmountE8 : Nat64;
    bountyContributions : List.List<BountyContribution>;
    depositAmount : Nat64;
    depositRate : Nat;
    createdAt : Int;
    acceptedAt : ?Int;
    completedAt : ?Int;
    hypeCount : Nat;
    dailyCheckIns : List.List<CheckInRecord>;
    completionTarget : Nat;
    currentStreak : Nat;
    participantCount : Nat;
  };

  public type QuestImmutable = {
    questId : Nat;
    title : Text;
    description : Text;
    reward : Nat64;
    difficulty : Difficulty;
    publisherId : Principal;
    warriorId : ?Principal;
    status : QuestStatus;
    originalBountyAmountE8 : Nat64;
    bountyContributions : [BountyContribution];
    depositAmount : Nat64;
    depositRate : Nat;
    createdAt : Int;
    acceptedAt : ?Int;
    completedAt : ?Int;
    hypeCount : Nat;
    dailyCheckIns : [CheckInRecord];
    completionTarget : Nat;
    currentStreak : Nat;
    participantCount : Nat;
  };

  public type Transaction = {
    id : Nat;
    timestamp : Int;
    transactionType : TransactionType;
    amountE8 : Nat64;
    from : Principal;
    to : Principal;
    status : TransactionStatus;
  };

  public type UserProfile = {
    name : Text;
    successfulQuests : Nat;
    depositRate : Nat;
    totalEarned : Nat64;
    totalDeposited : Nat64;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let userBalances = Map.empty<Principal, Nat64>();
  let quests = Map.empty<Nat, Quest>();
  var nextQuestId = 1;
  var systemBountyBalance : Nat64 = 0;
  var nextTransactionId = 0;
  let transactions = Map.empty<Nat, Transaction>();

  include MixinStorage();

  private func getUserBalance(user : Principal) : Nat64 {
    switch (userBalances.get(user)) {
      case (null) { 0 };
      case (?balance) { balance };
    };
  };

  private func setUserBalance(user : Principal, balance : Nat64) {
    userBalances.add(user, balance);
  };

  private func recordTransaction(txType : TransactionType, amount : Nat64, from : Principal, to : Principal, status : TransactionStatus) : Nat {
    let txId = nextTransactionId;
    nextTransactionId += 1;

    let tx : Transaction = {
      id = txId;
      timestamp = Time.now();
      transactionType = txType;
      amountE8 = amount;
      from;
      to;
      status;
    };

    transactions.add(txId, tx);
    txId;
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public query ({ caller }) func getTransactionsView() : async [(Nat, Transaction)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view transactions");
    };

    // Admins can see all transactions
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return transactions.toArray();
    };

    // Regular users can only see their own transactions
    let userTransactions = transactions.filter(
      func(_, tx) {
        tx.from == caller or tx.to == caller
      }
    );
    userTransactions.toArray();
  };

  public query ({ caller }) func getActiveQuests(difficulty : ?Difficulty) : async [QuestImmutable] {
    // Allow any authenticated user (including guests) to view active quests
    // This is a public marketplace feature
    let filtered = switch (difficulty) {
      case (null) {
        quests.filter(func(_, quest) { quest.status == #active });
      };
      case (?diff) {
        quests.filter(
          func(_, quest) {
            quest.status == #active and quest.difficulty == diff
          }
        );
      };
    };

    filtered.values().toArray().map(
      func(q) {
        {
          questId = q.questId;
          title = q.title;
          description = q.description;
          reward = q.reward;
          difficulty = q.difficulty;
          publisherId = q.publisherId;
          warriorId = q.warriorId;
          status = q.status;
          originalBountyAmountE8 = q.originalBountyAmountE8;
          bountyContributions = q.bountyContributions.toArray();
          depositAmount = q.depositAmount;
          depositRate = q.depositRate;
          createdAt = q.createdAt;
          acceptedAt = q.acceptedAt;
          completedAt = q.completedAt;
          hypeCount = q.hypeCount;
          dailyCheckIns = q.dailyCheckIns.toArray();
          completionTarget = q.completionTarget;
          currentStreak = q.currentStreak;
          participantCount = q.participantCount;
        };
      }
    );
  };

  public query ({ caller }) func getMyPostedBounties() : async [QuestImmutable] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their posted bounties");
    };

    let filteredQuests = quests.filter(
      func(_k, quest) {
        quest.publisherId == caller;
      }
    );

    filteredQuests.values().toArray().map(
      func(q) {
        {
          questId = q.questId;
          title = q.title;
          description = q.description;
          reward = q.reward;
          difficulty = q.difficulty;
          publisherId = q.publisherId;
          warriorId = q.warriorId;
          status = q.status;
          originalBountyAmountE8 = q.originalBountyAmountE8;
          bountyContributions = q.bountyContributions.toArray();
          depositAmount = q.depositAmount;
          depositRate = q.depositRate;
          createdAt = q.createdAt;
          acceptedAt = q.acceptedAt;
          completedAt = q.completedAt;
          hypeCount = q.hypeCount;
          dailyCheckIns = q.dailyCheckIns.toArray();
          completionTarget = q.completionTarget;
          currentStreak = q.currentStreak;
          participantCount = q.participantCount;
        };
      }
    );
  };

  public query ({ caller }) func getMyAcceptedQuests() : async [QuestImmutable] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their accepted quests");
    };

    let filteredQuests = quests.filter(
      func(_k, quest) {
        switch (quest.warriorId) {
          case (null) { false };
          case (?id) { id == caller };
        };
      }
    );

    filteredQuests.values().toArray().map(
      func(q) {
        {
          questId = q.questId;
          title = q.title;
          description = q.description;
          reward = q.reward;
          difficulty = q.difficulty;
          publisherId = q.publisherId;
          warriorId = q.warriorId;
          status = q.status;
          originalBountyAmountE8 = q.originalBountyAmountE8;
          bountyContributions = q.bountyContributions.toArray();
          depositAmount = q.depositAmount;
          depositRate = q.depositRate;
          createdAt = q.createdAt;
          acceptedAt = q.acceptedAt;
          completedAt = q.completedAt;
          hypeCount = q.hypeCount;
          dailyCheckIns = q.dailyCheckIns.toArray();
          completionTarget = q.completionTarget;
          currentStreak = q.currentStreak;
          participantCount = q.participantCount;
        };
      }
    );
  };

  public type BountyTransaction = {
    contributorId : Principal;
    amountE8 : Nat64;
    timestamp : Int;
  };

  public shared ({ caller }) func addToBounty(questId : Nat, amountE8 : Nat64) : async () {
    // Authorization: Only authenticated users can contribute
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can contribute to bounties");
    };

    // Validate amount
    if (amountE8 == 0) {
      Runtime.trap("Contribution amount must be greater than zero");
    };

    // Get quest and validate
    let quest = switch (quests.get(questId)) {
      case (null) { Runtime.trap("Quest not found") };
      case (?quest) { quest };
    };

    if (quest.status != #active) {
      Runtime.trap("Quest is not active");
    };

    // Authorization: Prevent conflicts of interest
    // Publisher cannot contribute to their own quest
    if (quest.publisherId == caller) {
      Runtime.trap("Unauthorized: Quest publisher cannot contribute to their own quest");
    };

    // Warrior cannot contribute to quest they accepted
    switch (quest.warriorId) {
      case (?warriorId) {
        if (warriorId == caller) {
          Runtime.trap("Unauthorized: Quest warrior cannot contribute to their own quest");
        };
      };
      case (null) {};
    };

    // Validate user has sufficient balance
    let userBalance = getUserBalance(caller);
    if (userBalance < amountE8) {
      Runtime.trap("Insufficient balance: User does not have enough funds");
    };

    // Deduct from user's wallet
    let newUserBalance = userBalance - amountE8;
    setUserBalance(caller, newUserBalance);

    // Create contribution record
    let bountyContribution : BountyContribution = {
      contributorId = caller;
      amountE8;
      timestamp = Time.now();
    };

    // Update quest with contribution
    let currentContributions = quest.bountyContributions.clone();
    currentContributions.add(bountyContribution);
    let updatedQuest : Quest = {
      quest with
      bountyContributions = currentContributions;
      reward = quest.reward + amountE8;
      hypeCount = quest.hypeCount + 1;
    };

    quests.add(questId, updatedQuest);

    // Add to system escrow
    systemBountyBalance += amountE8;

    // Record transaction
    let systemPrincipal = Principal.fromText("aaaaa-aa");
    ignore recordTransaction(#bountyContribution, amountE8, caller, systemPrincipal, #success);
  };

  public shared ({ caller }) func createQuest(title : Text, description : Text, reward : Nat64, difficulty : Difficulty, participantCount : ?Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create quests");
    };

    if (reward == 0) {
      Runtime.trap("Reward pool must be greater than zero");
    };

    // Validate user has sufficient balance for initial bounty
    let userBalance = getUserBalance(caller);
    if (userBalance < reward) {
      Runtime.trap("Insufficient balance: User does not have enough funds to create quest");
    };

    // Deduct initial bounty from user's wallet
    let newUserBalance = userBalance - reward;
    setUserBalance(caller, newUserBalance);

    // Add to system escrow
    systemBountyBalance += reward;

    let questId = nextQuestId;
    nextQuestId += 1;

    let newQuest : Quest = {
      questId;
      title;
      description;
      reward;
      difficulty;
      publisherId = caller;
      warriorId = null;
      status = #active;
      originalBountyAmountE8 = reward;
      bountyContributions = List.empty<BountyContribution>();
      depositAmount = 0;
      depositRate = 50;
      createdAt = Time.now();
      acceptedAt = null;
      completedAt = null;
      hypeCount = 0;
      dailyCheckIns = List.empty<CheckInRecord>();
      completionTarget = 21;
      currentStreak = 0;
      participantCount = switch (participantCount) {
        case (null) { 1 };
        case (?count) { count };
      };
    };

    quests.add(questId, newQuest);

    // Record transaction
    let systemPrincipal = Principal.fromText("aaaaa-aa");
    ignore recordTransaction(#deposit, reward, caller, systemPrincipal, #success);

    questId;
  };

  public shared ({ caller }) func createABQuest(
    titleA : Text,
    descriptionA : Text,
    titleB : Text,
    descriptionB : Text,
    reward : Nat64,
    difficulty : Difficulty,
    participantCount : ?Nat,
  ) : async (Nat, Nat) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create A/B quests");
    };

    if (reward == 0) {
      Runtime.trap("Reward pool must be greater than zero");
    };

    let totalCost = reward * 2;

    // Validate user has sufficient balance for both quests
    let userBalance = getUserBalance(caller);
    if (userBalance < totalCost) {
      Runtime.trap("Insufficient balance: User does not have enough funds to create A/B quests");
    };

    // Deduct total cost from user's wallet
    let newUserBalance = userBalance - totalCost;
    setUserBalance(caller, newUserBalance);

    // Add to system escrow
    systemBountyBalance += totalCost;

    let questIdA = nextQuestId;
    nextQuestId += 1;

    let questIdB = nextQuestId;
    nextQuestId += 1;

    let defaultParticipants = switch (participantCount) {
      case (null) { 1 };
      case (?count) { count };
    };

    let questA : Quest = {
      questId = questIdA;
      title = titleA;
      description = descriptionA;
      reward;
      difficulty;
      publisherId = caller;
      warriorId = null;
      status = #active;
      originalBountyAmountE8 = reward;
      bountyContributions = List.empty<BountyContribution>();
      depositAmount = 0;
      depositRate = 50;
      createdAt = Time.now();
      acceptedAt = null;
      completedAt = null;
      hypeCount = 0;
      dailyCheckIns = List.empty<CheckInRecord>();
      completionTarget = 21;
      currentStreak = 0;
      participantCount = defaultParticipants;
    };

    let questB : Quest = {
      questId = questIdB;
      title = titleB;
      description = descriptionB;
      reward;
      difficulty;
      publisherId = caller;
      warriorId = null;
      status = #active;
      originalBountyAmountE8 = reward;
      bountyContributions = List.empty<BountyContribution>();
      depositAmount = 0;
      depositRate = 50;
      createdAt = Time.now();
      acceptedAt = null;
      completedAt = null;
      hypeCount = 0;
      dailyCheckIns = List.empty<CheckInRecord>();
      completionTarget = 21;
      currentStreak = 0;
      participantCount = defaultParticipants;
    };

    quests.add(questIdA, questA);
    quests.add(questIdB, questB);

    // Record transaction
    let systemPrincipal = Principal.fromText("aaaaa-aa");
    ignore recordTransaction(#deposit, totalCost, caller, systemPrincipal, #success);

    (questIdA, questIdB);
  };

  public shared ({ caller }) func acceptQuest(questId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can accept quests");
    };

    switch (quests.get(questId)) {
      case (null) { Runtime.trap("Quest not found") };
      case (?quest) {
        if (quest.status != #active) {
          Runtime.trap("Quest is not available for acceptance");
        };

        switch (quest.warriorId) {
          case (?_) { Runtime.trap("Quest already accepted by another warrior") };
          case (null) {};
        };

        // Authorization: Cannot accept your own quest
        if (quest.publisherId == caller) {
          Runtime.trap("Unauthorized: Cannot accept your own quest");
        };

        let depositAmount = (quest.reward * Nat64.fromNat(quest.depositRate)) / (100 : Nat64);

        // Validate warrior has sufficient balance for deposit
        let warriorBalance = getUserBalance(caller);
        if (warriorBalance < depositAmount) {
          Runtime.trap("Insufficient balance: Warrior does not have enough funds for deposit");
        };

        // Deduct deposit from warrior's wallet
        let newWarriorBalance = warriorBalance - depositAmount;
        setUserBalance(caller, newWarriorBalance);

        let updatedQuest : Quest = {
          quest with
          status = #inProgress;
          warriorId = ?caller;
          depositAmount;
          acceptedAt = ?Time.now();
        };

        quests.add(questId, updatedQuest);

        // Record transaction
        let systemPrincipal = Principal.fromText("aaaaa-aa");
        ignore recordTransaction(#deposit, depositAmount, caller, systemPrincipal, #success);
      };
    };
  };

  public shared ({ caller }) func submitDailyCheckIn(questId : Nat, statusText : Text, photoUrl : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit check-ins");
    };

    switch (quests.get(questId)) {
      case (null) { Runtime.trap("Quest not found") };
      case (?quest) {
        switch (quest.warriorId) {
          case (null) { Runtime.trap("Quest not yet accepted by any warrior") };
          case (?warriorId) {
            // Authorization: Only the assigned warrior can submit check-ins
            if (warriorId != caller) {
              Runtime.trap("Unauthorized: You are not the warrior for this quest");
            };

            if (quest.status != #inProgress) {
              Runtime.trap("Quest is not in progress");
            };

            let dayNumber = quest.dailyCheckIns.size() + 1;

            let checkInRecord : CheckInRecord = {
              dayNumber;
              timestamp = Time.now();
              statusText;
              photoUrl;
            };

            let updatedCheckIns = quest.dailyCheckIns.clone();
            updatedCheckIns.add(checkInRecord);

            let updatedQuest : Quest = {
              quest with
              dailyCheckIns = updatedCheckIns;
            };

            quests.add(questId, updatedQuest);
          };
        };
      };
    };
  };

  public shared ({ caller }) func submitCompletion(questId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit quest completion");
    };

    switch (quests.get(questId)) {
      case (null) { Runtime.trap("Quest not found") };
      case (?quest) {
        switch (quest.warriorId) {
          case (null) { Runtime.trap("Quest not yet accepted by any warrior") };
          case (?warriorId) {
            // Authorization: Only the assigned warrior can submit completion
            if (warriorId != caller) {
              Runtime.trap("Unauthorized: You are not the warrior for this quest");
            };

            if (quest.status != #inProgress) {
              Runtime.trap("Quest is not in an active state");
            };

            let checkIns = quest.dailyCheckIns.toArray();
            if (checkIns.size() < quest.completionTarget) {
              Runtime.trap("Not enough check-ins submitted to complete this quest");
            };

            let updatedQuest : Quest = {
              quest with
              status = #pendingVerification;
              completedAt = ?Time.now();
            };

            quests.add(questId, updatedQuest);
          };
        };
      };
    };
  };

  public shared ({ caller }) func deleteQuest(questId : Nat) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete quests");
    };

    switch (quests.get(questId)) {
      case (null) { Runtime.trap("Quest not found") };
      case (?quest) {
        if (quest.status != #active) {
          Runtime.trap("Quest cannot be deleted (not active)");
        };

        if (quest.warriorId != null) {
          Runtime.trap("Quest cannot be deleted (already accepted by a warrior)");
        };

        // Authorization: Only the publisher can delete their quest
        if (quest.publisherId != caller) {
          Runtime.trap("Unauthorized: Only the publisher can delete this quest");
        };

        // Refund the original bounty to publisher
        let publisherBalance = getUserBalance(caller);
        setUserBalance(caller, publisherBalance + quest.reward);

        systemBountyBalance -= quest.reward;

        quests.remove(questId);

        // Record refund transaction
        let systemPrincipal = Principal.fromText("aaaaa-aa");
        ignore recordTransaction(#withdrawal, quest.reward, systemPrincipal, caller, #success);

        "";
      };
    };
  };

  public shared ({ caller }) func exitQuest(questId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can exit quests");
    };

    switch (quests.get(questId)) {
      case (null) { Runtime.trap("Quest not found") };
      case (?quest) {
        // Authorization: Only the quest publisher can exit
        if (quest.publisherId != caller) {
          Runtime.trap("Unauthorized: Only the quest publisher can exit");
        };

        let hasContributions = switch (quest.bountyContributions.first()) {
          case (null) { false };
          case (_) { true };
        };
        if (not hasContributions) {
          Runtime.trap("Cannot exit: No bounty contributions found");
        };

        if (quest.warriorId != null) {
          Runtime.trap("Cannot exit quest: Already accepted by a warrior");
        };

        if (quest.status != #active) {
          Runtime.trap("Cannot exit quest: Not active");
        };

        let updatedQuest : Quest = {
          quest with status = #cancelled;
        };
        quests.add(questId, updatedQuest);
      };
    };
  };

  public shared ({ caller }) func abandonQuest(questId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can abandon quests");
    };

    switch (quests.get(questId)) {
      case (null) { Runtime.trap("Quest not found") };
      case (?quest) {
        switch (quest.warriorId) {
          case (null) { Runtime.trap("Invalid abandon action: No warrior assigned to quest yet") };
          case (?warriorId) {
            // Authorization: Only the assigned warrior can abandon
            if (caller != warriorId) {
              Runtime.trap("Unauthorized: You are not the warrior for this quest");
            };

            if (quest.status != #inProgress) {
              Runtime.trap("Cannot abandon: Quest is not in progress");
            };

            let updatedQuest : Quest = {
              quest with
              status = #active;
              warriorId = null;
              depositAmount = 0;
              depositRate = 50;
            };
            quests.add(questId, updatedQuest);

            switch (userProfiles.get(warriorId)) {
              case (null) { Runtime.trap("Warrior profile not found") };
              case (?warriorProfile) {
                userProfiles.add(warriorId, { warriorProfile with depositRate = 50 });
              };
            };
          };
        };
      };
    };
  };
};
