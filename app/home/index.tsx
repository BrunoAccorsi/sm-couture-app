import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Appbar,
  Text,
  Button,
  Card,
  Chip,
  Avatar,
  Searchbar,
  useTheme,
} from 'react-native-paper';
import { MD3Theme } from 'react-native-paper';
import numeral from 'numeral';

export default function ProductScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* App Header */}
      <Appbar.Header style={styles.appBar}>
        <Appbar.Action
          icon="menu"
          onPress={() => console.log('Menu clicked')}
        />
        <Appbar.Content title="Stylish" color={theme.colors.onSurface} />
        <FontAwesome6 name="circle-user" size={40} style={styles.avatar} />
      </Appbar.Header>

      <ScrollView>
        {/* Search and Filters */}
        <View style={styles.searchSection}>
          <Searchbar
            placeholder="Search any Product..."
            style={styles.searchBar}
            inputStyle={styles.searchBarText}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            value=""
          />
          <View style={styles.sortFilter}>
            <Chip
              onPress={() => console.log('Sort')}
              style={styles.chip}
              textStyle={styles.chipText}
            >
              Sort
            </Chip>
            <Chip
              onPress={() => console.log('Filter')}
              icon="filter"
              style={styles.chip}
              textStyle={styles.chipText}
            >
              Filter
            </Chip>
          </View>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categorySection}
        >
          {['Beauty', 'Fashion', 'Kids', 'Mens', 'Women'].map(
            (category, index) => (
              <Chip
                key={index}
                style={styles.categoryChip}
                textStyle={styles.categoryChipText}
                onPress={() => console.log(`${category} clicked`)}
                avatar={
                  <Avatar.Icon
                    icon="tag"
                    size={18}
                    style={{ backgroundColor: theme.colors.secondary }}
                  />
                }
              >
                {category}
              </Chip>
            )
          )}
        </ScrollView>

        {/* Promotional Banner */}
        <Card style={styles.promoBanner}>
          <Card.Cover
            source={require('../../assets/images/icon.png')}
            style={styles.promoImage}
          />
          <Card.Content>
            <Text style={styles.promoText}>50-40% OFF</Text>
            <Text style={styles.promoDescription}>
              Now in (product) - All colors
            </Text>
            <Button mode="contained" style={styles.promoButton}>
              Shop Now
            </Button>
          </Card.Content>
        </Card>

        {/* Deal of the Day Section */}
        <View style={styles.dealSection}>
          <View style={styles.dealHeader}>
            <Text style={styles.dealTitle}>Deal of the Day</Text>
            <Button
              mode="text"
              textColor={theme.colors.primary}
              onPress={() => console.log('View all clicked')}
            >
              View All
            </Button>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Card style={styles.productCard}>
              <Card.Cover source={require('../../assets/images/icon.png')} />
              <Card.Content>
                <Text style={styles.productName}>Women Gucci Boot</Text>
                <Text style={styles.productPrice}>
                  CAD {numeral(2500).format('0,0.00')}
                </Text>
                <Text style={styles.productDiscount}>40% OFF</Text>
              </Card.Content>
            </Card>
            <Card style={styles.productCard}>
              <Card.Cover source={require('../../assets/images/icon.png')} />
              <Card.Content>
                <Text style={styles.productName}>Prada Dress</Text>
                <Text style={styles.productPrice}>
                  CAD {numeral(2500).format('0,0.00')}
                </Text>
                <Text style={styles.productDiscount}>50% OFF</Text>
              </Card.Content>
            </Card>
          </ScrollView>
        </View>
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
    appBar: {
      backgroundColor: theme.colors.surface,
    },
    searchSection: {
      padding: 10,
    },
    searchBar: {
      marginBottom: 10,
      borderRadius: 8,
      backgroundColor: theme.colors.surfaceVariant,
    },
    searchBarText: {
      color: theme.colors.onSurface,
    },
    sortFilter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    chip: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 20,
      marginRight: 10,
    },
    chipText: {
      color: theme.colors.onSurfaceVariant,
    },
    categorySection: {
      padding: 10,
    },
    categoryChip: {
      backgroundColor: theme.colors.secondaryContainer,
      marginRight: 10,
      borderRadius: 20,
    },
    categoryChipText: {
      color: theme.colors.onSecondaryContainer,
      fontSize: 14,
      marginLeft: 8,
      marginRight: 8,
    },
    promoBanner: {
      margin: 10,
      borderRadius: 8,
      overflow: 'hidden',
    },
    promoImage: {
      borderRadius: 8,
    },
    promoText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginTop: 10,
    },
    promoDescription: {
      color: theme.colors.onSurface,
    },
    promoButton: {
      marginTop: 10,
      backgroundColor: theme.colors.primary,
    },
    dealSection: {
      padding: 10,
    },
    dealHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dealTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.onBackground,
    },
    viewAllButton: {
      color: theme.colors.primary,
    },
    productCard: {
      width: 150,
      margin: 10,
      borderRadius: 8,
    },
    productName: {
      color: theme.colors.onSurface,
    },
    productPrice: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    productDiscount: {
      fontSize: 12,
      color: theme.colors.error,
    },
    avatar: {
      color: theme.colors.backdrop,
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
    },
  });
