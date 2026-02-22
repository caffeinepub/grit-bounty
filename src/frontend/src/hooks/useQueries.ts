import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { UserProfile } from '../backend';
import { Difficulty, Quest } from '../types';

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

// Placeholder hooks for quest functionality (backend not yet implemented)
export function useGetActiveQuestsByDifficulty(difficulty: Difficulty) {
  const { actor, isFetching } = useActor();

  return useQuery<Quest[]>({
    queryKey: ['activeQuests', difficulty],
    queryFn: async () => {
      if (!actor) return [];
      // Backend method not yet implemented
      return [];
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
    }: {
      title: string;
      description: string;
      rewardPool: bigint;
      difficulty: Difficulty;
    }) => {
      if (!actor) throw new Error('Actor not available');
      // Backend method not yet implemented
      throw new Error('Quest creation not yet implemented in backend');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
    },
  });
}

export function useAcceptQuest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questId, amount }: { questId: bigint; amount: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      // Backend method not yet implemented
      throw new Error('Quest acceptance not yet implemented in backend');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['userAcceptedQuests'] });
    },
  });
}

export function useGetUserAcceptedQuests() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Quest[]>({
    queryKey: ['userAcceptedQuests'],
    queryFn: async () => {
      if (!actor || !identity) return [];
      // Backend method not yet implemented
      return [];
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}
