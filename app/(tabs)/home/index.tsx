import CalendlyModal from '@/app/components/CalendlyModal';
import { useCalendly } from '@/app/context/CalendlyContext';
import { useCalendlyQuery } from '@/app/hooks/useCalendlyQuery';
import { stripHtmlTags } from '@/app/utils/utils';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Divider,
  MD3Theme,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import { z } from 'zod';

const EventsSchema = z.object({
  collection: z.array(
    z.object({
      name: z.string(),
      description_html: z.string(),
      scheduling_url: z.string(),
      duration: z.number(),
      locations: z
        .array(
          z.object({
            kind: z.string(),
            location: z.string(),
          })
        )
        .nullable(),
    })
  ),
});

export default function HomeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { setUrl } = useCalendly();

  const { data, isLoading } = useCalendlyQuery({
    queryKey: ['events'],
    url: '/event_types',
    config: {
      params: { user: process.env.EXPO_PUBLIC_CALENDLY_API_USER },
    },
  });

  const parsedEvents = EventsSchema.safeParse(data?.data);
  const events = parsedEvents.success ? parsedEvents.data.collection : [];

  const toggleExpanded = (name: string) => {
    setExpandedId(expandedId === name ? null : name);
  };

  // Function to get appropriate icon for event type
  const getEventIcon = (name: string) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('consultation')) return 'comments';
    if (nameLower.includes('fitting')) return 'ruler';
    if (nameLower.includes('design')) return 'pencil-ruler';
    return 'calendar-check'; // default icon
  };

  return (
    <CalendlyModal>
      {(onOpen) => (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          {/* Hero Section */}
          <Surface style={styles.heroContainer} elevation={4}>
            <ImageBackground
              source={require('../../../assets/images/app-background.png')}
              style={styles.heroImage}
              imageStyle={styles.heroImageStyle}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
                style={styles.heroOverlay}
              >
                <View style={styles.heroContent}>
                  <Text variant="headlineMedium" style={styles.heroTitle}>
                    Tailored Perfection
                  </Text>
                  <Text variant="bodyLarge" style={styles.heroSubtitle}>
                    Book your appointment for a personalized fashion experience
                  </Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </Surface>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            scrollEventThrottle={16} // Throttle for better performance
          >
            {/* Services Section */}

            <View style={styles.content}>
              <Text variant="headlineSmall" style={styles.sectionTitle}>
                Our Services
              </Text>

              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                  />
                  <Text style={styles.loadingText}>
                    Loading available appointments...
                  </Text>
                </View>
              ) : (
                <View style={styles.eventsContainer}>
                  {events.map((event) => {
                    return (
                      <Card
                        key={event.name}
                        style={styles.card}
                        mode="outlined"
                        onPress={() => toggleExpanded(event.name)}
                      >
                        <Card.Content style={styles.cardContent}>
                          <View style={styles.cardHeader}>
                            <FontAwesome6
                              name={getEventIcon(event.name)}
                              size={24}
                              color={theme.colors.primary}
                              style={styles.cardIcon}
                            />
                            <Text
                              variant="titleMedium"
                              style={styles.cardTitle}
                            >
                              {event.name}
                            </Text>
                          </View>

                          <Text
                            variant="bodyMedium"
                            style={styles.cardDescription}
                            numberOfLines={
                              expandedId === event.name ? undefined : 2
                            }
                            ellipsizeMode="tail"
                          >
                            {stripHtmlTags(event.description_html)}
                          </Text>

                          {event.description_html.length > 120 && (
                            <Text
                              variant="bodySmall"
                              onPress={() => toggleExpanded(event.name)}
                              style={styles.readMore}
                            >
                              {expandedId === event.name
                                ? 'Read less'
                                : 'Read more'}
                            </Text>
                          )}

                          <View style={styles.chipContainer}>
                            <Chip
                              icon="clock"
                              style={styles.chip}
                              textStyle={styles.chipText}
                            >
                              {event.duration} min
                            </Chip>
                            <Chip
                              icon="map-marker"
                              style={styles.chip}
                              textStyle={styles.chipText}
                            >
                              {event.locations?.[0]?.location || 'In-person'}
                            </Chip>
                          </View>

                          <Button
                            mode="contained"
                            icon="calendar-plus"
                            contentStyle={styles.buttonContent}
                            style={styles.scheduleButton}
                            onPress={() => {
                              setUrl(event.scheduling_url);
                              onOpen();
                            }}
                          >
                            Schedule Appointment
                          </Button>
                        </Card.Content>
                      </Card>
                    );
                  })}
                </View>
              )}
            </View>

            {/* About Section */}
            <Surface style={styles.aboutSection}>
              <Text variant="headlineSmall" style={styles.aboutTitle}>
                About SM Couture
              </Text>
              <Divider style={styles.aboutDivider} />
              <Text style={styles.aboutText}>
                Specializing in bespoke fashion designs and tailoring services,
                SM Couture creates unique pieces tailored perfectly to your
                measurements and style preferences.
              </Text>
              <View style={styles.featureRow}>
                <View style={styles.featureItem}>
                  <FontAwesome6
                    name="star"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.featureText}>Expert Tailoring</Text>
                </View>
                <View style={styles.featureItem}>
                  <FontAwesome6
                    name="hand-scissors"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.featureText}>Custom Designs</Text>
                </View>
                <View style={styles.featureItem}>
                  <FontAwesome6
                    name="gem"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.featureText}>Premium Quality</Text>
                </View>
              </View>
            </Surface>
          </ScrollView>
        </View>
      )}
    </CalendlyModal>
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
      paddingBottom: 24,
    },
    appBar: {
      backgroundImage: 'url(../../../assets/images/app-background.png)',
      backgroundColor: theme.colors.surface,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceVariant,
    },
    appBarTitle: {
      fontWeight: 'bold',
      fontSize: 22,
      fontFamily: 'serif',
    },
    heroContainer: {
      height: 280,
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
    content: {
      backgroundColor: theme.colors.background,
    },
    sectionTitle: {
      marginTop: 24,
      marginBottom: 16,
      marginLeft: 16,
      fontWeight: 'bold',
      color: theme.colors.onBackground,
    },
    loadingContainer: {
      padding: 40,
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 16,
      color: theme.colors.onSurfaceVariant,
    },
    eventsContainer: {
      paddingHorizontal: 16,
    },
    card: {
      marginBottom: 16,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      overflow: 'hidden',
      borderColor: theme.colors.surfaceVariant,
    },
    cardContent: {
      padding: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    cardIcon: {
      marginRight: 12,
    },
    cardTitle: {
      fontWeight: 'bold',
      flex: 1,
      color: theme.colors.onSurface,
    },
    cardDescription: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: 6,
      lineHeight: 20,
    },
    readMore: {
      color: theme.colors.primary,
      marginTop: -4,
      marginBottom: 12,
      fontWeight: '500',
    },
    chipContainer: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    chip: {
      marginRight: 8,
      backgroundColor: theme.colors.surfaceVariant,
    },
    chipText: {
      fontSize: 12,
    },
    buttonContent: {
      height: 44,
    },
    scheduleButton: {
      borderRadius: 8,
    },
    aboutSection: {
      margin: 16,
      padding: 20,
      borderRadius: 12,
      backgroundColor: theme.colors.surfaceVariant,
    },
    aboutTitle: {
      fontWeight: 'bold',
      color: theme.colors.onSurfaceVariant,
      fontFamily: 'serif',
    },
    aboutDivider: {
      marginVertical: 12,
      backgroundColor: theme.colors.primary,
      height: 2,
      width: 60,
    },
    aboutText: {
      color: theme.colors.onSurfaceVariant,
      lineHeight: 22,
      marginBottom: 20,
    },
    featureRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    featureItem: {
      alignItems: 'center',
      flex: 1,
    },
    featureText: {
      marginTop: 8,
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
    },
  });
