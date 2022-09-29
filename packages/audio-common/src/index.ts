export const createGoogleDriveAudio = <T extends string>(
  googleDriverIdMap: Record<T, string>
) => {
  const sounds: Record<string, HTMLAudioElement> = {};
  const loadTypeSound = async (typeSound: T) => {
    return new Audio(
      `https://docs.google.com/uc?export=download&id=${googleDriverIdMap[typeSound]}`
    );
  };
  const toggleSound = async (typeSound: T, toggleValue: boolean, options?: {loop?: boolean}) => {
    if (!sounds[typeSound]) {
      const sound = await loadTypeSound(typeSound);
      sounds[typeSound] = sound;
    }
    if (toggleValue) {
      if(options?.loop) {
        sounds[typeSound].loop = true;
      }
      sounds[typeSound].play();
    } else {
      sounds[typeSound].pause();
    }
  };
  const setSoundVolume = async (typeSound: T, volume: number) => {
    if (!sounds[typeSound]) {
      return;
    }
    sounds[typeSound].volume = volume;
  };
  return {
    toggleSound,
    setSoundVolume,
    sounds,
  };
};
