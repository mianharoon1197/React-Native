import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundService from 'react-native-background-actions';

type Location = { lat: number; lng: number; timestamp: number };
const LOCATIONS_KEY = 'stored_locations';

export default function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [tracking, setTracking] = useState(false);

  // Ask for location permissions
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const fine = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const background = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      );

      if (
        fine !== PermissionsAndroid.RESULTS.GRANTED ||
        background !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert('Please enable location permissions');
        return false;
      }
      return true;
    }
    return true;
  };

  // Save location
  const saveLocations = async (loc: Location) => {
    try {
      const existing = await AsyncStorage.getItem(LOCATIONS_KEY);
      const arr: Location[] = existing ? JSON.parse(existing) : [];
      arr.push(loc);
      await AsyncStorage.setItem(LOCATIONS_KEY, JSON.stringify(arr));
      setLocations(arr);
    } catch (error) {
      console.log('Error storing location:', error);
    }
  };

  // Fetch stored locations
  const getStoredLocations = async () => {
    try {
      const existing = await AsyncStorage.getItem(LOCATIONS_KEY);
      return existing ? JSON.parse(existing) : [];
    } catch (error) {
      console.log('Error fetching locations:', error);
      return [];
    }
  };

  // Background task (keeps running)
  const backgroundTask = async () => {
    Geolocation.watchPosition(
      async (position: GeoPosition) => {
        const loc: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
        };
        await saveLocations(loc);
        console.log('Background location:', loc);
      },
      error => console.log('watchPosition error:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 10000,
        fastestInterval: 5000,
      },
    );

    // keep the task alive
    await new Promise(() => {});
  };

  // Start tracking
 const startTracking = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission || tracking) return;

  setTracking(true);

  const options = {
    taskName: 'LocationTracking',
    taskTitle: 'Tracking your location',
    taskDesc: 'Running in background',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff0000',
    parameters: {},
  };

  await BackgroundService.start(backgroundTask, options);
};


  // Stop tracking
  const stopTracking = async () => {
    try {
      await BackgroundService.stop();
      setTracking(false);
    } catch (error) {
      console.log('Error stopping service:', error);
    }
  };

  // Clear stored locations
  const clearAllLocations = async () => {
    try {
      await AsyncStorage.removeItem(LOCATIONS_KEY);
      setLocations([]);
    } catch (error) {
      console.log('Error clearing locations:', error);
    }
  };

  useEffect(() => {
    (async () => {
      const stored = await getStoredLocations();
      setLocations(stored);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Locations</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'green' }]}
          onPress={startTracking}
        >
          <Text style={styles.buttonText}>Start Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'orange' }]}
          onPress={stopTracking}
        >
          <Text style={styles.buttonText}>Stop Tracking</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={locations}
        keyExtractor={item => item.timestamp.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.item}>
            {index + 1}. Lat: {item.lat.toFixed(5)}, Lng: {item.lng.toFixed(5)} (
            {new Date(item.timestamp).toLocaleTimeString()})
          </Text>
        )}
        ListFooterComponent={() =>
          locations.length > 0 ? (
            <TouchableOpacity style={styles.button} onPress={clearAllLocations}>
              <Text style={styles.buttonText}>Clear All Locations</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  button: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
