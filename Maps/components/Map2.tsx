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
  const [markers, setMarkers] = useState<MarkerType[]>([
    {
      id: '1',
      title: 'Islamabad',
      description: 'Capital of Pakistan 🇵🇰',
      coordinates: [73.0479, 33.6844],
    },
    {
      id: '2',
      title: 'Lahore',
      description: 'City of Gardens 🌳',
      coordinates: [74.3587, 31.5204],
    },
  ]);

  const [selected, setSelected] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [pendingCoords, setPendingCoords] = useState<[number, number] | null>(
    null,
  );

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const addMarker = () => {
    if (!title || !desc || !pendingCoords) {
      Alert.alert(
        '⚠️ Please long-press on the map and fill title + description.',
      );
      return;
    }

    const newMarker: MarkerType = {
      id: Date.now().toString(),
      title,
      description: desc,
      coordinates: pendingCoords,
    };

    setMarkers([...markers, newMarker]);

    setTitle('');
    setDesc('');
    setPendingCoords(null);
  };

  const startEditing = (m: MarkerType) => {
    setEditingId(m.id);
    setEditTitle(m.title);
    setEditDesc(m.description);
  };

  const saveEdit = (id: string) => {
    setMarkers(markers.map(m =>
      m.id === id ? { ...m, title: editTitle, description: editDesc } : m
    ));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        mapStyle={
          'https://api.maptiler.com/maps/streets-v2/style.json?key=WoAUOvdhgbUpwZ1rVI4h'
        }
        zoomEnabled={true}
        onPress={() => setSelected(null)}
        onLongPress={(event: any) => {
          const coords = event.geometry.coordinates as [number, number];
          setPendingCoords(coords);
        }}
      >
        <Camera zoomLevel={5} centerCoordinate={markers[0].coordinates} />

        {markers.map(m => (
          <MarkerView
            key={m.id}
            coordinate={m.coordinates}
            anchor={{ x: 0.5, y: 1 }}
          >
            <Pressable
              onPress={() => setSelected(prev => (prev === m.id ? null : m.id))}
            >
              <View style={{ alignItems: 'center' }}>
                {selected === m.id && (
                  <View style={styles.popup}>
                    {editingId === m.id ? (
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
                            style={[styles.actionBtn, { backgroundColor: 'green' }]}
                            onPress={() => saveEdit(m.id)}
                          >
                            <Text style={styles.actionText}>Save</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.actionBtn, { backgroundColor: 'gray' }]}
                            onPress={cancelEdit}
                          >
                            <Text style={styles.actionText}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <>
                        <Text style={styles.popupTitle}>{m.title}</Text>
                        <Text style={styles.popupDesc}>{m.description}</Text>
                        <TouchableOpacity
                          style={styles.editBtn}
                          onPress={() => startEditing(m)}
                        >
                          <Text style={{ color: 'blue' }}>✏️ Edit</Text>
                        </TouchableOpacity>
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
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.markerText}>🆕</Text>
            </View>
          </MarkerView>
        )}
      </MapView>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Add New Marker</Text>
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          value={desc}
          onChangeText={setDesc}
        />
        <TouchableOpacity onPress={addMarker} style={styles.button}>
          <Text style={styles.buttonText}>Save Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  markerText: { fontSize: 30 },
  popup: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 6,
    alignItems: 'center',
    minWidth: 120,
  },
  popupTitle: { fontWeight: 'bold', fontSize: 13 },
  popupDesc: { fontSize: 11, textAlign: 'center', marginBottom: 4 },
  editBtn: {
    marginTop: 4,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 4,
    marginVertical: 2,
    width: 120,
    fontSize: 12,
  },
  editActions: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 6,
  },
  actionBtn: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  actionText: { color: 'white', fontSize: 12 },
  form: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    marginBottom: 6,
    padding: 6,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
