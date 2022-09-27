export enum NotificationStatus {
  Idle,
  BrowserDoesNotSupport,
  Granted,
  Denied,
}

export const notify = async (title: string, options: NotificationOptions) => {
  if (!('Notification' in window)) {
    return {
      status: NotificationStatus.BrowserDoesNotSupport
    }
  }

  if (Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }
  switch(Notification.permission){
    case "granted": {

      const notification: Notification = new Notification(title, {
        body: title,
        /* data: "DATTTAA", */
        /* icon, */
        /* vibrate, */
        /* silent */
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
