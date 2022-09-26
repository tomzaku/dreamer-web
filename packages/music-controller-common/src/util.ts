import { TypeSound } from './enum';

/* const FILE_NAME_MAP: Record<TypeSound, string> = { */
/*   [TypeSound.Bird]: 'bird', */
/*   [TypeSound.Cricket]: 'crickets-texas', */
/*   [TypeSound.Fireplace]: 'fireplace', */
/*   [TypeSound.InterviewInACafe]: 'interview-in-a-cafe', */
/*   [TypeSound.RainAndThunder]: 'rain-and-thunder', */
/*   [TypeSound.Rain]: 'heavy-rain', */
/*   [TypeSound.Wave]: 'heavy-rain', */
/*   [TypeSound.BusyCoffee]: 'heavy-rain', */
/* }; */

const GOOGLE_DRIVER_ID_MAP: Record<TypeSound, string> = {
  [TypeSound.Bird]: '1WCVYMtEapn1c7W1agf-S1C7lEo-kZvWE',
  [TypeSound.Cricket]: '14A-qdMtH4TwxXBqk1WE5nC-Rt6vRXJLn',
  [TypeSound.Fireplace]: '1TOcnszHp8-7E5br6oQyHN5Is5DPjo_wW',
  [TypeSound.InterviewInACafe]: '16oQn9qVq_TB3QFwZT0pdZ8fFLrY-L4A8',
  [TypeSound.RainAndThunder]: '175tfLbBLjk2lkJdv7KkQWEgdZsgkd-QD',
  [TypeSound.Rain]: '1-jp1y5SfwgQE5BCtgj-WqmdxFPcAfNxg',
  [TypeSound.Wave]: '1_QZD5G0MumjTk_zRWdmYS4NQKvB0b1SG',
  [TypeSound.BusyCoffee]: '1-G6peXugBh0gkjckiSo2EQJGdtqeBTjl',
  [TypeSound.StreamRiver]: '10pHPZp-P-hTYBnHDYk8rPss3gom0rVRt'
}

export const loadTypeSound = async (typeSound: TypeSound) => {
  /* const soundFile = await import(`../assest/${FILE_NAME_MAP[typeSound]}.wav`); */
  return new Audio(`https://docs.google.com/uc?export=download&id=${GOOGLE_DRIVER_ID_MAP[typeSound]}`);
};

const sounds: Record<string, HTMLAudioElement> = {};

export const toggleSound = async (typeSound: TypeSound, toggleValue: boolean) => {
  if (!sounds[typeSound]) {
    const sound = await loadTypeSound(typeSound);
    sounds[typeSound] = sound;
  }
  if (toggleValue) {
    sounds[typeSound].loop = true
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
