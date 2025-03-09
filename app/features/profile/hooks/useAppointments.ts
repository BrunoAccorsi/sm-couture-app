import { useClerkQuery } from '@/app/hooks/useClerkQuery';
import { useSegments } from 'expo-router';
import { useEffect } from 'react';
import { scheduleSchema, Schedule, Schedules, schedulesSchema } from '../types';

export function useAppointments() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL!;
  const segments = useSegments();

  const { data, isLoading, refetch, error } = useClerkQuery({
    queryKey: ['userAppointments'],
    url: `${apiUrl}/schedules`,
    refetchOnMount: true,
  });

  // Refresh data when user navigates between tabs
  useEffect(() => {
    refetch();
  }, [segments, refetch]);

  const parsedData = schedulesSchema.safeParse(data?.data);
  const schedules: Schedules = parsedData.success ? parsedData.data : [];

  return {
    schedules,
    isLoading,
    refetch,
    error,
  };
}
