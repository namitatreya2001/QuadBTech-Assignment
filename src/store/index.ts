import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import authReducer from './slices/authSlice';
import recipeReducer from './slices/recipeSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    recipes: recipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;