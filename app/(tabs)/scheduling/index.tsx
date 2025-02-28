import CalendlyWidget from '@app/components/CalendlyWebView';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { FontAwesome6 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Divider,
  MD3Theme,
  Menu,
  Text,
  useTheme,
} from 'react-native-paper';
import z from 'zod';
import { useClerkQuery } from '../../hooks/useClerkQuery';
import { useLocalSearchParams } from 'expo-router';

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
  const { url } = useLocalSearchParams();

  const theme = useTheme();
  const styles = createStyles(theme);
  const { signOut } = useClerk();
  const [menuVisible, setMenuVisible] = useState(false);

  const { user } = useUser();

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
      params: { email: user?.primaryEmailAddress?.emailAddress },
    },
  });
  console.log(data?.data);

  const parsedData = scheduleSchema.safeParse(data?.data);

  //scheduled events
  const schedules = parsedData.success ? parsedData.data : [];
  console.log(schedules);
  console.log(user?.imageUrl);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* App Header */}
      <Appbar.Header style={styles.appBar}>
        {/* <Appbar.Action
          icon="menu"
          onPress={() => console.log('Menu clicked')}
        /> */}
        <Appbar.Content title="Schedule" color={theme.colors.onSurface} />
        {/* Clickable Avatar with Menu */}
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Avatar.Image
              size={40}
              source={{ uri: user.imageUrl }}
              style={styles.avatar}
              onTouchEnd={() => setMenuVisible(true)}
            />
          }
          anchorPosition="bottom"
        >
          <Menu.Item onPress={handleSignOut} title="Sign Out" />
          <Divider />
          <Menu.Item
            onPress={() => console.log('Profile clicked')}
            title="View Profile"
          />
        </Menu>
      </Appbar.Header>
      <CalendlyWidget url={url} />
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
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
  });
