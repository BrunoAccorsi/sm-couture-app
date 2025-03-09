import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Card,
  Chip,
  MD3Theme,
  Text,
  useTheme,
} from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { EventType } from '@/app/types/event.types';
import { stripHtmlTags } from '@/app/utils/utils';
import CalendlyModal from './CalendlyModal';

type EventCardProps = {
  event: EventType;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSchedule: (url: string) => void;
};

const EventCard: React.FC<EventCardProps> = ({
  event,
  isExpanded,
  onToggleExpand,
  onSchedule,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  // Function to get appropriate icon for event type
  const getEventIcon = (name: string) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('consultation')) return 'comments';
    if (nameLower.includes('fitting')) return 'ruler';
    if (nameLower.includes('design')) return 'pencil-ruler';
    return 'calendar-check'; // default icon
  };

  const description = stripHtmlTags(event.description_html);
  const shouldShowReadMore = event.description_html.length > 120;

  return (
    <Card style={styles.card} mode="outlined" onPress={onToggleExpand}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <FontAwesome6
            name={getEventIcon(event.name)}
            size={24}
            color={theme.colors.primary}
            style={styles.cardIcon}
          />
          <Text variant="titleMedium" style={styles.cardTitle}>
            {event.name}
          </Text>
        </View>

        <Text
          variant="bodyMedium"
          style={styles.cardDescription}
          numberOfLines={isExpanded ? undefined : 2}
          ellipsizeMode="tail"
        >
          {description}
        </Text>

        {shouldShowReadMore && (
          <Text
            variant="bodySmall"
            onPress={onToggleExpand}
            style={styles.readMore}
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </Text>
        )}

        <View style={styles.chipContainer}>
          <Chip icon="clock" style={styles.chip} textStyle={styles.chipText}>
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
        <CalendlyModal>
          {(onOpen) => (
            <Button
              mode="contained"
              icon="calendar-plus"
              contentStyle={styles.buttonContent}
              style={styles.scheduleButton}
              onPress={() => {
                onSchedule(event.scheduling_url);
                onOpen();
              }}
            >
              Schedule Appointment
            </Button>
          )}
        </CalendlyModal>
      </Card.Content>
    </Card>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
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
  });

export default EventCard;
