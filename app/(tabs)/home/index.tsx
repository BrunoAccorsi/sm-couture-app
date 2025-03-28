import CalendlyModal from '@/app/components/CalendlyModal';
import { useCalendly } from '@/app/context/CalendlyContext';
import { useCalendlyQuery } from '@/app/hooks/useCalendlyQuery';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {
  ActivityIndicator,
  Divider,
  MD3Theme,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';

import { EventsSchema, type EventType } from '@/app/types/event.types';
import EventCard from '@/app/components/EventCard';

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

  const handleScheduleAppointment = (schedulingUrl: string) => {
    setUrl(new URL(schedulingUrl));
  };

  const renderEvent = ({ item }: { item: EventType }) => (
    <EventCard
      event={item}
      isExpanded={expandedId === item.name}
      onToggleExpand={() => toggleExpanded(item.name)}
      onSchedule={url => handleScheduleAppointment(url)}
    />
  );

  const renderEventsContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>
            Loading available appointments...
          </Text>
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={events}
          renderItem={props => renderEvent(props)}
          keyExtractor={item => item.name}
          contentContainerStyle={styles.eventsContainer}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    );
  };

  const renderHeroSection = () => (
    <Surface style={styles.heroContainer} elevation={4}>
      <ImageBackground
        source={require('@/assets/images/app-background.png')}
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
  );

  const renderAboutSection = () => (
    <Surface style={styles.aboutSection}>
      <Text variant="headlineSmall" style={styles.aboutTitle}>
        Our Policies
      </Text>
      <Divider style={styles.aboutDivider} />

      <Text style={styles.policyTitle}>Return Policy</Text>
      <Text style={styles.aboutText}>
        All sales are final. We do not offer refunds or exchanges.
      </Text>

      <Text style={styles.policyTitle}>Rental Clothing Policy</Text>
      <Text style={styles.aboutText}>
        A security deposit is required for all clothing rentals and will be held
        on your credit card at the time of rental. Any damage, staining, or
        excessive wear to rented items will result in the forfeiture of the full
        deposit.
      </Text>

      <View style={styles.policyIconRow}>
        <FeatureItem icon="receipt" text="No Refunds" />
        <FeatureItem icon="credit-card" text="Deposit Required" />
        <FeatureItem icon="hand-scissors" text="Custom Designs" />
      </View>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderHeroSection()}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            Our Services
          </Text>
          {renderEventsContent()}
        </View>
        {renderAboutSection()}
      </ScrollView>
    </View>
  );
}

type FeatureItemProps = {
  icon: string;
  text: string;
};

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.featureItem}>
      <FontAwesome6 name={icon} size={24} color={theme.colors.primary} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
};

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
      backgroundImage: 'url(@/assets/images/app-background.png)',
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
    policyTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 12,
      marginBottom: 4,
      color: theme.colors.onSurfaceVariant,
    },
    policyIconRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
  });
