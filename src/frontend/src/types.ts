import type { Principal } from '@icp-sdk/core/principal';
import type { Difficulty, QuestStatus, UserProfile as BackendUserProfile } from './backend';

export enum Language {
  English = 'English',
  TraditionalChinese = 'TraditionalChinese',
  SimplifiedChinese = 'SimplifiedChinese',
}

export interface ExtendedUserProfile extends BackendUserProfile {
  language?: Language;
}

export { Difficulty, QuestStatus };
export type { UserProfile } from './backend';
