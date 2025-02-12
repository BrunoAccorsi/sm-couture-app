import React, { useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const CalendlyWidget = () => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* Show loading screen with dark background */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>Loading Calendly...</Text>
        </View>
      )}

      <WebView
        source={{
          uri: 'https://calendly.com/b-bergoli/kids-corner?background_color=1a1a1a&text_color=ffffff&primary_color=2a4e81&email=b.bergoli@gmail.com',
        }}
        opaque={false}
        style={{ opacity: isLoading ? 0 : 1, backgroundColor: 'transparent' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadEnd={() => setTimeout(() => setIsLoading(false), 2 * 1000)} // Adds 2s loading time for calendly to load branding
      />
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background, // Prevents white flash
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.background, // Keeps loading screen black
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      color: 'white',
    },
  });

export default CalendlyWidget;
