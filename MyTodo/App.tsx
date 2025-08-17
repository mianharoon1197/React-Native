import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from 'react';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const [todo, setTodos] = useState<{ id: string; title: string }[]>([]);

  const addTodo = (task: string) => {
    console.log('Task Added: ', task);
    if (task.trim() === '') return;
    setTodos(prev => [...prev, { id: Date.now().toString(), title: task }]);
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id != id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(prev =>
      prev.map(todo => 
        todo.id === id ? { ...todo, title: newText } : todo),
    );
  };


  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
          paddingLeft: safeAreaInsets.left,
          paddingRight: safeAreaInsets.right,
        },
      ]}
    >
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todo} editTodo={editTodo} deleteTodo={deleteTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
});

export default App;
