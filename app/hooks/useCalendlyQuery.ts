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

  console.log(calendlyToken);
  console.log(calendlyBaseUrl);
  console.log(calendlyBaseUrl + url);

  return useQuery({
    ...queryOptions,
    queryFn: async () => {
      return axios.get<TData>(calendlyBaseUrl + url, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${calendlyToken}`,
        },
      });
    },
  });
}
