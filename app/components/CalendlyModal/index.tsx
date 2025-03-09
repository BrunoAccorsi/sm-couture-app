import { useCalendly } from '@/app/context/CalendlyContext';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import {
  IconButton,
  MD3Theme,
  Modal,
  Portal,
  useTheme,
} from 'react-native-paper';
import CalendlyWidget from '../CalendlyWebView';

type Props = {
  children: (onOpen: () => void) => React.ReactNode;
  onClose?: () => void;
};

const CalendlyModal = ({ children, onClose }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const { url } = useCalendly();
  const theme = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      animation.setValue(0);
    }
  }, [visible]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onDismiss = () => {
    hideModal();
    if (onClose) {
      onClose();
    }
  };

  // Animation transformations
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <>
      {children(showModal)}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          contentContainerStyle={styles.modalContainer}
        >
          <Animated.View
            style={[
              styles.animatedContent,
              {
                opacity: opacity,
                transform: [{ translateY: translateY }],
              },
            ]}
          >
            <View style={styles.closeButtonContainer}>
              <IconButton
                icon="close"
                size={24}
                onPress={hideModal}
                iconColor="white"
                style={styles.closeButton}
              />
            </View>
            <View style={styles.widgetContainer}>
              <CalendlyWidget customUrl={url} />
            </View>
          </Animated.View>
        </Modal>
      </Portal>
    </>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    modalContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: windowWidth,
      height: windowHeight,
      margin: 0,
      padding: 0,
      borderRadius: 32,
      overflow: 'hidden',
    },
    animatedContent: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 32,
      overflow: 'hidden',
      paddingBottom: 128,
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 10,
    },
    closeButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    widgetContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default CalendlyModal;
