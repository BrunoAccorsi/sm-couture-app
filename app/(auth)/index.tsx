import React, { useCallback, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useSSO } from '@clerk/clerk-expo';
import { View, Button, StyleSheet, Image, ImageBackground } from 'react-native';
import { SButton } from '../components/Button';
import { MD3Theme, Surface, useTheme } from 'react-native-paper';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  const theme = useTheme();
  const styles = createStyles(theme);
  useWarmUpBrowser();

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();

  const onGoogleSignIn = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: 'oauth_google',
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [startSSOFlow]);

  const onAppleSignIn = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: 'oauth_apple',
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [startSSOFlow]);

  return (
    <View style={styles.container}>
      <Surface style={styles.heroContainer} elevation={4}>
        <ImageBackground
          source={require('@/assets/images/app-background.png')}
          style={styles.heroImage}
          imageStyle={styles.heroImageStyle}
        >
          <Image
            source={require('@/assets/images/sm-couture-logo-white.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </ImageBackground>
      </Surface>
      <View style={styles.content}>
        <SButton
          icon="logo-google"
          title="Sign in with Google"
          onPress={onGoogleSignIn}
          variant="google"
        />
        <SButton
          icon="logo-apple"
          title="Sign in with Apple"
          onPress={onAppleSignIn}
          variant="apple"
        />
      </View>
    </View>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 12,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    logo: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginBottom: 'auto',
      marginTop: 'auto',
    },
    heroContainer: {
      height: 500,
      width: '100%',
      overflow: 'hidden',
    },
    heroImage: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    heroImageStyle: {
      resizeMode: 'cover',
    },
    content: {
      paddingTop: 64,
      paddingHorizontal: 64,
      backgroundColor: theme.colors.background,
      borderStartEndRadius: 64,
      marginTop: -124,
      flex: 1,
      gap: 24,
    },
  });
