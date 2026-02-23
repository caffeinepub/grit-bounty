import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { UserProfile, QuestImmutable, Difficulty, Transaction } from '../backend';
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

export function useGetWalletAddress() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<string | null>({
    queryKey: ['walletAddress'],
    queryFn: async () => {
      if (!actor || !identity) throw new Error('Actor or identity not available');
      // TODO: Backend needs to implement getWalletAddress() method
      // For now, return a placeholder that shows the principal
      const principal = identity.getPrincipal().toString();
      return `Wallet address for ${principal.slice(0, 10)}...`;
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });
}

export function useGetWalletBalance() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<bigint>({
    queryKey: ['walletBalance'],
    queryFn: async () => {
      if (!actor || !identity) throw new Error('Actor or identity not available');
      // TODO: Backend needs to implement getWalletBalance() method
      // For now, return a mock balance
      return BigInt(1000000000); // 10 ICP mock balance
    },
    enabled: !!actor && !actorFetching && !!identity,
    refetchInterval: 30000, // Refetch every 30 seconds
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

export function useWithdrawICP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      destinationAddress,
      amountE8,
    }: {
      destinationAddress: string;
      amountE8: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      // TODO: Backend needs to implement withdrawICP(destinationAddress, amountE8) method
      // For now, throw an error indicating backend implementation is needed
      throw new Error('Withdrawal functionality requires backend ICP Ledger integration');
    },
    onSuccess: () => {
      toast.success('Withdrawal successful!');
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
      queryClient.invalidateQueries({ queryKey: ['transactionHistory'] });
    },
    onError: (error: Error) => {
      console.error('Withdrawal failed:', error);
      toast.error(error.message || 'Failed to process withdrawal');
    },
  });
}

export function useGetCallerBalance() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<bigint>({
    queryKey: ['callerBalance'],
    queryFn: async () => {
      if (!actor || !identity) throw new Error('Actor or identity not available');
      const profile = await actor.getCallerUserProfile();
      // For now, return a mock balance since backend doesn't have balance tracking yet
      // In production, this would call a proper balance query method
      return BigInt(1000000000); // 10 ICP mock balance
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
      return actor.createQuest(title, description, rewardPool, difficulty, participantCount || null);
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
      return actor.addToPot(questId, contribution);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
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
        // Simulate upload progress
        if (onProgress) {
          onProgress(30);
          await new Promise(resolve => setTimeout(resolve, 100));
          onProgress(60);
          await new Promise(resolve => setTimeout(resolve, 100));
          onProgress(90);
        }

        // Convert file to data URL for storage
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
      console.log('[useDeleteQuest] Mutation called with questId:', questId.toString());
      if (!actor) {
        console.error('[useDeleteQuest] Actor not available');
        throw new Error('Actor not available');
      }
      console.log('[useDeleteQuest] Calling actor.deleteQuest...');
      const result = await actor.deleteQuest(questId);
      console.log('[useDeleteQuest] Backend returned:', result);
      return result;
    },
    onMutate: (questId) => {
      console.log('[useDeleteQuest] onMutate - Starting deletion for questId:', questId.toString());
    },
    onSuccess: (data, questId) => {
      console.log('[useDeleteQuest] onSuccess - Quest deleted successfully:', questId.toString());
      toast.success('Quest deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['myPostedBounties'] });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['callerBalance'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
    onError: (error: Error, questId) => {
      console.error('[useDeleteQuest] onError - Failed to delete quest:', questId.toString(), error);
      toast.error(error.message || 'Failed to delete quest');
    },
  });
}

export function useExitQuest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questId: bigint) => {
      console.log('[useExitQuest] Mutation called with questId:', questId.toString());
      if (!actor) throw new Error('Actor not available');
      return actor.exitQuest(questId);
    },
    onSuccess: () => {
      console.log('[useExitQuest] Quest exited successfully');
      toast.success('Successfully exited quest. Your contribution has been refunded.');
      queryClient.invalidateQueries({ queryKey: ['myPostedBounties'] });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
    onError: (error: Error) => {
      console.error('[useExitQuest] Failed to exit quest:', error);
      toast.error(error.message || 'Failed to exit quest');
    },
  });
}

export function useAbandonQuest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questId: bigint) => {
      console.log('[useAbandonQuest] Mutation called with questId:', questId.toString());
      if (!actor) throw new Error('Actor not available');
      return actor.abandonQuest(questId);
    },
    onSuccess: () => {
      console.log('[useAbandonQuest] Quest abandoned successfully');
      toast.success('Quest abandoned. Your deposit has been forfeited and deposit rate reset to 50%.');
      queryClient.invalidateQueries({ queryKey: ['myAcceptedQuests'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
    onError: (error: Error) => {
      console.error('[useAbandonQuest] Failed to abandon quest:', error);
      toast.error(error.message || 'Failed to abandon quest');
    },
  });
}

export function useCancelQuest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questId: bigint) => {
      console.log('[useCancelQuest] Mutation called with questId:', questId.toString());
      if (!actor) throw new Error('Actor not available');
      // Backend doesn't have cancelQuest yet, so we'll use deleteQuest for now
      // which already handles the refund logic
      return actor.deleteQuest(questId);
    },
    onSuccess: () => {
      console.log('[useCancelQuest] Quest cancelled successfully');
      toast.success('Quest cancelled successfully. Full refund has been returned to your balance.');
      queryClient.invalidateQueries({ queryKey: ['myPostedBounties'] });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['callerBalance'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
    onError: (error: Error) => {
      console.error('[useCancelQuest] Failed to cancel quest:', error);
      toast.error(error.message || 'Failed to cancel quest');
    },
  });
}
