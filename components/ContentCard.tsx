import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';
import { Surface, Text, MD3Theme, useTheme } from 'react-native-paper';

interface ContentCardProps {
  imageUrl: ImageSourcePropType;
  text: string;
  title: string;
}

export const ContentCard = ({ imageUrl, text, title }: ContentCardProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Surface style={styles.contentSection} elevation={2}>
      <Image source={imageUrl} style={styles.heroImage} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.sectionText}>{text}</Text>
      </View>
    </Surface>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
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
    titleText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.colors.onSurface,
    },
    sectionText: {
      color: theme.colors.onSurface,
      lineHeight: 22,
    },
  });
