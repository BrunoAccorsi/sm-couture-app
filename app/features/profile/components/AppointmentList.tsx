import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  MD3Theme,
  Text,
  useTheme,
} from 'react-native-paper';
import { Schedules } from '../types';
import { AppointmentCard } from './AppointmentCard';
import { EmptyStateView } from './EmptyStateView';

interface AppointmentListProps {
  schedules: Schedules;
  isLoading: boolean;
  onRefresh: () => void;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  schedules,
  isLoading,
  onRefresh,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  if (isLoading) {
    return <ActivityIndicator style={styles.loadingIndicator} />;
  }

  if (schedules.length === 0) {
    return <EmptyStateView />;
  }

  return (
    <>
      <Text variant="titleLarge" style={styles.sectionTitle}>
        Your Appointments
      </Text>
      <FlatList
        data={schedules}
        renderItem={({ item }) => (
          <AppointmentCard schedule={item} onUpdate={onRefresh} />
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onRefresh={onRefresh}
        refreshing={isLoading}
      />
    </>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    sectionTitle: {
      fontWeight: 'bold',
      marginBottom: 12,
      color: theme.colors.onBackground,
    },
    listContent: {
      paddingBottom: 20,
    },
    loadingIndicator: {
      margin: 20,
    },
  });
