import { useUser } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';

type Props = {
  customUrl: URL | null;
};

const CalendlyWidget = ({ customUrl }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const styles = createStyles(theme);
  const { user } = useUser();
  const webViewRef = useRef<WebView>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!user) {
    return <Redirect href={'/(auth)'} />;
  }

  if (!customUrl) {
    return null;
  }

  const calendlyUrl = `${customUrl}?email=${encodeURIComponent(
    user.primaryEmailAddress?.emailAddress || ''
  )}&name=${encodeURIComponent(
    user.fullName || ''
  )}&salesforce_uuid=${encodeURIComponent(user.id)}`;

  // JavaScript to inject that will check if Calendly is fully loaded
  const injectedJavaScript = `
    (function() {
      function checkCalendlyLoaded() {
        // Check for Calendly booking container which indicates the UI is ready
        if (document.querySelector('div[data-container="booking-container"]')) {
          window.ReactNativeWebView.postMessage('calendly_loaded');
          return;
        }
        setTimeout(checkCalendlyLoaded, 200);
      }
      checkCalendlyLoaded();
      true;
    })();
  `;

  return (
    <View style={styles.container}>
      {/* Show loading screen */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading Calendly: {error}</Text>
        </View>
      ) : (
        <WebView
          ref={webViewRef}
          source={{ uri: calendlyUrl }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          injectedJavaScript={injectedJavaScript}
          onMessage={event => {
            if (event.nativeEvent.data === 'calendly_loaded') {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              setIsLoading(false);
            }
          }}
          onError={e => {
            setError(e.nativeEvent.description || 'Failed to load');
            setIsLoading(false);
          }}
          startInLoadingState={true}
          onHttpError={e => {
            if (e.nativeEvent.statusCode >= 400) {
              setError(`HTTP error ${e.nativeEvent.statusCode}`);
              setIsLoading(false);
            }
          }}
        />
      )}
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
    },
    webView: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    loadingText: {
      marginTop: 10,
      color: theme.colors.onBackground,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.errorContainer,
    },
    errorText: {
      color: theme.colors.onErrorContainer,
      textAlign: 'center',
      padding: 20,
    },
  });

export default CalendlyWidget;
