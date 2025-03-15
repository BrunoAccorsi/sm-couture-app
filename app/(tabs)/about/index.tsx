import { HeroSection } from '@/components/HeroSection';
import { ContentCard } from '@/components/ContentCard';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { aboutContent } from './content';

export default function AboutScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeroSection
        backgroundImage={require('@/assets/images/app-background.png')}
        title="About Sharifa"
        subtitle="Fashion Designer & Financial Advisor"
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {aboutContent.map((section, index) => (
          <ContentCard
            key={index}
            imageUrl={section.imageUrl}
            text={section.text}
          />
        ))}
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
    scrollView: {
      flex: 1,
      borderTopEndRadius: 64,
      marginTop: -64,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: 16,
      paddingTop: 80,
      paddingBottom: 24,
    },
    heroContainer: {
      height: 280,
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
    contentSection: {
      marginBottom: 20,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
    },
    heroImage: {
      width: '100%',
      height: 200,
    },
    textContainer: {
      padding: 16,
    },
    sectionText: {
      color: theme.colors.onSurface,
      lineHeight: 22,
    },
  });
