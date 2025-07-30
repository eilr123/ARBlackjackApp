import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Alert, AppState, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const CARDS = {
  KING_OF_HEARTS: 'King of Hearts',
  ACE_OF_SPADES: 'Ace of Spades',
};

interface UIOverlayProps {
  detectedCards: string[];
  onResetPress: () => void;
}

const UIOverlay = ({ detectedCards, onResetPress }: UIOverlayProps) => (
  <View style={styles.overlay}>
    <Text style={styles.instructions}>Point the camera at the Blackjack table</Text>

    <View>
      <Text style={styles.advice}>
        Detected: {detectedCards.length > 0 ? detectedCards.join(', ') : 'None'}
      </Text>
      <Text style={styles.advice}>
        {/* Advice will be displayed here, updated by the AI */}
      </Text>
    </View>

    <TouchableOpacity
      onPress={onResetPress}
      style={styles.resetButton}
    >
      <Text style={styles.resetButtonText}>Reset Deck</Text>
    </TouchableOpacity>
  </View>
);

const ARBlackjackApp = () => {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const [permissionStatus, setPermissionStatus] = useState<'loading' | 'granted' | 'denied'>('loading');
  const [detectedCards, setDetectedCards] = useState<string[]>([]);

  const isCameraActive = device != null && permissionStatus === 'granted';

  useEffect(() => {
    const checkPermission = async () => {
      const status = await Camera.requestCameraPermission();
      if (status === 'granted') {
        setPermissionStatus('granted');
      } else {
        setPermissionStatus('denied');
        if (status === 'denied') {
          Alert.alert(
            'Camera Permission Required',
            'Please allow camera access in your device settings to use this app.',
            [{ text: 'OK' }],
            { cancelable: false }
          );
        }
      }
    };

    checkPermission();
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const captureAndProcessFrame = async () => {
    if (camera.current && isCameraActive) {
      try {
        const frame = await camera.current.takePhoto();

        // console.log("captured frame", frame); //UNCOMMENT THIS LINE TO SEE THE FRAME DATA
        // Here's where you'd process the frame to recognize cards.
        // This is placeholder logic.  You'll need to implement the actual
        // card recognition using OpenCV and/or TensorFlow Lite.

        // Placeholder Card Recognition Logic (Replace with your actual logic)
        const newDetectedCards: string[] = [];
        // Example:  Detect a King of Hearts and an Ace of Spades
        const placeholderCards = [CARDS.KING_OF_HEARTS, CARDS.ACE_OF_SPADES];

        // Simulate card detection (replace with your actual card recognition)
        if (Math.random() < 0.8) {
          //Simulate 80% chance of detecting a card
          for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
            //Push 0, 1, or 2 cards
            newDetectedCards.push(placeholderCards[i]);
          }
        }
        setDetectedCards(newDetectedCards); // Update the state with the new cards
      } catch (error) {
        console.error('Failed to capture frame:', error);
      }
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const runCaptureLoop = async () => {
      if (isCancelled) {
        return;
      }
      await captureAndProcessFrame();
      // Schedule the next capture only after the current one is done
      setTimeout(runCaptureLoop, 1000);
    };

    if (isCameraActive) {
      runCaptureLoop();
    }
    return () => {
      isCancelled = true;
    };
  }, [isCameraActive]);

  const handleResetPress = () => {
    // Handle deck reset logic (inform AI)
    console.log('Deck Reset');
    Alert.alert('Deck Reset', 'The deck has been reset.', [{ text: 'OK' }]);
  };

  if (permissionStatus === 'loading') {
    return <View style={styles.container}><Text style={styles.permissionText}>Requesting camera permission...</Text></View>;
  }

  if (permissionStatus === 'denied') {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Camera permission is required to use this app.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {device && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isCameraActive}
          onInitialized={() => {
            console.log('Camera Initialized');
          }}
          onError={(error) => console.error('Camera Error', error)}
        />
      )}
      <UIOverlay detectedCards={detectedCards} onResetPress={handleResetPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  overlay: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    bottom: 40,
    justifyContent: 'space-between', // Changed to space-between
    alignItems: 'center',
    padding: 20,
  },
  instructions: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 5,
  },
  advice: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ARBlackjackApp;
