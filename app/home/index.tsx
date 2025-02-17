import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, MD3Theme, useTheme } from 'react-native-paper';
import CalendlyWidget from '@app/components/CalendlyWebView';
import { useClerk } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

export default function ProductScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'));
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      {/* App Header */}
      <Appbar.Header style={styles.appBar}>
        <Appbar.Action
          icon="menu"
          onPress={() => console.log('Menu clicked')}
        />
        <Appbar.Content title="Schedule" color={theme.colors.onSurface} />
        <Button onPress={handleSignOut}>Sign Out</Button>
        <FontAwesome6 name="circle-user" size={40} style={styles.avatar} />
      </Appbar.Header>
      <CalendlyWidget />
    </View>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    appBar: {
      backgroundColor: theme.colors.surface,
    },
    avatar: {
      color: theme.colors.backdrop,
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
    },
  });
