import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { storeType } from '../src/store/store';
import { clearAllTodos, clearAllCounts } from '../src/slice/todoSlice';

function TodoList() {
  const todos = useSelector((state: storeType) => state.todos);
  const dispatch = useDispatch();
  const totalCount = todos.reduce((sum, todo) => sum + todo.count, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TodoItem {...item} />}
        // ListHeaderComponent={() => (
        //   <View style={styles.headerContainer}>
        //     <Text style={styles.todoText}>Total Todos: {todos.length}</Text>
        //     <Text style={[styles.todoText]}>Total Count: {totalCount}</Text>
        //   </View>
        // )}
        ListFooterComponent={() =>
          todos.length > 0 && (
            <View style={styles.wrapper}>
              <View style={styles.buttonsContainer}>
                <Text style={[styles.todoText]}>
                  Total Counts: {totalCount}
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(clearAllCounts())}
                  style={[styles.clearButtons, styles.clearCounterButton]}
                >
                  <Text style={styles.buttonText}>Clear All Counters</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonsContainer}>
                <Text style={styles.todoText}>Total Todos: {todos.length}</Text>
                <TouchableOpacity
                  onPress={() => dispatch(clearAllTodos())}
                  style={[styles.clearButtons, styles.clearTodoButton]}
                >
                  <Text style={styles.buttonText}>Clear All Todos</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  wrapper: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-evenly',
  },

  todoText: {
    color: '#004d40',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: 10,
    marginVertical: 20,
    maxWidth: '100%',
    alignSelf: 'center',
  },

  clearButtons: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  clearTodoButton: {
    backgroundColor: '#f74e3f',
  },
  clearCounterButton: {
    backgroundColor: '#ff9800',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default TodoList;
