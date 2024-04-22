import React, { useRef, useEffect } from 'react';
import { View, Image, Text, StyleSheet,Animated, Easing } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const LandingPage = () => {
    const navigation = useNavigation();
    const bounceAnim = useRef(new Animated.Value(1)).current;
  
    const handlePlayButtonPress = () => {
      navigation.navigate('GameBoard');
    };

    useEffect(() => {
      const playBackgroundSound = async () => {
        try {
          const { sound } = await Audio.Sound.createAsync(
            require('../../../assets/sounds/soundtracks/mixkit-playful-10.mp3'),
            { shouldPlay: true, isLooping: true, volume: 0.5 }
          );
          await sound.playAsync();
        } catch (error) {
          console.error('Error playing background sound:', error);
        }
      };
  
      playBackgroundSound();
  
      return () => {
    
        if (Audio) {
          Audio.Sound.stopAsync();
          Audio.Sound.unloadAsync();
        }
      };
    }, []);
  
  
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }, [bounceAnim]);
  
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/landscape.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <Animated.Image
            source={require('../../../assets/images/matching-4-20-2024.png')}
            style={[styles.logo, { transform: [{ scale: bounceAnim }] }]}
            resizeMode="contain"
          />
          <Animated.Image
            source={require('../../../assets/images/sounds-4-20-2024.png')}
            style={[styles.logo, { transform: [{ scale: bounceAnim }] }]}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.playButton} onPress={handlePlayButtonPress}>
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    contentContainer: {
      marginTop: 180,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 200,
      height: 100,
      marginBottom: -30,
    },
    playButton: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      width: 200,
      justifyContent: 'center',
      marginTop: 100,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    playButtonText: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
  export default LandingPage;