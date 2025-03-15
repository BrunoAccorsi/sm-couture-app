import { useCalendly } from '@/app/context/CalendlyContext';
import CalendlyModal from '@/app/components/CalendlyModal';
import { Schedule } from '../types';
import { FontAwesome6 } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import {
  Button,
  Card,
  Divider,
  MD3Theme,
  Text,
  useTheme,
} from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface AppointmentCardProps {
  schedule: Schedule;
  onUpdate: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  schedule,
  onUpdate,
}) => {
  const { setUrl } = useCalendly();
  const theme = useTheme();
  const styles = createStyles(theme);

  const isActive = schedule.status === 'active';

  return (
    <CalendlyModal onClose={onUpdate}>
      {onOpen => (
        <Card style={styles.appointmentCard} mode="outlined">
          <Card.Content>
            <View style={styles.appointmentHeader}>
              <FontAwesome6
                name="calendar-check"
                size={20}
                color={theme.colors.primary}
              />
              <Text variant="titleMedium" style={styles.eventTitle}>
                {schedule.event}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.appointmentDetails}>
              <Text variant="bodyMedium" style={styles.detailLabel}>
                Date:
              </Text>
              <Text variant="bodyMedium" style={styles.dateText}>
                {moment(schedule.start_time).format(
                  'MMMM Do, YYYY [at] h:mm A'
                )}
              </Text>
            </View>
            <AppointmentStatus status={schedule.status} />
            {isActive && (
              <AppointmentActions
                rescheduleUrl={new URL(schedule.reschedule_url)}
                cancelUrl={new URL(schedule.cancel_url)}
                onOpen={onOpen}
                setUrl={setUrl}
              />
            )}
          </Card.Content>
        </Card>
      )}
    </CalendlyModal>
  );
};

// Sub-components with single responsibilities
interface AppointmentStatusProps {
  status: string;
}

const AppointmentStatus: React.FC<AppointmentStatusProps> = ({ status }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const isActive = status === 'active';

  return (
    <View style={styles.appointmentStatus}>
      <FontAwesome6
        name={isActive ? 'check-circle' : 'circle-xmark'}
        size={16}
        color={isActive ? theme.colors.primary : theme.colors.error}
      />
      <Text
        variant="bodySmall"
        style={[
          styles.statusText,
          { color: isActive ? theme.colors.primary : theme.colors.error },
        ]}
      >
        {isActive ? 'Confirmed' : 'Cancelled'}
      </Text>
    </View>
  );
};

interface AppointmentActionsProps {
  rescheduleUrl: URL;
  cancelUrl: URL;
  onOpen: () => void;
  setUrl: (url: URL) => void;
}

const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  rescheduleUrl,
  cancelUrl,
  onOpen,
  setUrl,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.appointmentActions}>
      <Button
        mode="outlined"
        icon="calendar-clock"
        contentStyle={styles.buttonContent}
        style={styles.rescheduleButton}
        onPress={() => {
          setUrl(rescheduleUrl);
          onOpen();
        }}
      >
        Reschedule
      </Button>
      <Button
        mode="contained-tonal"
        icon="calendar-remove"
        contentStyle={styles.buttonContent}
        style={styles.cancelButton}
        onPress={() => {
          setUrl(cancelUrl);
          onOpen();
        }}
      >
        Cancel
      </Button>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    appointmentCard: {
      marginBottom: 16,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      elevation: 2,
    },
    appointmentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    eventTitle: {
      marginLeft: 12,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      flex: 1,
    },
    divider: {
      marginVertical: 12,
      height: 1,
      backgroundColor: theme.colors.outlineVariant,
    },
    appointmentDetails: {
      marginBottom: 12,
    },
    detailLabel: {
      fontWeight: '500',
      color: theme.colors.onSurfaceVariant,
      marginBottom: 4,
    },
    dateText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.onSurface,
    },
    appointmentStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    statusText: {
      marginLeft: 8,
      fontWeight: '500',
    },
    appointmentActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    buttonContent: {
      height: 40,
    },
    rescheduleButton: {
      flex: 1,
      marginRight: 8,
      borderColor: theme.colors.primary,
    },
    cancelButton: {
      flex: 1,
      marginLeft: 8,
      borderColor: theme.colors.error,
    },
  });
