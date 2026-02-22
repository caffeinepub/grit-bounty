import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Nat64 "mo:core/Nat64";
import Principal "mo:core/Principal";

module {
  type OldUserProfile = {
    name : Text;
    preferredLanguage : {
      #SimplifiedChinese;
      #English;
      #Spanish;
      #French;
      #Japanese;
      #Korean;
    };
  };

  type OldActor = {
    nextQuestId : Nat;
    payments : Map.Map<Nat, {
      questId : Nat;
      user : Principal;
      amount : Nat;
      timestamp : Int;
    }>;
    platformFees : Map.Map<Nat, {
      questId : Nat;
      amount : Nat;
      timestamp : Int;
    }>;
    quests : Map.Map<Nat, {
      id : Nat;
      title : Text;
      description : Text;
      creator : Principal;
      rewardPool : Nat;
      status : {
        #active;
        #accepted;
        #completed;
        #expired;
      };
      difficulty : {
        #easy;
        #medium;
        #hard;
        #extreme;
        #impossible;
      };
      assignedWarrior : ?Principal;
      language : {
        #SimplifiedChinese;
        #English;
        #Spanish;
        #French;
        #Japanese;
        #Korean;
      };
    }>;
    supportedLanguages : [
      {
        #SimplifiedChinese;
        #English;
        #Spanish;
        #French;
        #Japanese;
        #Korean;
      }
    ];
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  type NewUserProfile = {
    name : Text;
    successfulQuests : Nat;
    depositRate : Nat;
    totalEarned : Nat64;
    totalDeposited : Nat64;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_principal, oldProfile) {
        {
          name = oldProfile.name;
          successfulQuests = 0;
          depositRate = 50;
          totalEarned = 0;
          totalDeposited = 0;
        };
      }
    );
    { userProfiles = newUserProfiles };
  };
};
