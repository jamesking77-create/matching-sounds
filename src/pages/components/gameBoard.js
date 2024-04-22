import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { CAT, CAT_SOUND, CHICKEN, CHICKEN_SOUND, COW, COW_SOUND, DOG, DOG_SOUND, EAGLE, EAGLE_SOUND, GOAT, GOAT_SOUND, HORSE, HORSE_SOUND, LION, LION_SOUND, PIG, PIG_SOUND } from '../../utils/constants/const';

const GamePage = () => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [animalPairs, setAnimalPairs] = useState([]);
  const [correctAnimalIndex, setCorrectAnimalIndex] = useState(-1);
  const [sound, setSound] = useState();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);


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
      { image: CAT, sound: CAT_SOUND },
      { image: DOG, sound: DOG_SOUND },
      { image: GOAT, sound: GOAT_SOUND },
      { image: CHICKEN, sound: CHICKEN_SOUND },
      { image: EAGLE, sound: EAGLE_SOUND },
      { image: HORSE, sound: HORSE_SOUND },
      { image: COW, sound: COW_SOUND },
      { image: PIG, sound: PIG_SOUND },
      { image: LION, sound: LION_SOUND },
    ];

    const shuffledPairs = shuffleArray(pairs);

    const selectedPairs = shuffledPairs.slice(0, 3);

    setAnimalPairs(selectedPairs);
  };

  const startNewRound = () => {
    loadAnimalPairs()
    const randomIndex = Math.floor(Math.random() * animalPairs.length);
    setCorrectAnimalIndex(randomIndex);
  };

  const handleMegaPhonePress = () => {
    if (animalPairs.length === 0) {
      return;
    }
    const randomSound = animalPairs[correctAnimalIndex].sound;
    playSound(randomSound);
  };

  const handleAnimalBoxClick = (index) => {
    if (index === correctAnimalIndex) {
      setScore(score + 5);
      Alert.alert('Correct!', 'You matched the correct animal!', [
        { text: 'OK', onPress: () => startNewRound() }
      ]);
    } else {
      if (score > 0) {
        setScore(score - 2);
      }
      Alert.alert('Incorrect!', 'Sorry, that\'s not the correct animal.', [
        { text: 'OK', onPress: () => startNewRound() }
      ]);
    }
  };

  const playSound = async (soundPath) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundPath);
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  return (
    <ImageBackground source={require('../../../assets/images/vecteezy_farm-scene-with-windmill-and-barn_6269239.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.megaPhoneBox} onPress={handleMegaPhonePress}>
          <Image source={require('../../../assets/images/vecteezy_3d-isolated-electronic-and-gadget_11222261.png')} style={styles.megaPhoneIcon} />
        </TouchableOpacity>
        <View style={styles.animalBoxesContainer}>
          {animalPairs.map((pair, index) => (
            <TouchableOpacity key={index} style={styles.animalBox} onPress={() => handleAnimalBoxClick(index)}>
              <Image source={pair.image} style={styles.animalImage} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navIcon} onPress={toggleSettingsModal}>
            <Image source={require('../../../assets/images/settings.png')} style={styles.navImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIcon} onPress={toggleInfoModal}>
            <Image source={require('../../../assets/images/information.png')} style={styles.navImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
      </View>

      <Modal visible={settingsVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            {/* Add settings options here */}
            <TouchableOpacity style={styles.closeButton} onPress={toggleSettingsModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={infoVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Info</Text>
              {/* Add game instructions here */}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={toggleInfoModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  megaPhoneBox: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  megaPhoneIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  animalBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  animalBox: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  animalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  navContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  navIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  navImage: {
    width: '100%',
    height: '100%',
  },
  scoreBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    padding: 100
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default GamePage;
