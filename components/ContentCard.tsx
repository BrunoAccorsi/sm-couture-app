import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Surface, Text, MD3Theme, useTheme } from 'react-native-paper';

interface ContentCardProps {
  imageUrl: string;
  text: string;
}

export const ContentCard = ({ imageUrl, text }: ContentCardProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Surface style={styles.contentSection} elevation={2}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.heroImage}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
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
    sectionText: {
      color: theme.colors.onSurface,
      lineHeight: 22,
    },
  });
