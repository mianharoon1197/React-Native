import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MapView, Camera, MarkerView } from '@maplibre/maplibre-react-native';

const markers: { id: string; title: string; description: string; coordinates: [number, number] }[] = [
  { id: '1', title: 'Islamabad', description: 'Capital of Pakistan 🇵🇰', coordinates: [73.0479, 33.6844] },
  { id: '2', title: 'Lahore', description: 'City of Gardens 🌳', coordinates: [74.3587, 31.5204] },
  { id: '3', title: 'Karachi', description: 'City of Lights 🌆', coordinates: [67.0011, 24.8607] },
];

export default function MapScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        mapStyle={'https://api.maptiler.com/maps/streets-v2/style.json?key=WoAUOvdhgbUpwZ1rVI4h'}
        zoomEnabled={true}
        onPress={() => setSelected(null)} 
      >
        <Camera zoomLevel={5} centerCoordinate={markers[0].coordinates} />

        {markers.map((m) => (
          <MarkerView key={m.id} coordinate={m.coordinates} anchor={{ x: 0.5, y: 1 }}>
            <Pressable onPress={() => setSelected((prev) => (prev === m.id ? null : m.id))}>
              <View style={{ alignItems: 'center' }}>
                {selected === m.id && (
                  <View style={styles.popup}>
                    <Text style={styles.popupTitle}>{m.title}</Text>
                    <Text style={styles.popupDesc}>{m.description}</Text>
                  </View>
                )}
                <Text style={styles.markerText}>📍</Text>
              </View>
            </Pressable>
          </MarkerView>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  markerText: { fontSize: 30 },
  popup: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 6,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  popupTitle: { fontWeight: 'bold', fontSize: 12 },
  popupDesc: { fontSize: 11, textAlign: 'center' },
});
