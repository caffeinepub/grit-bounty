import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CheckInRecord {
    photoUrl?: string;
    dayNumber: bigint;
    timestamp: bigint;
    statusText: string;
}
export interface QuestImmutable {
    status: QuestStatus;
    completedAt?: bigint;
    depositAmount: bigint;
    title: string;
    hypeCount: bigint;
    difficulty: Difficulty;
    createdAt: bigint;
    publisherId: Principal;
    dailyCheckIns: Array<CheckInRecord>;
    description: string;
    crowdfundingContributions: Array<[Principal, bigint]>;
    rewardPool: bigint;
    warriorId?: Principal;
    questId: bigint;
    participantCount: bigint;
    completionTarget: bigint;
    acceptedAt?: bigint;
    currentStreak: bigint;
    depositRate: bigint;
}
export interface UserProfile {
    name: string;
    totalEarned: bigint;
    successfulQuests: bigint;
    totalDeposited: bigint;
    depositRate: bigint;
}
export enum Difficulty {
    easy = "easy",
    hard = "hard",
    medium = "medium"
}
export enum QuestStatus {
    pendingVerification = "pendingVerification",
    active = "active",
    cancelled = "cancelled",
    disputed = "disputed",
    completed = "completed",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    abandonQuest(questId: bigint): Promise<void>;
    acceptQuest(questId: bigint): Promise<void>;
    addToPot(questId: bigint, contribution: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createABQuest(titleA: string, descriptionA: string, titleB: string, descriptionB: string, rewardPool: bigint, difficulty: Difficulty, participantCount: bigint | null): Promise<[bigint, bigint]>;
    createQuest(title: string, description: string, rewardPool: bigint, difficulty: Difficulty, participantCount: bigint | null): Promise<bigint>;
    deleteQuest(questId: bigint): Promise<string>;
    exitQuest(questId: bigint): Promise<void>;
    getActiveQuests(difficulty: Difficulty | null): Promise<Array<QuestImmutable>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyAcceptedQuests(): Promise<Array<QuestImmutable>>;
    getMyPostedBounties(): Promise<Array<QuestImmutable>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitCompletion(questId: bigint): Promise<void>;
    submitDailyCheckIn(questId: bigint, statusText: string, photoUrl: string | null): Promise<void>;
}
