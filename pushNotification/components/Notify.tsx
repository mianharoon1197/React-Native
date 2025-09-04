import React, { useEffect, useState, useRef } from 'react';
import { View, Button, StyleSheet, Alert, Platform, PermissionsAndroid } from 'react-native';
import { getMessaging, getToken, onMessage, requestPermission, AuthorizationStatus } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const latestPopupId = useRef<string | null>(null);

  useEffect(() => {
    const initFCM = async () => {
      try {
        const messagingInstance = getMessaging();

        // Android 13+ runtime permission
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission Denied', 'Notifications will not work without permission.');
            return;
          }
        }

        // Request permission using modular API
        const authStatus = await requestPermission(messagingInstance);
        const enabled =
          authStatus === AuthorizationStatus.AUTHORIZED ||
          authStatus === AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          Alert.alert('Permission Denied', 'Cannot get FCM token');
          return;
        }

        // Get FCM token
        const token = await getToken(messagingInstance);
        setFcmToken(token);
        console.log('FCM Token:', token);
      } catch (error) {
        console.error('Error initializing FCM:', error);
      }
    };

    initFCM();

    const messagingInstance = getMessaging();

    // Foreground FCM messages
    const unsubscribeMessage = onMessage(messagingInstance, async remoteMessage => {
      showNotification(
        remoteMessage.notification?.title ?? 'Notification',
        remoteMessage.notification?.body ?? 'No body'
      );
    });

    // Handle Notifee action press
    const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
      if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction?.id === 'mark-as-read'
      ) {
        if (detail.notification?.id) {
          notifee.cancelNotification(detail.notification.id);
        }
      }
    });

    return () => {
      unsubscribeMessage();
      unsubscribeNotifee();
    };
  }, []);

  const showNotification = async (title?: string, body?: string) => {
    const newCounter = counter + 1;
    setCounter(newCounter);

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Unique tray notification
    const trayNotificationId = Date.now().toString();
    await notifee.displayNotification({
      id: trayNotificationId,
      title: title ?? `Message #${newCounter}`,
      body: body ?? `This is message #${newCounter}`,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: { id: 'default' },
        autoCancel: false,   // make persistent
        ongoing: true,       // persistent in drawer
        importance: AndroidImportance.HIGH,
        actions: [
          { title: 'Mark as Read', pressAction: { id: 'mark-as-read' } },
        ],
      },
    });

    // Optional: latest popup notification (heads-up)
    const popupNotificationId = 'latest-popup';
    latestPopupId.current = popupNotificationId;

    await notifee.displayNotification({
      id: popupNotificationId,
      title: title ?? `Message #${newCounter}`,
      body: body ?? `This is message #${newCounter}`,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: { id: 'default' },
        autoCancel: true,  // heads-up disappears after a short time
        importance: AndroidImportance.HIGH,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Local Notification" onPress={() => showNotification()} />
      <View style={{ height: 20 }} />
      <Button
        title="Firebase Token"
        onPress={() => {
          Alert.alert('FCM Token', fcmToken ?? 'No token');
          console.log('FCM Token:', fcmToken);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default App;
