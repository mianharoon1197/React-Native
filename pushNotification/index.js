import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// Configure PushNotification
PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});

// Background handler (runs when app is killed/in background)
setBackgroundMessageHandler(
  getMessaging(),
  async remoteMessage => {
    console.log('🌙 Background FCM:', remoteMessage);

    const title =
      typeof remoteMessage?.notification?.title === 'string'
        ? remoteMessage.notification.title
        : typeof remoteMessage?.data?.title === 'string'
        ? remoteMessage.data.title
        : 'New Message';

    const body =
      typeof remoteMessage?.notification?.body === 'string'
        ? remoteMessage.notification.body
        : typeof remoteMessage?.data?.body === 'string'
        ? remoteMessage.data.body
        : 'You got a message!';

    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title,
      message: body,
    });
  },
);

AppRegistry.registerComponent(appName, () => App);
