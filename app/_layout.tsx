import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </PaperProvider>
  );
}
