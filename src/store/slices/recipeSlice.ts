import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Recipe } from '../../types';

interface RecipeState {
  data: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchRandomRecipes = createAsyncThunk(
  'recipes/fetchRandom',
  async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}&number=2`
      );
      
      return response.data.recipes;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || 'Failed to fetch recipes');
      }
      throw error;
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandomRecipes.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchRandomRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      });
  },
});

export default recipeSlice.reducer;