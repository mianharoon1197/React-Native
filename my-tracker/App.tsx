import React, { useState, useEffect } from "react";
import { Button, ScrollView, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as FileSystem from "expo-file-system";

const LOCATION_TASK = "background-location-task";
const FILE_PATH = FileSystem.documentDirectory + "locations.json";

// ---------------------- Background Task ----------------------
TaskManager.defineTask(LOCATION_TASK, async ({ data }) => {
  if (data) {
    const { locations } = data as any;
    if (locations && locations.length > 0) {
      try {
        const existing = await FileSystem.readAsStringAsync(FILE_PATH).catch(() => "[]");
        const arr = JSON.parse(existing);

        locations.forEach((loc: any) => {
          arr.push({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            timestamp: new Date().toISOString(),
            source: "BG",
          });
        });

        await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(arr));
      } catch (err) {
        console.log("BG write error:", err);
      }
    }
  }
});

export default function App() {
  const [fgLocations, setFgLocations] = useState<any[]>([]);
  const [bgLocations, setBgLocations] = useState<any[]>([]);
  const [tracking, setTracking] = useState(false);
  const [fgSubscription, setFgSubscription] = useState<any>(null);

  const formatLocalTime = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

  // ---------------------- Load Saved Locations ----------------------
  const loadSaved = async () => {
    try {
      const existing = await FileSystem.readAsStringAsync(FILE_PATH);
      const arr = JSON.parse(existing);
      setFgLocations(arr.filter((l: any) => l.source === "FG"));
      setBgLocations(arr.filter((l: any) => l.source === "BG"));
    } catch {
      setFgLocations([]);
      setBgLocations([]);
    }
  };

  // ---------------------- Foreground Tracking ----------------------
  const startForegroundTracking = async () => {
    if (!fgSubscription) {
      const sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 60000, distanceInterval: 0 },
        async (loc) => {
          const newLoc = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            timestamp: new Date().toISOString(),
            source: "FG",
          };
          setFgLocations((prev) => [...prev, newLoc]);

          // Save to file
          const existing = await FileSystem.readAsStringAsync(FILE_PATH).catch(() => "[]");
          const arr = JSON.parse(existing);
          arr.push(newLoc);
          await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(arr));
        }
      );
      setFgSubscription(sub);
    }
  };

  // ---------------------- Start Tracking (FG + BG) ----------------------
  const startTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted" || bgStatus !== "granted") return;

    await startForegroundTracking();

    // Background task
    const isRunning = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);
    if (!isRunning) {
      await Location.startLocationUpdatesAsync(LOCATION_TASK, {
        accuracy: Location.Accuracy.High,
        timeInterval: 30000,
        distanceInterval: 0,
        pausesUpdatesAutomatically: false,
        foregroundService: {
          notificationTitle: "Background Tracking Active",
          notificationBody: "Your location is being tracked in the background",
        },
      });
    }

    setTracking(true);
  };

  const stopTracking = async () => {
    if (fgSubscription) {
      fgSubscription.remove();
      setFgSubscription(null);
    }
    setTracking(false);
  };

  const clearSaved = async () => {
    await FileSystem.writeAsStringAsync(FILE_PATH, "[]");
    setFgLocations([]);
    setBgLocations([]);
  };

  // ---------------------- Initialize ----------------------
  useEffect(() => {
    // Load previous locations
    loadSaved();

    // Start BG tracking if permission granted
    const initBG = async () => {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      if (status === "granted") {
        const isRunning = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);
        if (!isRunning) {
          await Location.startLocationUpdatesAsync(LOCATION_TASK, {
            accuracy: Location.Accuracy.High,
            timeInterval: 30000,
            distanceInterval: 0,
            pausesUpdatesAutomatically: false,
            foregroundService: {
              notificationTitle: "Background Tracking Active",
              notificationBody: "Your location is being tracked in the background",
            },
          });
        }
      }
    };
    initBG();

    // Auto-refresh BG locations every 5 seconds
    const interval = setInterval(loadSaved, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.legend}>
        <Text style={{ color: "green" }}>Foreground → Green</Text>
        <Text style={{ color: "blue" }}>Background → Blue</Text>
      </View>

      <View style={styles.buttonsRow}>
        <Button title={tracking ? "Stop" : "Start"} onPress={tracking ? stopTracking : startTracking} />
        <Button title="Reload" onPress={loadSaved} />
        <Button title="Clear" onPress={clearSaved} />
      </View>

      <ScrollView style={styles.scroll}>
        {fgLocations.map((loc, idx) => (
          <Text key={`FG-${idx}`} style={[styles.text, { color: "green" }]}>
            {idx + 1}. {loc.latitude.toFixed(5)}, {loc.longitude.toFixed(5)} ({formatLocalTime(loc.timestamp)}) [FG]
          </Text>
        ))}

        {bgLocations.map((loc, idx) => (
          <Text key={`BG-${idx}`} style={[styles.text, { color: "blue" }]}>
            {idx + 1}. {loc.latitude.toFixed(5)}, {loc.longitude.toFixed(5)} ({formatLocalTime(loc.timestamp)}) [BG]
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  legend: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  buttonsRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 15 },
  scroll: { flex: 1, backgroundColor: "#fff", borderRadius: 8, padding: 10 },
  text: { marginVertical: 4, fontSize: 14 },
});
