import { useClerk, useUser } from '@clerk/clerk-expo';
import { FontAwesome6 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Divider,
  MD3Theme,
  Text,
  useTheme,
} from 'react-native-paper';

export default function ProfileScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL('/'));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Profile" color={theme.colors.onSurface} />
      </Appbar.Header>

      <View style={styles.content}>
        <Avatar.Image
          size={120}
          source={{ uri: user.imageUrl }}
          style={styles.avatar}
        />
        
        <Text variant="headlineMedium" style={styles.name}>
          {user.fullName}
        </Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Email</Text>
            <Text variant="bodyLarge">{user.primaryEmailAddress?.emailAddress}</Text>
            
            <Divider style={styles.divider} />
            
            <Text variant="titleMedium">Created At</Text>
            <Text variant="bodyLarge">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </Text>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleSignOut}
          style={styles.signOutButton}
        >
          Sign Out
        </Button>
      </View>
    </View>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
    },
    appBar: {
      backgroundColor: theme.colors.surface,
    },
    avatar: {
      marginVertical: 20,
    },
    name: {
      color: theme.colors.primary,
      marginBottom: 20,
    },
    card: {
      width: '100%',
      backgroundColor: theme.colors.surface,
      marginBottom: 20,
    },
    divider: {
      marginVertical: 15,
    },
    signOutButton: {
      marginTop: 20,
      width: '100%',
      backgroundColor: theme.colors.error,
    },
  });