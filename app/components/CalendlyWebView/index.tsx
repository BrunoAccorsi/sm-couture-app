import React, { useState } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const CalendlyWidget = () => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>Loading Calendly...</Text>
        </View>
      )}
      <WebView
        source={{
          uri: 'https://calendly.com/b-bergoli/kids-corner?background_color=1a1a1a&text_color=ffffff&primary_color=2a4e81&&email=b.bergoli@gmail.com',
        }}
        opaque={false}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    loadingText: {
      marginTop: 10,
      color: 'white',
    },
    webview: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  });

export default CalendlyWidget;
