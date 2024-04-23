import React, { useRef, useEffect, useState } from "react";
import { View, Image, Text, Animated, Easing, Modal, ScrollView, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import playClickSound from "../../utils/reusable/playClickSound";
import styles from "../styles/landingPageStyles";

const LandingPage = () => {
  const navigation = useNavigation();
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const [backgroundVolume, setBackgroundVolume] = useState(1);
  const [backgroundSound, setBackgroundSound] = useState();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const playBackgroundSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../../../assets/sounds/soundtracks/mixkit-playful-10.mp3"),
          { volume: backgroundVolume }
        );
        await sound.setIsLoopingAsync(true);
        await sound.playAsync();
        if (isMounted) {
          setBackgroundSound(sound);
        }
      } catch (error) {
        console.log("Error playing background sound:", error);
      }
    };

    playBackgroundSound();

    return () => {
      isMounted = false;
      if (backgroundSound) {
        backgroundSound.unloadAsync();
      }
    };
  }, []);

  const setVolume = (value) => {
    setBackgroundVolume(value);
    if (backgroundSound) {
      backgroundSound.setVolumeAsync(value);
    }
  };

  const toggleSettingsModal = () => {
    setSettingsVisible(!settingsVisible);
  };

  const toggleInfoModal = () => {
    setInfoVisible(!infoVisible);
  };

  const handlePlayButtonPress = () => {
    playClickSound(require('../../../assets/sounds/soundtracks/mixkit-game-ball-tap-2073.wav'))
    if (backgroundSound) {
      backgroundSound.stopAsync();
      backgroundSound.unloadAsync();
    }
    navigation.navigate("GameBoard");
  };

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
      ])
    ).start();
  }, [bounceAnim]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/landscape.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Animated.Image
          source={require("../../../assets/images/matching-4-20-2024.png")}
          style={[styles.logo, { transform: [{ scale: bounceAnim }] }]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require("../../../assets/images/sounds-4-20-2024.png")}
          style={[styles.logo, { transform: [{ scale: bounceAnim }] }]}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.playButton}
          onPress={handlePlayButtonPress}
        >
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={styles.navIcon}
            onPress={toggleSettingsModal}
          >
            <Image
              source={require("../../../assets/images/settings.png")}
              style={styles.navImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navIcon}
            onPress={toggleInfoModal}
          >
            <Image
              source={require("../../../assets/images/information.png")}
              style={styles.navImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={settingsVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            <Text style={styles.modalText}>Music Volume:</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.0}
              maximumValue={1.0}
              value={backgroundVolume}
              onValueChange={setVolume}
              minimumTrackTintColor="#007bff"
              maximumTrackTintColor="#000000"
              step={0.03}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleSettingsModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={infoVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Instructions</Text>
              <Text style={styles.modalText}>
                To play the game, simply click on the megaphone icon on every
                round to match the correct animal card to gain points.
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleInfoModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LandingPage;
