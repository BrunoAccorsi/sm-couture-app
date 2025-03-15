import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';

interface ImageCarouselProps {
  title: string;
  images: ImageSourcePropType[];
  imageWidth?: number;
  imageHeight?: number;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  title,
  images,
  imageWidth = Dimensions.get('window').width * 0.75,
  imageHeight = 200,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, imageWidth, imageHeight);

  return (
    <View style={styles.carouselSection}>
      <Text style={styles.carouselTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.carouselImageWrapper}>
            <Image source={image} style={styles.carouselImage} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (
  theme: MD3Theme,
  imageWidth: number,
  imageHeight: number
) =>
  StyleSheet.create({
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
      width: imageWidth,
      height: imageHeight,
      borderRadius: 8,
      resizeMode: 'cover',
    },
  });
