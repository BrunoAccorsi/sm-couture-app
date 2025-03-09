import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { MD3Theme, Text, useTheme } from 'react-native-paper';

export const EmptyStateView: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.emptyStateCard}>
      <FontAwesome6
        name="calendar-xmark"
        size={48}
        color={theme.colors.onSurfaceDisabled}
      />
      <Text variant="titleMedium" style={styles.emptyStateText}>
        No appointments scheduled
      </Text>
      <Text variant="bodyMedium" style={styles.emptyStateSubtext}>
        Your upcoming appointments will appear here
      </Text>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    emptyStateCard: {
      padding: 20,
      alignItems: 'center',
      marginBottom: 24,
      borderRadius: 12,
    },
    emptyStateText: {
      marginTop: 16,
      color: theme.colors.onSurfaceVariant,
    },
    emptyStateSubtext: {
      marginTop: 8,
      textAlign: 'center',
      color: theme.colors.onSurfaceDisabled,
    },
  });
