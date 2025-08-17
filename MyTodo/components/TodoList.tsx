import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TodoItem from './TodoItem';
type Todo = {
  id: string;
  title: string;
};

type TodoListProps = {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
};

function TodoList({ todos, deleteTodo, editTodo }: TodoListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 25,
  },
});
export default TodoList;
