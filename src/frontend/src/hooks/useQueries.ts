import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { UserProfile, QuestImmutable, Difficulty, Transaction, RechargeDialogRequest, CreateQuestRequest } from '../backend';
import { Principal } from '@dfinity/principal';
import { toast } from 'sonner';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useGetUserProfile(principal: Principal) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ['userProfile', principal.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getUserProfile(principal);
    },
    enabled: !!actor && !actorFetching && !!principal,
    retry: false,
    staleTime: 60000,
  });
}

export function useGetWalletBalance() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<bigint>({
    queryKey: ['walletBalance'],
    queryFn: async () => {
      if (!actor || !identity) throw new Error('Actor or identity not available');
      return actor.getUserWalletBalance();
    },
    enabled: !!actor && !actorFetching && !!identity,
    refetchInterval: 30000,
    retry: false,
  });
}

export function useGetTransactionHistory() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Array<[bigint, Transaction]>>({
    queryKey: ['transactionHistory'],
    queryFn: async () => {
      if (!actor || !identity) throw new Error('Actor or identity not available');
      return actor.getTransactionsView();
    },
    enabled: !!actor && !actorFetching && !!identity,
    refetchOnWindowFocus: true,
    retry: false,
  });
}

export function useGetCallerBalance() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<bigint>({
    queryKey: ['callerBalance'],
    queryFn: async () => {
      if (!actor || !identity) throw new Error('Actor or identity not available');
      return actor.getUserWalletBalance();
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetActiveQuests(difficulty?: Difficulty | 'all') {
  const { actor, isFetching } = useActor();

  return useQuery<QuestImmutable[]>({
    queryKey: ['activeQuests', difficulty],
    queryFn: async () => {
      if (!actor) return [];
      const difficultyParam = difficulty === 'all' ? null : (difficulty as Difficulty);
      const quests = await actor.getActiveQuests(difficultyParam);
      return quests.sort((a, b) => Number(b.hypeCount) - Number(a.hypeCount));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateQuest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      rewardPool,
      difficulty,
      participantCount,
    }: {
      title: string;
      description: string;
      rewardPool: bigint;
      difficulty: Difficulty;
      participantCount?: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      
      const rewardUSD = rewardPool / 100n;
      const request: CreateQuestRequest = {
        title,
        description,
        rewardUSD,
        rewardCents: rewardPool,
        difficulty,
        participantCount: participantCount || undefined,
      };
      
      return actor.createQuest(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['myPostedBounties'] });
      queryClient.invalidateQueries({ queryKey: ['callerBalance'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
  });
}

export function useAcceptQuest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.acceptQuest(questId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['myAcceptedQuests'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
  });
}

export function useAddToPot() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questId, contribution }: { questId: bigint; contribution: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addToBounty(questId, contribution);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
  });
}

export function useAddBounty() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questId, amountCents }: { questId: bigint; amountCents: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addToBounty(questId, amountCents);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['myPostedBounties'] });
      queryClient.invalidateQueries({ queryKey: ['callerBalance'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
  });
}

export function useGetMyPostedBounties() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<QuestImmutable[]>({
    queryKey: ['myPostedBounties'],
    queryFn: async () => {
      if (!actor || !identity) return [];
      const quests = await actor.getMyPostedBounties();
      return quests.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useGetMyAcceptedQuests() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<QuestImmutable[]>({
    queryKey: ['myAcceptedQuests'],
    queryFn: async () => {
      if (!actor || !identity) return [];
      const quests = await actor.getMyAcceptedQuests();
      return quests.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useSubmitDailyCheckIn() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      questId,
      statusText,
      photoFile,
      onProgress,
    }: {
      questId: bigint;
      statusText: string;
      photoFile?: File;
      onProgress?: (percentage: number) => void;
    }) => {
      if (!actor) throw new Error('Actor not available');

      let photoUrl: string | null = null;

      if (photoFile) {
        if (onProgress) {
          onProgress(30);
          await new Promise(resolve => setTimeout(resolve, 100));
          onProgress(60);
          await new Promise(resolve => setTimeout(resolve, 100));
          onProgress(90);
        }

        const reader = new FileReader();
        photoUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(photoFile);
        });

        if (onProgress) {
          onProgress(100);
        }
      }

      return actor.submitDailyCheckIn(questId, statusText, photoUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAcceptedQuests'] });
    },
  });
}

export function useDeleteQuest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteQuest(questId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPostedBounties'] });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
  });
}

export function useExitQuest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.exitQuest(questId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPostedBounties'] });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
    },
  });
}

export function useAbandonQuest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.abandonQuest(questId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAcceptedQuests'] });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useCancelQuest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteQuest(questId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPostedBounties'] });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
  });
}

export function useCreateStripeCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      request,
      successUrl,
      cancelUrl,
    }: {
      request: RechargeDialogRequest;
      successUrl: string;
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createStripeCheckoutSession(request, successUrl, cancelUrl);
    },
  });
}

export function useGetStripeSessionStatus(sessionId: string | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['stripeSessionStatus', sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) throw new Error('Actor or session ID not available');
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !actorFetching && !!sessionId,
    retry: false,
  });
}
