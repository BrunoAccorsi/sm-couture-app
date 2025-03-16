import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      backgroundColor: theme.colors.primary,
      padding: 22,
      borderRadius: 16,
    },
    icon: {
      color: theme.colors.onPrimary,
      fontSize: 20,
    },
    text: {
      color: theme.colors.onPrimary,
      fontSize: 16,
    },
    // Google button styling
    googleContainer: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
    },
    googleIcon: {
      color: '#4285F4', // Keep the Google brand color
    },
    googleText: {
      color: theme.colors.onSurfaceVariant,
      fontWeight: '500',
    },
    // Apple button styling
    appleContainer: {
      borderWidth: 1,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.outlineVariant,
    },
    appleIcon: {
      color: theme.colors.onSurfaceVariant,
    },
    appleText: {
      color: theme.colors.onSurfaceVariant,
      fontWeight: '500',
    },
  });
