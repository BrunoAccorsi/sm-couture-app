import React from 'react';
import { StyleSheet, View, ImageBackground, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('@/assets/images/background-intro.png')}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay} />

      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
        style={styles.bottomOverlay}
      />

      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.headline}>
          You want Authentic, here you go!
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          Find it here, buy it now!
        </Text>

        <Button
          mode="contained"
          onPress={() => console.log('Get Started pressed')}
          style={styles.button}
        >
          <Link href="/" style={styles.buttonContent}>
            Get Started
          </Link>
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 114, 195, 0.3)',
  },
  bottomOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: '30%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 150,
    paddingHorizontal: 20,
  },
  headline: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#0472C3',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonContent: {
    color: 'white',
  },
});
