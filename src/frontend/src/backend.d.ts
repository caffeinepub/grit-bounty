import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Cents = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
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
    originalBountyAmountCents: bigint;
    warriorId?: Principal;
    questId: bigint;
    participantCount: bigint;
    completionTarget: bigint;
    acceptedAt?: bigint;
    currentStreak: bigint;
    depositRate: bigint;
}
export interface BountyContribution {
    contributorId: Principal;
    amountCents: bigint;
    timestamp: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface Transaction {
    id: bigint;
    to: Principal;
    status: TransactionStatus;
    transactionType: TransactionType;
    from: Principal;
    amountCents: bigint;
    timestamp: bigint;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface CreateQuestRequest {
    title: string;
    difficulty: Difficulty;
    rewardCents: Cents;
    description: string;
    rewardUSD: USD;
    participantCount?: bigint;
}
export interface CheckInRecord {
    photoUrl?: string;
    dayNumber: bigint;
    timestamp: bigint;
    statusText: string;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export type USD = bigint;
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface RechargeDialogRequest {
    amountCents: Cents;
    amountUSD: USD;
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
    serviceFee = "serviceFee",
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
    addToBounty(questId: bigint, amountCents: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createABQuest(titleA: string, descriptionA: string, titleB: string, descriptionB: string, rewardCents: bigint, difficulty: Difficulty, participantCount: bigint | null): Promise<[bigint, bigint]>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createQuest(request: CreateQuestRequest): Promise<bigint>;
    createStripeCheckoutSession(request: RechargeDialogRequest, successUrl: string, cancelUrl: string): Promise<string>;
    deleteQuest(questId: bigint): Promise<string>;
    exitQuest(questId: bigint): Promise<void>;
    getActiveQuests(difficulty: Difficulty | null): Promise<Array<QuestImmutable>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyAcceptedQuests(): Promise<Array<QuestImmutable>>;
    getMyPostedBounties(): Promise<Array<QuestImmutable>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTransactionsView(): Promise<Array<[bigint, Transaction]>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserWalletBalance(): Promise<bigint>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    recordSuccessfulRecharge(amountUSD: bigint, amountCents: Cents, userPrincipal: Principal): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitCompletion(questId: bigint): Promise<void>;
    submitDailyCheckIn(questId: bigint, statusText: string, photoUrl: string | null): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
