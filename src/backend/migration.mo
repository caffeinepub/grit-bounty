import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Nat64 "mo:core/Nat64";
import List "mo:core/List";

module {
  type Difficulty = {
    #easy;
    #medium;
    #hard;
  };

  type QuestStatus = {
    #active;
    #inProgress;
    #pendingVerification;
    #completed;
    #disputed;
    #cancelled;
  };

  type CheckInRecord = {
    dayNumber : Nat;
    timestamp : Int;
    statusText : Text;
    photoUrl : ?Text;
  };

  type Quest = {
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

  type UserProfile = {
    name : Text;
    successfulQuests : Nat;
    depositRate : Nat;
    totalEarned : Nat64;
    totalDeposited : Nat64;
  };

  // New types for transactions
  type TransactionType = {
    #deposit;
    #withdrawal;
    #taskPayment;
    #taskDeduction;
  };

  type TransactionStatus = {
    #pending;
    #success;
    #failed;
  };

  type Transaction = {
    id : Nat;
    timestamp : Int;
    transactionType : TransactionType;
    amountE8 : Nat64;
    from : Principal;
    to : Principal;
    status : TransactionStatus;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    quests : Map.Map<Nat, Quest>;
    nextQuestId : Nat;
    systemBountyBalance : Nat64;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    quests : Map.Map<Nat, Quest>;
    nextQuestId : Nat;
    systemBountyBalance : Nat64;
    nextTransactionId : Nat;
    transactions : Map.Map<Nat, Transaction>;
  };

  public func run(old : OldActor) : NewActor {
    { old with nextTransactionId = 0; transactions = Map.empty<Nat, Transaction>() };
  };
};
