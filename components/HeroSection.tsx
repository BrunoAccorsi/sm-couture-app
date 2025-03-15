import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text, MD3Theme, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

interface HeroSectionProps {
  backgroundImage: any;
  title: string;
  subtitle: string;
  height?: number;
  gradientColors?: readonly [string, string, ...string[]];
}

export const HeroSection = ({
  backgroundImage,
  title,
  subtitle,
  height = 280,
  gradientColors = ['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)'] as const,
}: HeroSectionProps) => {
  const theme = useTheme();
  const styles = createStyles(theme, height);

  return (
    <View style={styles.heroContainer}>
      <ImageBackground
        source={backgroundImage}
        style={styles.heroBackgroundImage}
        imageStyle={styles.heroImageStyle}
      >
        <LinearGradient colors={gradientColors} style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            <Text variant="headlineMedium" style={styles.heroTitle}>
              {title}
            </Text>
            <Text variant="bodyLarge" style={styles.heroSubtitle}>
              {subtitle}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const createStyles = (theme: MD3Theme, height: number) =>
  StyleSheet.create({
    heroContainer: {
      height,
      width: '100%',
      overflow: 'hidden',
    },
    heroBackgroundImage: {
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
      padding: 20,
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
