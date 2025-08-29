import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  AuthorizationStatus,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const Notification = () => {
  const [fcmToken, setFcmToken] = useState<string>('');
  const messagingInstance = getMessaging();

  useEffect(() => {
    const initFCM = async () => {
      try {
        const authStatus = await requestPermission(messagingInstance);
        const enabled =
          authStatus === AuthorizationStatus.AUTHORIZED ||
          authStatus === AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          const token = await getToken(messagingInstance);
          console.log('✅ FCM Token: ', token);
          setFcmToken(token);
        } else {
          Alert.alert('Permission denied', 'Cannot get FCM token');
        }
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    };

    initFCM();

    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        { channelId: 'default-channel-id', channelName: 'Default Channel' },
        created => console.log('Notification channel created:', created),
      );
    }

    // Foreground messages
    const unsubscribe = onMessage(
      messagingInstance,
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('📩 Foreground FCM:', remoteMessage);

        const title: string =
          typeof remoteMessage.notification?.title === 'string'
            ? remoteMessage.notification.title
            : typeof remoteMessage.data?.title === 'string'
            ? remoteMessage.data.title
            : 'New Message';

        const body: string =
          typeof remoteMessage.notification?.body === 'string'
            ? remoteMessage.notification.body
            : typeof remoteMessage.data?.body === 'string'
            ? remoteMessage.data.body
            : 'You got a message!';

        showLocalNotification(title, body);
      },
    );

    return unsubscribe;
  }, []);

  const showLocalNotification = (title: string, message: string) => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title,
      message,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.Buttons}
        onPress={() =>
          showLocalNotification('Local Notification', 'Hello Im Haroon!')
        }
      >
        <Text>Local Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Buttons}
        onPress={() => {
          Alert.alert('Check console log for FCM Token', fcmToken);
        }}
      >
        <Text>Check FCM Token from Console</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  Buttons: { marginVertical: 10, backgroundColor: '#FAFA', padding: 10, borderRadius: 5 },
});

export default Notification;
