import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { customTheme } from './theme';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <PaperProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </PaperProvider>
  );
}
