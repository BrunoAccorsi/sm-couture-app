import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, MD3Theme, useTheme } from 'react-native-paper';

// Import our new components and hooks
import { ProfileHeader } from '@/app/features/profile/components/ProfileHeader';
import { ProfileInfo } from '@/app/features/profile/components/ProfileInfo';
import { AppointmentList } from '@/app/features/profile/components/AppointmentList';
import { useAppointments } from '@/app/features/profile/hooks/useAppointments';

export default function ProfileScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { user } = useUser();

  const { schedules, isLoading, refetch } = useAppointments();

  if (!user) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProfileHeader
        imageUrl={user.imageUrl}
        fullName={user.fullName}
        email={user.primaryEmailAddress?.emailAddress}
      />

      <View style={styles.contentWrapper}>
        <View style={styles.contentContainer}>
          <ProfileInfo createdAt={user.createdAt} />

          <AppointmentList
            schedules={schedules}
            isLoading={isLoading}
            onRefresh={refetch}
          />
        </View>
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
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentWrapper: {
      flex: 1,
      borderTopEndRadius: 64,
      marginTop: -64,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      padding: 32,
      flex: 1,
    },
  });
