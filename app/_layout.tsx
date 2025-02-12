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

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <PaperProvider theme={customTheme}>
          <QueryClientProvider client={queryClient}>
            {/* Se o usuário estiver logado, <Slot /> renderiza o restante do app */}
            <Slot />
          </QueryClientProvider>
        </PaperProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
