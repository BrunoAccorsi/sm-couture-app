import { tokenCache } from '@/storage/tokenCache';
import { ClerkProvider } from '@clerk/clerk-expo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { Provider } from 'react-native-paper';
import { PreferencesProvider } from './context/preferencesContext';
import { StatusBar } from 'react-native';
import { CalendlyContext, CalendlyProvider } from './context/CalendlyContext';

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env
  .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <QueryClientProvider client={queryClient}>
          <PreferencesProvider>
            <CalendlyProvider>
              <Slot />
            </CalendlyProvider>
          </PreferencesProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </>
  );
}
