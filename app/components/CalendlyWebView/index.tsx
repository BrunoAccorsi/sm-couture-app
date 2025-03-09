import { useUser } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';

type Props = {
  customUrl: string | null;
};

const CalendlyWidget = ({ customUrl }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const styles = createStyles(theme);
  const { user } = useUser();

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

  return (
    <View style={styles.container}>
      {/* Show loading screen */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text
            style={[styles.loadingText, { color: theme.colors.onBackground }]}
          >
            Loading Calendly...
          </Text>
        </View>
      )}

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading Calendly: {error}</Text>
        </View>
      ) : (
        <WebView
          source={{ uri: calendlyUrl }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadEnd={() => {
            setIsLoading(false);
          }}
          onError={(e) => {
            setError(e.nativeEvent.description || 'Failed to load');
            setIsLoading(false);
          }}
          startInLoadingState={true}
          onHttpError={(e) => {
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
      backgroundColor: theme.colors.background,
    },
    webView: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.background,
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
