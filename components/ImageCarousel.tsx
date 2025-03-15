import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
  FlatList,
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
  imageHeight = imageWidth,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, imageWidth, imageHeight);

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageSourcePropType;
    index: number;
  }) => (
    <View key={index} style={styles.carouselImageWrapper}>
      <Image source={item} style={styles.carouselImage} />
    </View>
  );

  return (
    <View style={styles.carouselSection}>
      <Text style={styles.carouselTitle}>{title}</Text>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
      />
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
