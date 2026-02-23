import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Transaction {
    id: bigint;
    to: Principal;
    status: TransactionStatus;
    transactionType: TransactionType;
    from: Principal;
    amountE8: bigint;
    timestamp: bigint;
}
export interface CheckInRecord {
    photoUrl?: string;
    dayNumber: bigint;
    timestamp: bigint;
    statusText: string;
}
export interface BountyContribution {
    contributorId: Principal;
    amountE8: bigint;
    timestamp: bigint;
}
export interface QuestImmutable {
    status: QuestStatus;
    completedAt?: bigint;
    depositAmount: bigint;
    reward: bigint;
    title: string;
    hypeCount: bigint;
    difficulty: Difficulty;
    createdAt: bigint;
    bountyContributions: Array<BountyContribution>;
    publisherId: Principal;
    dailyCheckIns: Array<CheckInRecord>;
    description: string;
    warriorId?: Principal;
    questId: bigint;
    participantCount: bigint;
    completionTarget: bigint;
    acceptedAt?: bigint;
    originalBountyAmountE8: bigint;
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
export enum TransactionStatus {
    pending = "pending",
    success = "success",
    failed = "failed"
}
export enum TransactionType {
    deposit = "deposit",
    withdrawal = "withdrawal",
    taskPayment = "taskPayment",
    taskDeduction = "taskDeduction",
    bountyContribution = "bountyContribution"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    abandonQuest(questId: bigint): Promise<void>;
    acceptQuest(questId: bigint): Promise<void>;
    addToBounty(questId: bigint, amountE8: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createABQuest(titleA: string, descriptionA: string, titleB: string, descriptionB: string, reward: bigint, difficulty: Difficulty, participantCount: bigint | null): Promise<[bigint, bigint]>;
    createQuest(title: string, description: string, reward: bigint, difficulty: Difficulty, participantCount: bigint | null): Promise<bigint>;
    deleteQuest(questId: bigint): Promise<string>;
    exitQuest(questId: bigint): Promise<void>;
    getActiveQuests(difficulty: Difficulty | null): Promise<Array<QuestImmutable>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyAcceptedQuests(): Promise<Array<QuestImmutable>>;
    getMyPostedBounties(): Promise<Array<QuestImmutable>>;
    getTransactionsView(): Promise<Array<[bigint, Transaction]>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitCompletion(questId: bigint): Promise<void>;
    submitDailyCheckIn(questId: bigint, statusText: string, photoUrl: string | null): Promise<void>;
}
