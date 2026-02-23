import Principal "mo:core/Principal";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Int "mo:core/Int";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Runtime "mo:core/Runtime";

import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type USD = Nat;
  type Cents = Nat;

  public type USDString = Text;

  public type TransactionType = {
    #deposit;
    #withdrawal;
    #taskPayment;
    #taskDeduction;
    #bountyContribution;
    #serviceFee;
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
    amountCents : Nat;
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
    reward : Nat;
    originalBountyAmountCents : Nat;
    bountyContributions : List.List<BountyContribution>;
    depositAmount : Nat;
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
    reward : Nat;
    difficulty : Difficulty;
    publisherId : Principal;
    warriorId : ?Principal;
    status : QuestStatus;
    originalBountyAmountCents : Nat;
    bountyContributions : [BountyContribution];
    depositAmount : Nat;
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
    amountCents : Nat;
    from : Principal;
    to : Principal;
    status : TransactionStatus;
  };

  public type RechargeRequest = {
    amountUSD : USD;
    amountCents : Cents;
    stripeSessionId : Text;
    userId : Principal;
    initiatedAt : Int;
    status : TransactionStatus;
  };

  public type UserProfile = {
    name : Text;
    successfulQuests : Nat;
    depositRate : Nat;
    totalEarned : Nat;
    totalDeposited : Nat;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let userBalances = Map.empty<Principal, Nat>();
  let quests = Map.empty<Nat, Quest>();
  var nextQuestId = 1;
  var systemBountyBalance : Nat = 0;
  var nextTransactionId = 0;
  let transactions = Map.empty<Nat, Transaction>();
  let rechargeRequests = Map.empty<Nat, RechargeRequest>();

  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  include MixinStorage();

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfiguration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public query ({ caller }) func getUserWalletBalance() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view wallet balance");
    };
    getUserBalance(caller);
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

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getTransactionsView() : async [(Nat, Transaction)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view transactions");
    };

    if (AccessControl.isAdmin(accessControlState, caller)) {
      return transactions.toArray();
    };

    let userTransactions = transactions.filter(
      func(_, tx) {
        tx.from == caller or tx.to == caller
      }
    );
    userTransactions.toArray();
  };

  public query ({ caller }) func getActiveQuests(difficulty : ?Difficulty) : async [QuestImmutable] {
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
          originalBountyAmountCents = q.originalBountyAmountCents;
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
          originalBountyAmountCents = q.originalBountyAmountCents;
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
          originalBountyAmountCents = q.originalBountyAmountCents;
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
    amountCents : Nat;
    timestamp : Int;
  };

  public shared ({ caller }) func addToBounty(questId : Nat, amountCents : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can contribute to bounties");
    };

    if (amountCents == 0) {
      Runtime.trap("Contribution amount must be greater than zero");
    };

    let quest = switch (quests.get(questId)) {
      case (null) { Runtime.trap("Quest not found") };
      case (?quest) { quest };
    };

    if (quest.status != #active) {
      Runtime.trap("Quest is not active");
    };

    if (quest.publisherId == caller) {
      Runtime.trap("Unauthorized: Quest publisher cannot contribute to their own quest");
    };

    switch (quest.warriorId) {
      case (?warriorId) {
        if (warriorId == caller) {
          Runtime.trap("Unauthorized: Quest warrior cannot contribute to their own quest");
        };
      };
      case (null) {};
    };

    let userBalance = getUserBalance(caller);
    if (userBalance < amountCents) {
      Runtime.trap("Insufficient balance: User does not have enough funds");
    };

    let newUserBalance = userBalance - amountCents;
    setUserBalance(caller, newUserBalance);

    let bountyContribution : BountyContribution = {
      contributorId = caller;
      amountCents;
      timestamp = Time.now();
    };

    let currentContributions = quest.bountyContributions.clone();
    currentContributions.add(bountyContribution);
    let updatedQuest : Quest = {
      quest with
      bountyContributions = currentContributions;
      reward = quest.reward + amountCents;
      hypeCount = quest.hypeCount + 1;
    };

    quests.add(questId, updatedQuest);

    systemBountyBalance += amountCents;

    let systemPrincipal = Principal.fromText("aaaaa-aa");
    ignore recordTransaction(#bountyContribution, amountCents, caller, systemPrincipal, #success);
  };

  public type CreateQuestRequest = {
    title : Text;
    description : Text;
    rewardUSD : USD;
    rewardCents : Cents;
    difficulty : Difficulty;
    participantCount : ?Nat;
  };

  public shared ({ caller }) func createQuest(request : CreateQuestRequest) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap(
        "Unauthorized: Only users can create quests"
      : Text
      );
    };

    if (request.rewardCents == 0) {
      Runtime.trap("Reward pool must be greater than zero");
    };

    let userBalance = getUserBalance(caller);
    if (userBalance < request.rewardCents) {
      Runtime.trap("Insufficient balance: User does not have enough funds to create quest");
    };

    let newUserBalance = userBalance - request.rewardCents;
    setUserBalance(caller, newUserBalance);

    systemBountyBalance += request.rewardCents;

    let questId = nextQuestId;
    nextQuestId += 1;

    let newQuest : Quest = {
      questId;
      title = request.title;
      description = request.description;
      reward = request.rewardCents;
      difficulty = request.difficulty;
      publisherId = caller;
      warriorId = null;
      status = #active;
      originalBountyAmountCents = request.rewardCents;
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
      participantCount = switch (request.participantCount) {
        case (null) { 1 };
        case (?count) { count };
      };
    };

    quests.add(questId, newQuest);

    let systemPrincipal = Principal.fromText("aaaaa-aa");
    ignore recordTransaction(#deposit, request.rewardCents, caller, systemPrincipal, #success);

    questId;
  };

  public shared ({ caller }) func createABQuest(
    titleA : Text,
    descriptionA : Text,
    titleB : Text,
    descriptionB : Text,
    rewardCents : Nat,
    difficulty : Difficulty,
    participantCount : ?Nat,
  ) : async (Nat, Nat) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create A/B quests");
    };

    if (rewardCents == 0) {
      Runtime.trap("Reward pool must be greater than zero");
    };

    let totalCost = rewardCents * 2;

    let userBalance = getUserBalance(caller);
    if (userBalance < totalCost) {
      Runtime.trap("Insufficient balance: User does not have enough funds to create A/B quests");
    };

    let newUserBalance = userBalance - totalCost;
    setUserBalance(caller, newUserBalance);

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
      reward = rewardCents;
      difficulty;
      publisherId = caller;
      warriorId = null;
      status = #active;
      originalBountyAmountCents = rewardCents;
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
      reward = rewardCents;
      difficulty;
      publisherId = caller;
      warriorId = null;
      status = #active;
      originalBountyAmountCents = rewardCents;
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

        if (quest.publisherId == caller) {
          Runtime.trap("Unauthorized: Cannot accept your own quest");
        };

        let depositAmount = (quest.reward * quest.depositRate) / 100;

        let warriorBalance = getUserBalance(caller);
        if (warriorBalance < depositAmount) {
          Runtime.trap("Insufficient balance: Warrior does not have enough funds for deposit");
        };

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

        if (quest.publisherId != caller) {
          Runtime.trap("Unauthorized: Only the publisher can delete this quest");
        };

        let publisherBalance = getUserBalance(caller);
        setUserBalance(caller, publisherBalance + quest.reward);

        systemBountyBalance -= quest.reward;

        quests.remove(questId);

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

  private func getUserBalance(user : Principal) : Nat {
    switch (userBalances.get(user)) {
      case (null) { 0 };
      case (?balance) { balance };
    };
  };

  private func setUserBalance(user : Principal, balance : Nat) {
    userBalances.add(user, balance);
  };

  private func recordTransaction(txType : TransactionType, amount : Nat, from : Principal, to : Principal, status : TransactionStatus) : Nat {
    let txId = nextTransactionId;
    nextTransactionId += 1;

    let tx : Transaction = {
      id = txId;
      timestamp = Time.now();
      transactionType = txType;
      amountCents = amount;
      from;
      to;
      status;
    };

    transactions.add(txId, tx);
    txId;
  };

  private func toUSDAmount(cents : Nat) : USD {
    Int.abs(cents) / 100;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public type RechargeDialogRequest = {
    amountUSD : USD;
    amountCents : Cents;
  };

  public shared ({ caller }) func createStripeCheckoutSession(request : RechargeDialogRequest, successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };

    let items = [{
      currency = "USD";
      productName = "Balance recharge";
      productDescription = "Monetize app exploration";
      priceInCents = request.amountCents;
      quantity = 1;
    }];

    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public shared ({ caller }) func recordSuccessfulRecharge(amountUSD : Nat, amountCents : Cents, userPrincipal : Principal) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap(
        "Unauthorized: Only admins can trigger successful recharge"
      : Text
      );
    };

    let balance = getUserBalance(userPrincipal);
    let newBalance = balance + amountCents;
    setUserBalance(userPrincipal, newBalance);

    let systemPrincipal = Principal.fromText("aaaaa-aa");
    ignore recordTransaction(#deposit, amountCents, systemPrincipal, userPrincipal, #success);
  };
};
