import { Slot, router } from 'expo-router';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { tokenCache } from '@/storage/tokenCache';

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

function InitialLayout(){
  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    if(!isLoaded) return

    if(isSignedIn){
      router.replace("/(auth)")
    } else {
      router.replace("/(public)")
    }
  }, [isSignedIn])
  
  return isLoaded ? ( 
    <Slot />
    ) : (
      <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center"}}
      />
    )
}

export default function Layout() {
  return (
    <ClerkProvider 
    publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY} 
    tokenCache={tokenCache}
    >
      
      <Slot />
    </ClerkProvider>
  )
}



// import React from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Slot, Redirect } from 'expo-router';
// import { PaperProvider } from 'react-native-paper';
// import { customTheme } from './theme';
// import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
// import { tokenCache } from '@/cache';

// const queryClient = new QueryClient();
// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// if (!publishableKey) {
//   throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY');
// }

// export default function RootLayout() {
//   return (
//     <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
//       <ClerkLoaded>
//         <PaperProvider theme={customTheme}>
//           <QueryClientProvider client={queryClient}>
//             {/* Se o usuário estiver logado, <Slot /> renderiza o restante do app */}
//             <Slot />
//           </QueryClientProvider>
//         </PaperProvider>
//       </ClerkLoaded>
//     </ClerkProvider>
//   );
// }
