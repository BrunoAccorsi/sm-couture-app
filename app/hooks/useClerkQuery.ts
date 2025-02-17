import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseClerkQueryOptions<TData>
  extends Omit<UseQueryOptions<AxiosResponse<TData>, Error>, 'queryFn'> {
  url: string;
  config?: AxiosRequestConfig;
}

export function useClerkQuery<TData = unknown>({
  url,
  config = {},
  ...queryOptions
}: UseClerkQueryOptions<TData>) {
  const { getToken } = useAuth();

  return useQuery({
    ...queryOptions,
    queryFn: async () => {
      const token = await getToken();

      return axios.get<TData>(url, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
}

// Example usage:
/*
interface User {
  id: string;
  name: string;
}

const { data, isLoading } = useClerkQuery<User>({
  queryKey: ['user', userId],
  url: `/api/users/${userId}`,
  config: {
    params: { include: 'profile' }
  }
});
*/
