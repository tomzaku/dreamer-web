import { TypeSound } from './enum';

const FILE_NAME_MAP: Record<TypeSound, string> = {
  [TypeSound.Bird]: 'bird',
  [TypeSound.Cricket]: 'crickets-texas',
  [TypeSound.Fireplace]: 'fireplace',
  [TypeSound.InterviewInACafe]: 'interview-in-a-cafe',
  [TypeSound.RainAndThunder]: 'rain-and-thunder',
  [TypeSound.Rain]: 'heavy-rain',
};

export const loadTypeSound = async (typeSound: TypeSound) => {
  const soundFile = await import(`../assest/${FILE_NAME_MAP[typeSound]}.wav`);
  return new Audio(soundFile.default);
};

const sounds: Record<string, HTMLAudioElement> = {};

export const toggleSound = async (typeSound: TypeSound, toggleValue: boolean) => {
  if (!sounds[typeSound]) {
    const sound = await loadTypeSound(typeSound);
    sounds[typeSound] = sound;
  }
  if (toggleValue) {
    sounds[typeSound].play();
  } else {
    sounds[typeSound].pause();
  }
};

export const setSoundVolume = async (typeSound: TypeSound, volume: number) => {
  if (!sounds[typeSound]) {
    return;
  }
  sounds[typeSound].volume = volume

}
