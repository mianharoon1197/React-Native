import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default function App() {
  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        if (!granted) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          console.log('User response:', result);
        } else {
          console.log('Notification permission already granted');
        }
      }
    };

    requestPermission();

    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'Default Channel',
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  }, []);

  const handlePress = () => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: 'Hello 👋',
      message: 'This is a local notification!',
      playSound: true,
      importance: 'high',
      priority: 'high',
      vibrate: true,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Push Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#2de00eff', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white' },
});



