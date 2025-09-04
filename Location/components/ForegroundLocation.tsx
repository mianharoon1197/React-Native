import React, { useEffect, useState, useRef } from 'react';
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

type Location = { lat: number; lng: number; timestamp: number };
const LOCATIONS_KEY = 'stored_locations';

export default function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [tracking, setTracking] = useState(false);
  const watchId = useRef<number | null>(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Please enable location permission to track location');
        return false;
      }
      return true;
    }
    return true;
  };

  const saveLocations = async (loc: Location) => {
    try {
      const existing = await AsyncStorage.getItem(LOCATIONS_KEY);
      const arr: Location[] = existing ? JSON.parse(existing) : [];

      // avoid duplicates if lastLocation loc is same
      // const lastLocation = arr[arr.length - 1];
      // if (
      //   lastLocation &&
      //   lastLocation.lat === loc.lat &&
      //   lastLocation.lng === loc.lng
      // ) {
      //   return;
      // }

      arr.push(loc);
      await AsyncStorage.setItem(LOCATIONS_KEY, JSON.stringify(arr));
      setLocations(arr);
    } catch (error) {
      console.log('Error storing location:', error);
    }
  };

  const getStoredLocations = async () => {
    try {
      const existing = await AsyncStorage.getItem(LOCATIONS_KEY);
      return existing ? JSON.parse(existing) : [];
    } catch (error) {
      console.log('Error fetching locations:', error);
      return [];
    }
  };

  const startTracking = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission || tracking) return;

    setTracking(true);
    watchId.current = Geolocation.watchPosition(
      async (position: GeoPosition) => {
        const loc: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
        };
        await saveLocations(loc);
      },
      error => console.log('watchPosition error:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 10000,
        fastestInterval: 5000,
      },
    );
  };

  const stopTracking = () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    setTracking(false);
  };

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

    return () => {
      stopTracking();
    };
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
            {index + 1}. Lat: {item.lat.toFixed(5)}, Lng: {item.lng.toFixed(5)}{' '}
            ({new Date(item.timestamp).toLocaleTimeString()})
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
