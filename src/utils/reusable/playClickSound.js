import { Audio } from "expo-av";

const playClickSound = async (soundPath) => {
  try {
    const { sound } = await Audio.Sound.createAsync(soundPath);
    await sound.playAsync();
  } catch (error) {
    console.log("Error playing click sound:", error);
  }
};

export default playClickSound;
