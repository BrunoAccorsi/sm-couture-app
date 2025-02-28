import { useClerkQuery } from '@/app/hooks/useClerkQuery';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { FontAwesome6 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Divider,
  MD3Theme,
  Text,
  useTheme,
  ActivityIndicator,
  Surface,
} from 'react-native-paper';
import { z } from 'zod';

const scheduleSchema = z.array(
  z.object({
    id: z.number(),
    email: z.string(),
    event: z.string(),
    cancel_url: z.string(),
    reschedule_url: z.string(),
    createdAt: z.string(),
    start_time: z.string(),
    status: z.string(),
  })
);

export type Schedule = z.infer<typeof scheduleSchema>;

export default function ProfileScreen() {
  const router = useRouter();
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
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const { data, isLoading } = useClerkQuery({
    queryKey: ['test'],
    url: 'https://sm-couture-app-api-a19z.vercel.app/api/schedules',
    config: {
      params: { email: user?.primaryEmailAddress?.emailAddress },
    },
  });

  const parsedData = scheduleSchema.safeParse(data?.data);
  const schedules = parsedData.success ? parsedData.data : [];

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content
          title="My Profile"
          titleStyle={styles.appBarTitle}
          color={theme.colors.onSurface}
        />
      </Appbar.Header>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Surface style={styles.profileHeader}>
          <Avatar.Image size={100} source={{ uri: user.imageUrl }} />
          <Text variant="headlineSmall" style={styles.name}>
            {user.fullName}
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {user.primaryEmailAddress?.emailAddress}
          </Text>
        </Surface>

        <Button
          mode="contained"
          icon="logout"
          onPress={handleSignOut}
          style={styles.signOutButton}
          contentStyle={styles.signOutButtonContent}
        >
          Sign Out
        </Button>

        <Card style={styles.infoCard} mode="outlined">
          <Card.Content>
            <View style={styles.infoRow}>
              <FontAwesome6
                name="calendar"
                size={16}
                color={theme.colors.primary}
              />
              <Text variant="titleMedium" style={styles.infoLabel}>
                Member since
              </Text>
              <Text variant="bodyLarge" style={styles.infoValue}>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {isLoading ? (
          <ActivityIndicator style={styles.loadingIndicator} />
        ) : (
          <>
            {schedules.length > 0 ? (
              <>
                <Text variant="titleLarge" style={styles.sectionTitle}>
                  Your Appointments
                </Text>
                {schedules.map((schedule) => (
                  <Card
                    key={schedule.id}
                    style={styles.appointmentCard}
                    mode="outlined"
                  >
                    <Card.Content>
                      <View style={styles.appointmentHeader}>
                        <FontAwesome6
                          name="calendar-check"
                          size={20}
                          color={theme.colors.primary}
                        />
                        <Text variant="titleMedium" style={styles.eventTitle}>
                          {schedule.event}
                        </Text>
                      </View>
                      <Divider style={styles.divider} />
                      <View style={styles.appointmentDetails}>
                        <Text variant="bodyMedium" style={styles.detailLabel}>
                          Created:
                        </Text>
                        <Text variant="bodyMedium">
                          {new Date(schedule.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.appointmentActions}>
                        <Button
                          mode="outlined"
                          icon="calendar-clock"
                          contentStyle={styles.buttonContent}
                          style={styles.rescheduleButton}
                          onPress={() =>
                            router.push({
                              pathname: '/scheduling',
                              params: { url: schedule.reschedule_url },
                            })
                          }
                        >
                          Reschedule
                        </Button>
                        <Button
                          mode="outlined"
                          icon="calendar-remove"
                          contentStyle={styles.buttonContent}
                          style={styles.cancelButton}
                          onPress={() =>
                            router.push({
                              pathname: '/scheduling',
                              params: { url: schedule.cancel_url },
                            })
                          }
                        >
                          Cancel
                        </Button>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
              </>
            ) : (
              <Card style={styles.emptyStateCard}>
                <Card.Content style={styles.emptyStateContent}>
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
                </Card.Content>
              </Card>
            )}
          </>
        )}
      </ScrollView>
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
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      padding: 16,
    },
    appBar: {
      backgroundColor: theme.colors.surface,
      elevation: 4,
    },
    appBarTitle: {
      fontWeight: 'bold',
    },
    profileHeader: {
      alignItems: 'center',
      padding: 20,
      marginBottom: 16,
      borderRadius: 12,
    },
    name: {
      fontWeight: 'bold',
      color: theme.colors.onPrimaryContainer,
      marginBottom: 4,
    },
    email: {
      color: theme.colors.onPrimaryContainer,
      opacity: 0.8,
    },
    infoCard: {
      marginBottom: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.surfaceVariant,
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
    sectionTitle: {
      fontWeight: 'bold',
      marginBottom: 12,
      color: theme.colors.onBackground,
    },
    appointmentCard: {
      marginBottom: 16,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      elevation: 2,
    },
    appointmentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    eventTitle: {
      marginLeft: 12,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      flex: 1,
    },
    divider: {
      marginVertical: 12,
      height: 1,
      backgroundColor: theme.colors.outlineVariant,
    },
    appointmentDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    detailLabel: {
      fontWeight: '500',
      marginRight: 8,
      color: theme.colors.onSurfaceVariant,
    },
    appointmentActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    buttonContent: {
      height: 40,
    },
    rescheduleButton: {
      flex: 1,
      marginRight: 8,
      borderColor: theme.colors.primary,
    },
    cancelButton: {
      flex: 1,
      marginLeft: 8,
      borderColor: theme.colors.error,
    },
    emptyStateCard: {
      padding: 20,
      alignItems: 'center',
      marginBottom: 24,
      borderRadius: 12,
    },
    emptyStateContent: {
      alignItems: 'center',
      paddingVertical: 20,
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
    signOutButton: {
      marginTop: 8,
      marginBottom: 24,
      backgroundColor: theme.colors.errorContainer,
    },
    signOutButtonContent: {
      paddingVertical: 6,
    },
    loadingIndicator: {
      margin: 20,
    },
  });
