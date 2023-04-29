import { createGoogleDriveAudio } from '@dreamer/audio-common';

import { NotificationSoundType } from "./enum";

export enum NotificationStatus {
  Idle,
  BrowserDoesNotSupport,
  Granted,
  Denied,
}

const GOOGLE_DRIVER_NOTIFICATION_ID_MAP: Record<NotificationSoundType, string> = {
  [NotificationSoundType.MusicBox]: '1jhdTJIRKmZyHlRWgAtJCU6QcUmKdIsPM',
  [NotificationSoundType.Chime]: '1_j8XmbMMCGXJPq-Vbk_-bdOeGjmJr7n1',
}

const { sounds, toggleSound, setSoundVolume, loadSounds } =
  createGoogleDriveAudio(GOOGLE_DRIVER_NOTIFICATION_ID_MAP);


export const requireNotifyPermission = async () => {
  if (Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }
}

export const notify = async (title: string, options?: NotificationOptions) => {
  await toggleSound(NotificationSoundType.MusicBox, true)
  if (!('Notification' in window)) {
    return {
      status: NotificationStatus.BrowserDoesNotSupport
    }
  }
  console.log("Notification", Notification.permission)

  if (Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }

  switch(Notification.permission){
    case "granted": {

      const notification: Notification = new Notification(title, {
        body: title,
        silent: true,
        ...options
      });
      
      return {
        notification,
        status:NotificationStatus.Granted
      }
    }
    case "denied": {
      return {
        status: NotificationStatus.Denied
      }
    }
    case "default": {
      return {
        status: NotificationStatus.Idle
      }
    }
  }
};

export { toggleSound, setSoundVolume, sounds, loadSounds };
