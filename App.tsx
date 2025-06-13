import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const ARBlackjackApp = () => {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const [cameraPermission, setCameraPermission] = useState<'authorized' | 'not-authorized' | 'denied'>('not-authorized');
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const device = devices.back; // Or use devices.front if you want the front camera

  useEffect(() => {
    (async () => {
      const newCameraPermission = await Camera.requestCameraPermission();
      setCameraPermission(newCameraPermission);
      if (newCameraPermission === 'authorized') {
        setIsCameraInitialized(true);
      } else {
        Alert.alert(
          'Camera Permission Required',
          'Please allow camera access to use this app.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    })();
  }, []);

  const handleCardDetected = (cards: string[]) => {
    // In a real application, you would send this data to your AI logic (Gemini API)
    console.log('Detected Cards:', cards);
    // For now, we'll just display the card information in an alert
    if (cards.length > 0) {
      Alert.alert(
        'Card Detected',
        `Detected the following cards: ${cards.join(', ')}`,
        [{ text: 'OK' }],
        { cancelable: true }
      );
    }
  };

  const captureAndProcessFrame = async () => {
    if (camera.current && cameraPermission === 'authorized') {
      try {
        const frame = await camera.current.capture({
          quality: 'medium', // Adjust as needed
        });

        // console.log("captured frame", frame); //UNCOMMENT THIS LINE TO SEE THE FRAME DATA
        // Here's where you'd process the frame to recognize cards.
        // This is placeholder logic.  You'll need to implement the actual
        // card recognition using OpenCV and/or TensorFlow Lite.

        // Placeholder Card Recognition Logic (Replace with your actual logic)
        const detectedCards: string[] = [];
        // Example:  Detect a King of Hearts and an Ace of Spades
        const placeholderCards = ['King of Hearts', 'Ace of Spades'];

        // Simulate card detection (replace with your actual card recognition)
        if (Math.random() < 0.8) {
          //Simulate 80% chance of detecting a card
          for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
            //Push 0, 1, or 2 cards
            detectedCards.push(placeholderCards[i]);
          }
        }
        handleCardDetected(detectedCards); // Pass detected cards to handler
      } catch (error) {
        console.error('Failed to capture frame:', error);
      }
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isCameraInitialized) {
      //Set an interval to capture frames.  Adjust the interval as necessary for performance
      intervalId = setInterval(captureAndProcessFrame, 1000); // Capture frame every 1 second (1000ms)
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isCameraInitialized, cameraPermission]);

  if (cameraPermission !== 'authorized') {
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
          isActive={isCameraInitialized}
          frameProcessorFps={5} // Add this line, and adjust as needed.
          //frameProcessor={processFrame} // You'll  set up a frame processor callback, but not directly like this with a plain function.
          //You'll need to create a native module and bridge it.
          onInitialized={() => {
            console.log('Camera Initialized');
          }}
          onError={(error) => console.error('Camera Error', error)}
        />
      )}
      <View style={styles.overlay}>
        <Text style={styles.instructions}>Point the camera at the Blackjack table</Text>
        <Text style={styles.advice}>
          {/* Advice will be displayed here, updated by the AI */}
        </Text>
        <Button
          title="Reset Deck"
          onPress={() => {
            // Handle deck reset logic (inform AI)
            console.log('Deck Reset');
            Alert.alert('Deck Reset', 'The deck has been reset.', [{ text: 'OK' }]);
          }}
          style={styles.resetButton}
        />
      </View>
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
    bottom: 20,
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
    marginBottom: 70, //Added marginBottom to move it up
  },
  resetButton: {
    marginTop: 'auto', // Push button to the bottom,
    backgroundColor: '#4CAF50', // Green
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
