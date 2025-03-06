import React, { useRef, useEffect } from 'react';
import { Modal, IconButton, useTheme } from 'react-native-paper';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import CalendlyWidget from '../CalendlyWebView';

type Props = {
  eventUrl: string | null;
  children: (onOpen: () => void) => React.ReactNode;
};

const CalendlyModal = ({ children, eventUrl }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();
  const animation = useRef(new Animated.Value(0)).current;

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

  if (!eventUrl) return <>{children(() => {})}</>;

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
      <Modal
        visible={visible}
        onDismiss={hideModal}
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
            <CalendlyWidget url={eventUrl} />
          </View>
        </Animated.View>
      </Modal>
    </>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
  },
});

export default CalendlyModal;
