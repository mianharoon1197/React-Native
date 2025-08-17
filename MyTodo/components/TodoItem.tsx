import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type TodoItemProps = {
  id: string;
  title: string;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
};

function TodoItem({ id, title, deleteTodo, editTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(title);

  const handleEditTodo = () => {
    const next = editText.trim();
    if (next.length === 0) {
      setEditText(title);
      setIsEditing(false);
      return;
    }
    editTodo(id, next);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.leftCircle} />
        {isEditing ? (
          <TextInput
            value={editText}
            onChangeText={setEditText}
            onSubmitEditing={handleEditTodo}
            autoFocus
            style={styles.inputEdit}
            placeholder="Edit task"
            placeholderTextColor="#678"
          />
        ) : (
          <Text style={styles.todoText}>{title}</Text>
        )}
      </View>

      <View style={styles.buttons}>
        {isEditing ? (
          <TouchableOpacity
            onPress={handleEditTodo}
            style={[styles.iconButton, styles.saveBtn]}
          >
            <Icon name="content-save-outline" size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            style={styles.iconButton}
          >
            <Icon name="pencil-outline" size={20} color="#333" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => deleteTodo(id)}
          style={[styles.iconButton, styles.deleteBtn]}
        >
          <Icon name="trash-can-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0f7fa',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,

    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    shadowColor: '#004d40',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  leftCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00796b',
    marginRight: 15,
  },
  todoText: {
    fontSize: 16,
    color: '#004d40',
    fontWeight: '600',
  },
  inputEdit: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#004d40',
    paddingVertical: 2,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    padding: 6,
    marginLeft: 8, // instead of gap
  },
  deleteBtn: {
    backgroundColor: '#d32f2f',
  },
  saveBtn: {
    backgroundColor: '#2e7d32',
  },
});
