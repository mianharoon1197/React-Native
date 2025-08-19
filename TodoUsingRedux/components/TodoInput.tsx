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
import { addTodo } from '../src/slice/todoSlice';

function TodoInput() {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();
  const addTask = () => {
    if (inputValue.trim().length === 0) return;
    dispatch(addTodo(inputValue.trim()));
    setInputValue('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>My Todo App</Text>
      <View style={styles.inputWrapper}>
        <Icon
          name="playlist-plus"
          size={24}
          color="#888"
          style={styles.playlistIcon}
        />
        <TextInput
          placeholder="Enter a new task"
          placeholderTextColor="#333"
          style={styles.inputBox}
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Icon name="plus" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TodoInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#004e30',
  },
  inputWrapper: {
    width: '100%',
    maxWidth: 550,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,

    backgroundColor: '#fff',
    shadowColor: '#004d40',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  inputBox: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  playlistIcon: {
    paddingLeft: 5,
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    borderRadius: 20,
  },
});
