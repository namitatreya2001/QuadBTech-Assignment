import axios from 'axios';
import type { Recipe } from '../types/recipe';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

if (!API_KEY) {
  console.error('Missing Spoonacular API key! Please add VITE_SPOONACULAR_API_KEY to your .env file');
}

export const api = {
  async getRecipes(limit = 12) {
    try {
      const response = await axios.get(`${BASE_URL}/random`, {
        params: {
          apiKey: API_KEY,
          number: limit,
        },
      });
      return response.data.recipes;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error('Invalid or missing API key. Please check your Spoonacular API key in the .env file');
        }
        console.error('Error fetching recipes:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText
        });
      } else {
        console.error('Error fetching recipes:', String(error));
      }
      throw new Error('Failed to fetch recipes');
    }
  },

  async getRecipeById(id: number): Promise<Recipe> {
    try {
      const response = await axios.get(`${BASE_URL}/${id}/information`, {
        params: {
          apiKey: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error('Invalid or missing API key. Please check your Spoonacular API key in the .env file');
        }
        console.error('Error fetching recipe details:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText
        });
      } else {
        console.error('Error fetching recipe details:', String(error));
      }
      throw new Error('Failed to fetch recipe details');
    }
  },
};