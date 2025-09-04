import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
  requestPermission,
  AuthorizationStatus,
  type FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  EventType,
  EventDetail,
} from '@notifee/react-native';

const Notification = () => {
  const [fcmToken, setFcmToken] = useState<string>('');

  useEffect(() => {
    const initFCM = async () => {
      try {
        const app = getApp();
        const messagingInstance = getMessaging(app);

        const authStatus = await requestPermission(messagingInstance);
        const enabled =
          authStatus === AuthorizationStatus.AUTHORIZED ||
          authStatus === AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          Alert.alert('Permission denied', 'Cannot get FCM token');
          return;
        }

        // Get FCM token
        const token = await getToken(messagingInstance);
        console.log('FCM Token:', token);
        setFcmToken(token);
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    };

    initFCM();

    if (Platform.OS === 'android') {
      notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }

    const unsubscribe = onMessage(
      getMessaging(getApp()),
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('Foreground FCM:', remoteMessage);

        const title = String(
          remoteMessage.notification?.title ??
            remoteMessage.data?.title ??
            'New Message',
        );
        const body = String(
          remoteMessage.notification?.body ??
            remoteMessage.data?.body ??
            'You got a message!',
        );

        //await notifee.cancelAllNotifications();

        await notifee.displayNotification({
          id: `${Date.now()}-${Math.random()}`,
          title,
          body,
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
            pressAction: { id: 'default' },
            actions: [
              { title: 'Mark as Read', pressAction: { id: 'mark-as-read' } },
            ],
          },
        });
      },
    );

    const unsubscribeNotifee = notifee.onForegroundEvent(
      ({ type, detail }: { type: EventType; detail: EventDetail }) => {
        if (
          type === EventType.ACTION_PRESS &&
          detail.pressAction?.id === 'mark-as-read'
        ) {
          const id = detail.notification?.id;
          if (id) notifee.cancelNotification(id);
        }
      },
    );

    return () => {
      unsubscribe();
      unsubscribeNotifee();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.Buttons}
        onPress={() =>
          notifee.displayNotification({
            title: 'Local Notification',
            body: 'Hello, I’m Haroon!',
            android: {
              channelId: 'default',
              importance: AndroidImportance.HIGH,
              pressAction: { id: 'default' },
              actions: [
                { title: 'Mark as Read', pressAction: { id: 'mark-as-read' } },
              ],
            },
          })
        }
      >
        <Text>Send Local Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Buttons}
        onPress={() => Alert.alert('FCM Token', fcmToken || 'Not available')}
      >
        <Text>Check FCM Token</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  Buttons: {
    marginVertical: 10,
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 6,
  },
});

export default Notification;
