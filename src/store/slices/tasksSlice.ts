import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: JSON.parse(localStorage.getItem('tasks') || '[]'),
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    },
    updateTaskPriority: (state, action: PayloadAction<{ id: string; priority: Task['priority'] }>) => {
      const task = state.items.find(task => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    },
  },
});

export const { addTask, removeTask, toggleTask, updateTaskPriority } = tasksSlice.actions;
export default tasksSlice.reducer;