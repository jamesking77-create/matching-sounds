import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";
import {
  CAT,
  CAT_SOUND,
  CHICKEN,
  CHICKEN_SOUND,
  COW,
  COW_SOUND,
  DOG,
  DOG_SOUND,
  EAGLE,
  EAGLE_SOUND,
  GOAT,
  GOAT_SOUND,
  HORSE,
  HORSE_SOUND,
  LION,
  LION_SOUND,
  PIG,
  PIG_SOUND,
} from "../../utils/constants/const";
import { useNavigation } from "@react-navigation/native";
import { CorrectAlert, WrongAlert } from "../../utils/reusable/alerts";
import Slider from "@react-native-community/slider";
import GameOverModal from "../../utils/reusable/gameOverModal";
import playClickSound from "../../utils/reusable/playClickSound";
import styles from "../styles/gameBoardStyles";
const GamePage = () => {
  const navigation = useNavigation();
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [animalPairs, setAnimalPairs] = useState([]);
  const [correctAnimalIndex, setCorrectAnimalIndex] = useState(0);
  const [sound, setSound] = useState();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [correctAlertVisible, setCorrectAlertVisible] = useState(false);
  const [wrongAlertVisible, setWrongAlertVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [backgroundVolume, setBackgroundVolume] = useState(0.3);
  const [backgroundSound, setBackgroundSound] = useState();
  const [gameOver, setGameOver] = useState(false);

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

  useEffect(() => {
    return () => {
     
      if (backgroundSound) {
        backgroundSound.stopAsync();
        backgroundSound.unloadAsync();
      }
    };
  }, [backgroundSound]);

  const setVolume = (value) => {
    setBackgroundVolume(value);
    if (backgroundSound) {
      backgroundSound.setVolumeAsync(value);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const toggleSettingsModal = () => {
    setSettingsVisible(!settingsVisible);
  };

  const toggleInfoModal = () => {
    setInfoVisible(!infoVisible);
  };

  useEffect(() => {
    loadAnimalPairs();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const loadAnimalPairs = () => {
    const pairs = [
      { image: CAT, sound: CAT_SOUND, name: 'CAT' },
      { image: DOG, sound: DOG_SOUND, name: 'DOG' },
      { image: GOAT, sound: GOAT_SOUND, name: 'GOAT' },
      { image: CHICKEN, sound: CHICKEN_SOUND, name: 'HEN' },
      { image: EAGLE, sound: EAGLE_SOUND, name: 'EAGLE' },
      { image: HORSE, sound: HORSE_SOUND, name: 'HORSE' },
      { image: COW, sound: COW_SOUND, name: 'COW' },
      { image: PIG, sound: PIG_SOUND, name: 'PIG' },
      { image: LION, sound: LION_SOUND, name: 'LION' },
    ];

    const shuffledPairs = shuffleArray(pairs);

    const selectedPairs = shuffledPairs.slice(0, 3);

    setAnimalPairs(selectedPairs);
  };

  const startNewRound = () => {
    loadAnimalPairs();
    const randomIndex = Math.floor(Math.random() * animalPairs.length);
    setCorrectAnimalIndex(randomIndex);
    setRound(round + 1);
    if (round === 5) {
      if (backgroundSound) {
        backgroundSound.stopAsync();
        backgroundSound.unloadAsync();
      }
      playClickSound(require('../../../assets/sounds/soundtracks/mixkit-game-experience-level-increased-2062.wav'))
      setGameOver(true);
    }
  };

  const handleMegaPhonePress = () => {
    if (animalPairs.length === 0) {
      return;
    }
    const randomSound = animalPairs[correctAnimalIndex].sound;
    playSound(randomSound);
  };

  const handleAnimalBoxClick = (index) => {
    playClickSound(require('../../../assets/sounds/soundtracks/mixkit-game-ball-tap-2073.wav'))
    if (index === correctAnimalIndex) {
      setScore(score + 5);
      playClickSound(require('../../../assets/sounds/soundtracks/mixkit-girls-audience-applause-510-[AudioTrimmer.com].wav'))
      setCorrectAlertVisible(true);
    } else {
      if (score > 0) {
        setScore(score - 2);
      }
      playClickSound(require('../../../assets/sounds/soundtracks/mixkit-wrong-answer-fail-notification-946.wav'))
      setWrongAlertVisible(true);
    }
  };

  const playSound = async (soundPath) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundPath);
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  const handleReplay = () => {
    setScore(0);
    setRound(1);
    loadAnimalPairs();
    setGameOver(false);
  };

  const handleQuit = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/vecteezy_farm-scene-with-windmill-and-barn_6269239.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.megaPhoneBox}
          onPress={handleMegaPhonePress}
        >
          <Image
            source={require("../../../assets/images/vecteezy_3d-isolated-electronic-and-gadget_11222261.png")}
            style={styles.megaPhoneIcon}
          />
        </TouchableOpacity>
        <View style={styles.animalBoxesContainer}>
          {animalPairs.map((pair, index) => (
            <TouchableOpacity
              key={index}
              style={styles.animalBox}
              onPress={() => handleAnimalBoxClick(index)}
            >
              <Image source={pair.image} style={styles.animalImage} />
              <Text style={styles.animalName}>{pair.name}</Text>
            </TouchableOpacity>
           
          ))}
        </View>
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
          <TouchableOpacity style={styles.navIcon} onPress={togglePause}>
            {isPaused ? (
              <Image
                source={require("../../../assets/images/pause_5251071.png")}
                style={styles.navImage}
              />
            ) : (
              <Image
                source={require("../../../assets/images/pause_5251071.png")}
                style={styles.navImage}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIcon} onPress={toggleInfoModal}>
            <Image
              source={require("../../../assets/images/information.png")}
              style={styles.navImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
      </View>

      <View>
        <CorrectAlert
          visible={correctAlertVisible}
          onDismiss={() => {
            setCorrectAlertVisible(false);
            startNewRound();
          }}
        />
        <WrongAlert
          visible={wrongAlertVisible}
          onDismiss={() => {
            setWrongAlertVisible(false);
            startNewRound();
          }}
        />
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

      <Modal visible={isPaused} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Game Paused</Text>
            <Text style={styles.modalTitle}>Current Score: {score}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={togglePause}>
              <Text style={styles.closeButtonText}>Resume</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <GameOverModal
        visible={gameOver} 
        score={score} 
        handleReplay={handleReplay} 
        handleQuit={handleQuit} 
      />
    </ImageBackground>
  );
};



export default GamePage;
