import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import TodoItem from './TodoItem';
type Todo = {
  id: string;
  title: string;
  count: number;
};

type TodoListProps = {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
  clearAllTodos: () => void;
  incrementCount: (id: string) => void;
  decrementCount: (id: string) => void;
  clearCount: (id: string) => void;
};

function TodoList({
  todos,
  editTodo,
  deleteTodo,
  clearAllTodos,
  incrementCount,
  decrementCount,
  clearCount,
}: TodoListProps) {
  const totalCount = todos.reduce((sum, todo) => sum + todo.count, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem
            id={item.id}
            title={item.title}
            count={item.count}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            incrementCount={incrementCount}
            decrementCount={decrementCount}
            clearCount={clearCount}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.todoText}>Total Todos: {todos.length}</Text>
            <Text style={[styles.todoText]}>Total Count: {totalCount}</Text>
          </View>
        )}
        ListFooterComponent={() =>
          todos.length > 0 && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={clearAllTodos}
                style={[styles.clearButtons, styles.clearTodoButton]}
              >
                <Text style={styles.buttonText}>Clear All Todos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => todos.forEach(todo => clearCount(todo.id))}
                style={[styles.clearButtons, styles.clearCounterButton]}
              >
                <Text style={styles.buttonText}>Clear All Counters</Text>
              </TouchableOpacity>
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
  headerContainer: { alignItems: 'center', marginBottom: 10 },
  todoText: {
    color: '#004d40',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonContainer: { alignItems: 'center', marginVertical: 20 },

  clearButtons: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  clearTodoButton: {
    backgroundColor: '#f74e3f',
  },
  clearCounterButton: {
    backgroundColor: '#ff9800',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default TodoList;
