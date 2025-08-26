import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { MapView, Camera, MarkerView } from '@maplibre/maplibre-react-native';

function MapScreen() {
  const [popup, setPopup] = useState<{
    coordinates: [number, number];
    name: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const fetchPlaceName = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`,
        { headers: { 'User-Agent': 'ReactNativeMapApp/1.0' } },
      );
      const data = await response.json();
      return data.display_name || 'Unknown Place';
    } catch (error) {
      console.log('Error fetching place name:', error);
      return 'Unknown Place';
    }
  };

  const handleMapPress = async (event: any) => {
    const [lon, lat]: [number, number] = event.geometry.coordinates;
    setLoading(true);
    const placeName = await fetchPlaceName(lat, lon);
    setPopup({ coordinates: [lon, lat], name: placeName });
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapContainer}
        // mapStyle={'https://demotiles.maplibre.org/style.json'}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=WoAUOvdhgbUpwZ1rVI4h`}
        onPress={handleMapPress}
      >
        <Camera zoomLevel={5} centerCoordinate={popup ? popup.coordinates : [73.0791, 31.4180]} />

        {popup && (
          <MarkerView coordinate={popup.coordinates} anchor={{ x: 0.5, y: 1 }}>
            <Pressable onPress={() => setPopup(null)}>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.popup}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#333" />
                  ) : (
                    <>
                      <Text style={styles.popupTitle}>{popup.name}</Text>
                      <Text>
                        Lon: {popup.coordinates[0].toFixed(4)}, Lat:{' '}
                        {popup.coordinates[1].toFixed(4)}
                      </Text>
                    </>
                  )}
                </View>
                <Text style={styles.markerText}>📍</Text>
              </View>
            </Pressable>
          </MarkerView>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: { flex: 1 },
  markerText: { fontSize: 20 },
  popup: {
    width: 300,
    backgroundColor: '#fff',
    //paddingHorizontal: 8,
    padding: 6,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
  },
  popupTitle: { fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
});
export default MapScreen;
