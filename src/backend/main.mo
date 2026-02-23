import Principal "mo:core/Principal";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Nat64 "mo:core/Nat64";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Runtime "mo:core/Runtime";
import ICP "mo:core/Nat64";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data types
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
    rewardPool : Nat64;
    difficulty : Difficulty;
    publisherId : Principal;
    warriorId : ?Principal;
    status : QuestStatus;
    depositAmount : Nat64;
    depositRate : Nat;
    createdAt : Int;
    acceptedAt : ?Int;
    completedAt : ?Int;
    hypeCount : Nat;
    crowdfundingContributions : List.List<(Principal, Nat64)>;
    dailyCheckIns : List.List<CheckInRecord>;
    completionTarget : Nat;
    currentStreak : Nat;
    participantCount : Nat;
  };

  public type UserProfile = {
    name : Text;
    successfulQuests : Nat;
    depositRate : Nat;
    totalEarned : Nat64;
    totalDeposited : Nat64;
  };

  public type QuestImmutable = {
    questId : Nat;
    title : Text;
    description : Text;
    rewardPool : Nat64;
    difficulty : Difficulty;
    publisherId : Principal;
    warriorId : ?Principal;
    status : QuestStatus;
    depositAmount : Nat64;
    depositRate : Nat;
    createdAt : Int;
    acceptedAt : ?Int;
    completedAt : ?Int;
    hypeCount : Nat;
    crowdfundingContributions : [(Principal, Nat64)];
    dailyCheckIns : [CheckInRecord];
    completionTarget : Nat;
    currentStreak : Nat;
    participantCount : Nat;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let quests = Map.empty<Nat, Quest>();
  var nextQuestId = 0;
  var systemBountyBalance : Nat64 = 0;

  include MixinStorage();

  // User profile management
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

  // Quest management
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

    let resultsList = List.empty<QuestImmutable>();
    filtered.values().toArray().forEach(
      func(q) {
        resultsList.add(
          {
            questId = q.questId;
            title = q.title;
            description = q.description;
            rewardPool = q.rewardPool;
            difficulty = q.difficulty;
            publisherId = q.publisherId;
            warriorId = q.warriorId;
            status = q.status;
            depositAmount = q.depositAmount;
            depositRate = q.depositRate;
            createdAt = q.createdAt;
            acceptedAt = q.acceptedAt;
            completedAt = q.completedAt;
            hypeCount = q.hypeCount;
            crowdfundingContributions = q.crowdfundingContributions.toArray();
            dailyCheckIns = q.dailyCheckIns.toArray();
            completionTarget = q.completionTarget;
            currentStreak = q.currentStreak;
            participantCount = q.participantCount;
          }
        );
      }
    );
    resultsList.toArray();
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

    let resultsList = List.empty<QuestImmutable>();
    filteredQuests.values().toArray().forEach(
      func(q) {
        resultsList.add(
          {
            questId = q.questId;
            title = q.title;
            description = q.description;
            rewardPool = q.rewardPool;
            difficulty = q.difficulty;
            publisherId = q.publisherId;
            warriorId = q.warriorId;
            status = q.status;
            depositAmount = q.depositAmount;
            depositRate = q.depositRate;
            createdAt = q.createdAt;
            acceptedAt = q.acceptedAt;
            completedAt = q.completedAt;
            hypeCount = q.hypeCount;
            crowdfundingContributions = q.crowdfundingContributions.toArray();
            dailyCheckIns = q.dailyCheckIns.toArray();
            completionTarget = q.completionTarget;
            currentStreak = q.currentStreak;
            participantCount = q.participantCount;
          }
        );
      }
    );
    resultsList.toArray();
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

    let resultsList = List.empty<QuestImmutable>();
    filteredQuests.values().toArray().forEach(
      func(q) {
        resultsList.add(
          {
            questId = q.questId;
            title = q.title;
            description = q.description;
            rewardPool = q.rewardPool;
            difficulty = q.difficulty;
            publisherId = q.publisherId;
            warriorId = q.warriorId;
            status = q.status;
            depositAmount = q.depositAmount;
            depositRate = q.depositRate;
            createdAt = q.createdAt;
            acceptedAt = q.acceptedAt;
            completedAt = q.completedAt;
            hypeCount = q.hypeCount;
            crowdfundingContributions = q.crowdfundingContributions.toArray();
            dailyCheckIns = q.dailyCheckIns.toArray();
            completionTarget = q.completionTarget;
            currentStreak = q.currentStreak;
            participantCount = q.participantCount;
          }
        );
      }
    );
    resultsList.toArray();
  };

  public shared ({ caller }) func addToPot(questId : Nat, contribution : Nat64) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can contribute to quests");
    };

    switch (quests.get(questId)) {
      case (null) { Runtime.trap("Quest not found") };
      case (?quest) {
        if (quest.status != #active) {
          Runtime.trap("Quest is not active");
        };

        let updatedContributions = quest.crowdfundingContributions.clone();
        updatedContributions.add((caller, contribution));

        let updatedQuest : Quest = {
          quest with
          rewardPool = quest.rewardPool + contribution;
          hypeCount = quest.hypeCount + 1;
          crowdfundingContributions = updatedContributions;
        };

        quests.add(questId, updatedQuest);
      };
    };
  };

  public shared ({ caller }) func createQuest(title : Text, description : Text, rewardPool : Nat64, difficulty : Difficulty, participantCount : ?Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create quests");
    };

    if (rewardPool == 0) {
      Runtime.trap("Reward pool must be greater than zero");
    };

    systemBountyBalance += rewardPool;

    let questId = nextQuestId;
    nextQuestId += 1;

    let newQuest : Quest = {
      questId;
      title;
      description;
      rewardPool;
      difficulty;
      publisherId = caller;
      warriorId = null;
      status = #active;
      depositAmount = 0;
      depositRate = 50;
      createdAt = Time.now();
      acceptedAt = null;
      completedAt = null;
      hypeCount = 0;
      crowdfundingContributions = List.empty<(Principal, Nat64)>();
      dailyCheckIns = List.empty<CheckInRecord>();
      completionTarget = 21;
      currentStreak = 0;
      participantCount = switch (participantCount) {
        case (null) { 1 };
        case (?count) { count };
      };
    };

    quests.add(questId, newQuest);

    questId;
  };

  public shared ({ caller }) func createABQuest(
    titleA : Text,
    descriptionA : Text,
    titleB : Text,
    descriptionB : Text,
    rewardPool : Nat64,
    difficulty : Difficulty,
    participantCount : ?Nat,
  ) : async (Nat, Nat) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create A/B quests");
    };

    if (rewardPool == 0) {
      Runtime.trap("Reward pool must be greater than zero");
    };

    let totalCost = rewardPool * 2;
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
      rewardPool = rewardPool;
      difficulty;
      publisherId = caller;
      warriorId = null;
      status = #active;
      depositAmount = 0;
      depositRate = 50;
      createdAt = Time.now();
      acceptedAt = null;
      completedAt = null;
      hypeCount = 0;
      crowdfundingContributions = List.empty<(Principal, Nat64)>();
      dailyCheckIns = List.empty<CheckInRecord>();
      completionTarget = 21;
      currentStreak = 0;
      participantCount = defaultParticipants;
    };

    let questB : Quest = {
      questId = questIdB;
      title = titleB;
      description = descriptionB;
      rewardPool = rewardPool;
      difficulty;
      publisherId = caller;
      warriorId = null;
      status = #active;
      depositAmount = 0;
      depositRate = 50;
      createdAt = Time.now();
      acceptedAt = null;
      completedAt = null;
      hypeCount = 0;
      crowdfundingContributions = List.empty<(Principal, Nat64)>();
      dailyCheckIns = List.empty<CheckInRecord>();
      completionTarget = 21;
      currentStreak = 0;
      participantCount = defaultParticipants;
    };

    quests.add(questIdA, questA);
    quests.add(questIdB, questB);

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
          Runtime.trap("Cannot accept your own quest");
        };

        let depositAmount = (quest.rewardPool * Nat64.fromNat(quest.depositRate)) / (100 : Nat64);
        let updatedQuest : Quest = {
          quest with
          status = #inProgress;
          warriorId = ?caller;
          depositAmount;
          acceptedAt = ?Time.now();
        };

        quests.add(questId, updatedQuest);
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

  //------------------------------------------------------------------
  // New Backend Functions (Crowdfunding/Publisher/Warrior Operations)
  //------------------------------------------------------------------

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

        systemBountyBalance -= quest.rewardPool;

        quests.remove(questId);
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

        let hasContributions = not quest.crowdfundingContributions.isEmpty();
        if (not hasContributions) {
          Runtime.trap("Cannot exit: No crowdfunding contributions found");
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
};
