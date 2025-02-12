import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot, Redirect } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { customTheme } from './theme';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@/cache';

const queryClient = new QueryClient();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY');
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <PaperProvider theme={customTheme}>
          <QueryClientProvider client={queryClient}>
            <AuthGate>
              {/* Se o usuário estiver logado, <Slot /> renderiza o restante do app */}
              <Slot />
            </AuthGate>
          </QueryClientProvider>
        </PaperProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}