// Local type definitions for frontend-only features
// These types are not yet implemented in the backend

export enum Language {
  English = 'English',
  SimplifiedChinese = 'SimplifiedChinese',
  Spanish = 'Spanish',
  French = 'French',
  Japanese = 'Japanese',
  Korean = 'Korean',
}

export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
  extreme = 'extreme',
  impossible = 'impossible',
}

export interface Quest {
  id: bigint;
  title: string;
  description: string;
  creator: string;
  rewardPool: bigint;
  status: 'active' | 'accepted' | 'completed' | 'disputed' | 'expired';
  difficulty: Difficulty;
  assignedWarrior: string | null;
  depositAmount: bigint;
  depositRate: number;
}

// Extended user profile with language preference
export interface ExtendedUserProfile {
  name: string;
  successfulQuests: bigint;
  depositRate: bigint;
  totalEarned: bigint;
  totalDeposited: bigint;
  preferredLanguage?: Language;
}
