import { usePreferences } from '@/app/context/preferencesContext';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Divider, MD3Theme, Switch, Text, useTheme } from 'react-native-paper';
import * as Linking from 'expo-linking';
import { useClerk } from '@clerk/clerk-expo';

interface ProfileInfoProps {
  createdAt: Date | null;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ createdAt }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { isThemeDark, toggleTheme } = usePreferences();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL('/'));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.infoCard}>
      <View style={styles.infoRow}>
        <FontAwesome6 name="calendar" size={16} color={theme.colors.primary} />
        <Text variant="titleMedium" style={styles.infoLabel}>
          Member since
        </Text>
        <Text variant="bodyLarge" style={styles.infoValue}>
          {createdAt
            ? new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'N/A'}
        </Text>
      </View>

      <Divider style={styles.divider} />

      <TouchableOpacity onPress={handleSignOut} style={styles.infoRow}>
        <FontAwesome6
          name="arrow-right-from-bracket"
          size={16}
          color={theme.colors.primary}
        />
        <Text variant="titleMedium" style={styles.infoLabel}>
          Sign Out
        </Text>
      </TouchableOpacity>

      <Divider style={styles.divider} />

      <View style={styles.infoRow}>
        <FontAwesome6
          name={isThemeDark ? 'moon' : 'sun'}
          size={16}
          color={theme.colors.primary}
        />
        <Text variant="titleMedium" style={styles.infoLabel}>
          Dark Mode
        </Text>
        <Switch value={isThemeDark} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    infoCard: {
      marginBottom: 24,
      borderRadius: 12,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    infoLabel: {
      marginLeft: 12,
      color: theme.colors.onSurfaceVariant,
      flex: 1,
    },
    infoValue: {
      textAlign: 'right',
      fontWeight: '500',
    },
    divider: {
      marginVertical: 12,
      height: 1,
      backgroundColor: theme.colors.outlineVariant,
    },
    signOutButton: {
      marginTop: 8,
      marginBottom: 24,
      backgroundColor: theme.colors.errorContainer,
      color: theme.colors.onError,
    },
    signOutButtonContent: {
      paddingVertical: 6,
    },
  });
