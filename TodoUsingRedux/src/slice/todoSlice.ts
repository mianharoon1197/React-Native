import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

type Todo = {
  id: string;
  title: string;
  count: number;
};

type TodoState = Todo[];

const initialState: TodoState = [];
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({ id: nanoid().toString(), title: action.payload, count: 0 });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter(todo => todo.id != action.payload);
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: string; newText: string }>,
    ) => {
      const todo = state.find(t => t.id === action.payload.id);
      if (todo) todo.title = action.payload.newText;
    },
    clearAllTodos: () => {
      return [];
    },
    incrementCount: (state, action: PayloadAction<string>) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) todo.count += 1;
    },
    decrementCount: (state, action: PayloadAction<string>) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) todo.count -= 1;
    },
    clearCount: state => {
      state.forEach(todo => {
        todo.count = 0;
      });
    },
  },
});
export default todoSlice.reducer;
export const {
  addTodo,
  deleteTodo,
  editTodo,
  clearAllTodos,
  incrementCount,
  decrementCount,
  clearCount,
} = todoSlice.actions;
