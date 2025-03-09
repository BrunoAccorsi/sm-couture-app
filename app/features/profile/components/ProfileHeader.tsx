import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, MD3Theme, Surface, Text, useTheme } from 'react-native-paper';

interface ProfileHeaderProps {
  imageUrl: string | null;
  fullName: string | null;
  email: string | null | undefined;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  imageUrl,
  fullName,
  email,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Surface style={styles.heroContainer} elevation={4}>
      <ImageBackground
        source={require('@/assets/images/app-background.png')}
        style={styles.heroImage}
        imageStyle={styles.heroImageStyle}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
          style={styles.heroOverlay}
        >
          <View style={styles.heroContent}>
            <Avatar.Image
              size={100}
              source={
                imageUrl
                  ? { uri: imageUrl }
                  : require('@/assets/images/user-fallback.png')
              }
            />
            <Text variant="headlineMedium" style={styles.heroTitle}>
              {fullName}
            </Text>
            {email && (
              <Text variant="bodyLarge" style={styles.heroSubtitle}>
                {email}
              </Text>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </Surface>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    heroContainer: {
      height: 340,
      width: '100%',
      overflow: 'hidden',
    },
    heroImage: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    heroImageStyle: {
      resizeMode: 'cover',
    },
    heroOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 64,
    },
    heroContent: {
      paddingTop: 240,
      alignItems: 'center',
    },
    heroTitle: {
      color: 'white',
      fontWeight: 'bold',
      marginBottom: 8,
      fontFamily: 'serif',
    },
    heroSubtitle: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '500',
      marginBottom: 12,
    },
  });
