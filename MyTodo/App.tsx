import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [todo, setTodos] = useState<
    { id: string; title: string; count: number }[]
  >([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //load todos
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodo = await AsyncStorage.getItem('myTodos');
        if (storedTodo) {
          setTodos(JSON.parse(storedTodo));
        }
      } catch (error) {
        console.log('Unable to load todo: ', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadTodos();
  }, []);

  //save todo
  useEffect(() => {
    if (!isLoaded) return;
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('myTodos', JSON.stringify(todo));
      } catch (error) {
        console.log('Unable to save todo: ', error);
      }
    };
    saveTodos();
  }, [todo]);

  const addTodo = (task: string) => {
    if (task.trim() === '') return;
    setTodos(prev => [
      ...prev,
      { id: Date.now().toString(), title: task, count: 0 },
    ]);
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id != id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title: newText } : todo)),
    );
  };

  const clearAllTodos = () => {
    setTodos([]);
  };

  const incrementCount = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, count: todo.count + 1 } : todo,
      ),
    );
  };
  const decrementCount = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, count: todo.count - 1 } : todo,
      ),
    );
  };

  const clearCount = (id: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, count: 0 } : todo)),
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

      <TodoList
        todos={todo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        clearAllTodos={clearAllTodos}
        incrementCount={incrementCount}
        decrementCount={decrementCount}
        clearCount={clearCount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },

  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  clearButton: {
    backgroundColor: '#f74e3f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
