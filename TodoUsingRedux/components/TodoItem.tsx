import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import {
  deleteTodo,
  editTodo,
  incrementCount,
  decrementCount,
} from '../src/slice/todoSlice';
type TodoItemProps = {
  id: string;
  title: string;
  count: number;
};

function TodoItem({ id, title, count }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(title);

  const dispatch = useDispatch();
  const handleEditTodo = () => {
    const next = editText.trim();
    if (next.length === 0) {
      setEditText(title);
      setIsEditing(false);
      return;
    }
    dispatch(editTodo({ id, newText: next }));
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            onPress={() => dispatch(decrementCount(id))}
            style={[styles.counterBtn, { backgroundColor: '#c71c1c' }]}
          >
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.countValue}>{count}</Text>

          <TouchableOpacity
            onPress={() => dispatch(incrementCount(id))}
            style={[styles.counterBtn, { backgroundColor: '#1b5e20' }]}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
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
          onPress={() => dispatch(deleteTodo(id))}
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
    maxWidth: 550,
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

  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  counterBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  countValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004d40',
  },
  todoText: {
    fontSize: 16,
    color: '#004d40',
    fontWeight: '600',
    marginLeft: 5,
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
    marginLeft: 8,
  },
  deleteBtn: {
    backgroundColor: '#d32f2f',
  },
  saveBtn: {
    backgroundColor: '#2e7d32',
  },
});
