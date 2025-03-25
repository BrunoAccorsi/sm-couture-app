import { useUser } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, TextInput, useTheme, MD3Theme } from 'react-native-paper';

export default function EditProfileScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { user } = useUser();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || '');
  const [loading, setLoading] = useState(false);

  // If user data is not loaded yet, show a loading indicator
  if (!user) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      // Split the fullName into first and last names
      const [firstName, ...lastNameParts] = fullName.split(' ');
      const lastName = lastNameParts.join(' ');

      // Update the first and last name using user.update()
      await user.update({
        firstName,
        lastName,
      });

      // Clerk does not allow direct email updates for security reasons
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        style={styles.input}
        disabled //the email address cannot be updated directly through the update() method for security reasons. 
      />
      <Button
        mode="contained"
        onPress={handleSave}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Save
      </Button>
    </View>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
      justifyContent: 'center',
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
    input: {
      marginBottom: 15,
    },
    button: {
      marginTop: 10,
    },
  });
