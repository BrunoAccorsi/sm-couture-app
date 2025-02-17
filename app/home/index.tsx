import CalendlyWidget from '@app/components/CalendlyWebView';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { FontAwesome6 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, MD3Theme, Text, useTheme } from 'react-native-paper';
import z from 'zod';
import { useClerkQuery } from '../hooks/useClerkQuery';

const scheduleSchema = z.array(
  z.object({
    id: z.number(),
    email: z.string(),
    event: z.string(),
    cancel_url: z.string(),
    reschedule_url: z.string(),
    createdAt: z.string(),
  })
);

export type Schedule = z.infer<typeof scheduleSchema>;

export default function ProductScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { signOut } = useClerk();

  const { user } = useUser();

  if (!user) {
    return null;
  }

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

  const { data, isLoading } = useClerkQuery({
    queryKey: ['test'],
    url: 'https://sm-couture-app-api-a19z.vercel.app/api/schedules',
    config: {
      params: { email: user.primaryEmailAddress?.emailAddress },
    },
  });
  console.log(data?.data);

  const parsedData = scheduleSchema.safeParse(data?.data);

  //scheduled events
  const schedules = parsedData.success ? parsedData.data : [];
  console.log(schedules);

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
      {!isLoading && (
        <>
          {schedules.map((schedule) => (
            <View key={schedule.id}>
              <Text>{schedule.event}</Text>
              <Text>{schedule.reschedule_url}</Text>
            </View>
          ))}
        </>
      )}
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
