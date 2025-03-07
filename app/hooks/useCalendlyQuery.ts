import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseCalendlyQueryOptions<TData>
  extends Omit<UseQueryOptions<AxiosResponse<TData>, Error>, 'queryFn'> {
  url: string;
  config?: AxiosRequestConfig;
}

export function useCalendlyQuery<TData = unknown>({
  url,
  config = {},
  ...queryOptions
}: UseCalendlyQueryOptions<TData>) {
  const calendlyToken = process.env.EXPO_PUBLIC_CALENDLY_API_KEY!;
  const calendlyBaseUrl = process.env.EXPO_PUBLIC_CALENDLY_API_URL!;

  return useQuery({
    ...queryOptions,
    queryFn: async () => {
      try {
        const response = await axios.get<TData>(calendlyBaseUrl + url, {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${calendlyToken}`,
          },
        });

        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const errorMessage = error.response?.data?.message || error.message;

          console.error(`Calendly API error: ${status} - ${errorMessage}`);
          throw new Error(errorMessage || 'Error fetching data from Calendly');
        }

        console.error('Unexpected error:', error);
        throw error;
      }
    },
  });
}
