import { HeroSection } from '@/components/HeroSection';
import { ContentCard } from '@/components/ContentCard';
import { ImageCarousel } from '@/components/ImageCarousel';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { aboutContent } from './content';

const carouselImages = [
  require('@/assets/images/app-background.png'),
  require('@/assets/images/app-background.png'),
  require('@/assets/images/app-background.png'),
  require('@/assets/images/app-background.png'),
  require('@/assets/images/app-background.png'),
];

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
            title={section.title}
          />
        ))}

        <ImageCarousel title="Gallery" images={carouselImages} />
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
    carouselSection: {
      marginTop: 24,
      marginBottom: 16,
    },
    carouselTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.colors.onBackground,
    },
    carouselContainer: {
      paddingRight: 16,
    },
    carouselImageWrapper: {
      marginRight: 12,
      borderRadius: 8,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    carouselImage: {
      width: Dimensions.get('window').width * 0.75,
      height: 200,
      borderRadius: 8,
      resizeMode: 'cover',
    },
  });
