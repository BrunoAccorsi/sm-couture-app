import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Slot } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const theme = useTheme();

  // Show loading indicator while authentication state is being determined
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href={'/home'} />;
  }

  return <Slot />;
}
