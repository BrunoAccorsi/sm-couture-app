import { useCalendlyQuery } from '@/app/hooks/useCalendlyQuery';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Appbar,
  Button,
  Card,
  MD3Theme,
  Text,
  useTheme,
} from 'react-native-paper';
import { z } from 'zod';

const EventsSchema = z.object({
  collection: z.array(
    z.object({
      name: z.string(),
      description_plain: z.string(),
      scheduling_url: z.string(),
    })
  ),
});

export default function ProfileScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  const { data } = useCalendlyQuery({
    queryKey: ['events'],
    url: '/event_types',
    config: {
      params: { user: process.env.EXPO_PUBLIC_CALENDLY_API_USER },
    },
  });

  const parsedEvents = EventsSchema.safeParse(data?.data);

  const events = parsedEvents.success ? parsedEvents.data.collection : [];

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Home" color={theme.colors.onSurface} />
      </Appbar.Header>
      {events.map((event) => (
        <Card key={event.name} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">{event.name}</Text>
            <Text variant="bodyMedium">{event.description_plain}</Text>
            <Button
              mode="contained"
              onPress={() => {
                router.push({
                  pathname: '/scheduling',
                  params: { url: event.scheduling_url },
                });
              }}
            >
              Schedule
            </Button>
          </Card.Content>
        </Card>
      ))}
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
