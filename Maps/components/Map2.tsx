import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { MapView, Camera, MarkerView } from '@maplibre/maplibre-react-native';

type MarkerType = {
  id: string;
  title: string;
  description: string;
  coordinates: [number, number];
};

export default function MapScreen() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [pendingCoords, setPendingCoords] = useState<[number, number] | null>(
    null,
  );
  const [activeMarker, setActiveMarker] = useState<[number, number] | null>(
    null,
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formPosition, setFormPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const addMarker = () => {
    if (!title || !desc || !pendingCoords) {
      Alert.alert('⚠️ Please long-press on the map then fill details.');
      return;
    }

    const newMarker: MarkerType = {
      id: Date.now().toString(),
      title,
      description: desc,
      coordinates: pendingCoords,
    };

    setMarkers([...markers, newMarker]);
    setActiveMarker(newMarker.coordinates);
    setTitle('');
    setDesc('');
    setPendingCoords(null);
    setShowForm(false);
    setFormPosition(null);
  };

  const editDetails = (marker: MarkerType) => {
    setEditingId(marker.id);
    setEditTitle(marker.title);
    setEditDesc(marker.description);
  };

  const deleteMarker = (id: string) => {
    const newMarkers = markers.filter(marker => marker.id !== id);
    setMarkers(newMarkers);
    setSelected(null);

    if (newMarkers.length > 0) {
      setActiveMarker(newMarkers[newMarkers.length - 1].coordinates);
    } else {
      setActiveMarker([73.0479, 33.6844]);
    }
  };

  const saveEdit = (id: string) => {
    setMarkers(
      markers.map(marker =>
        marker.id === id
          ? { ...marker, title: editTitle, description: editDesc }
          : marker,
      ),
    );
    setEditingId(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        mapStyle={
          'https://api.maptiler.com/maps/streets-v2/style.json?key=WoAUOvdhgbUpwZ1rVI4h'
        }
        zoomEnabled={true}
        onPress={() => {
          setSelected(null);
          setPendingCoords(null);
          setShowForm(false);
          setFormPosition(null);
        }}
        onLongPress={(event: any) => {
          const coords = event.geometry.coordinates as [number, number];
          setPendingCoords(coords);
          setShowForm(true);
          setActiveMarker(coords);

        
          if (event.point) {
            setFormPosition({ x: event.point.x, y: event.point.y });
          } else {
            setFormPosition({ x: 200, y: 400 }); 
          }
        }}
      >
        <Camera
          key={activeMarker ? activeMarker.toString() : 'default'}
          zoomLevel={5}
          centerCoordinate={activeMarker || [73.0479, 33.6844]}
        />

        {markers.map(marker => (
          <MarkerView
            key={marker.id}
            coordinate={marker.coordinates}
            anchor={{ x: 0.5, y: 1 }}
          >
            <Pressable
              onPress={() => {
                const isSelected = selected === marker.id;
                setSelected(isSelected ? null : marker.id);
                setActiveMarker(isSelected ? null : marker.coordinates);
              }}
            >
              <View style={{ alignItems: 'center' }}>
                {selected === marker.id && (
                  <View style={styles.popup}>
                    {editingId === marker.id ? (
                      <>
                        <TextInput
                          style={styles.editInput}
                          value={editTitle}
                          onChangeText={setEditTitle}
                        />
                        <TextInput
                          style={styles.editInput}
                          value={editDesc}
                          onChangeText={setEditDesc}
                        />
                        <View style={styles.editActions}>
                          <TouchableOpacity
                            style={[styles.actionBtn, styles.saveBtn]}
                            onPress={() => saveEdit(marker.id)}
                          >
                            <Text style={styles.actionText}>Save</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.actionBtn, styles.cancelBtn]}
                            onPress={() => setEditingId(null)}
                          >
                            <Text style={styles.actionText}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <>
                        <Text style={styles.popupTitle}>{marker.title}</Text>
                        <Text style={styles.popupDesc}>
                          {marker.description}
                        </Text>
                        <Text>Lon: {marker.coordinates[0].toFixed(4)}</Text>
                        <Text>Lat: {marker.coordinates[1].toFixed(4)}</Text>
                        <View style={styles.editActions}>
                          <TouchableOpacity
                            style={styles.editBtn}
                            onPress={() => editDetails(marker)}
                          >
                            <Text style={styles.editBtnText}>Edit</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.editBtn}
                            onPress={() => deleteMarker(marker.id)}
                          >
                            <Text style={styles.deleteBtnText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </View>
                )}
                <Text style={styles.markerText}>📍</Text>
              </View>
            </Pressable>
          </MarkerView>
        ))}

        {pendingCoords && (
          <MarkerView coordinate={pendingCoords} anchor={{ x: 0.5, y: 1 }}>
            <Pressable
              onPress={() => {
                setPendingCoords(null);
                setShowForm(false);
                setFormPosition(null);
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.markerText}>🆕</Text>
              </View>
            </Pressable>
          </MarkerView>
        )}
      </MapView>

      
      {showForm && formPosition && (
        <View
          style={[
            styles.form,
            {
              position: 'absolute',
              top: formPosition.y + 100, 
              left: Math.max(formPosition.x - 100, 10), 
            },
          ]}
        >
          <Text style={styles.formTitle}>Add New Marker</Text>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            autoFocus
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={desc}
            onChangeText={setDesc}
            onSubmitEditing={addMarker}
          />
          <TouchableOpacity onPress={addMarker} style={styles.button}>
            <Text style={styles.buttonText}>Save Marker</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  markerText: { fontSize: 30 },
  popup: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 6,
    alignItems: 'center',
    maxWidth: 200,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  popupTitle: {
    color: '#004e30',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
  },
  popupDesc: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 6,
    color: '#222',
  },
  editBtn: {
    marginTop: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 6,
    marginVertical: 3,
    width: 130,
    fontSize: 13,
    backgroundColor: '#f9fafb',
  },
  editActions: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 8,
  },
  editBtnText: {
    color: '#2563eb',
    fontWeight: '600',
    paddingHorizontal: 5,
  },
  deleteBtnText: {
    color: 'red',
    fontWeight: '600',
    paddingHorizontal: 3,
  },
  actionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },
  saveBtn: { backgroundColor: '#2563eb' },
  cancelBtn: { backgroundColor: '#6b7280' },
  actionText: { color: 'white', fontSize: 12, fontWeight: '600' },
  form: {
    width: 300,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#004e30',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  button: {
    backgroundColor: '#2563eb',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
});
