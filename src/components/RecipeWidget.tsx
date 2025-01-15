import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, Users, ChefHat, RefreshCw } from 'lucide-react';
import { fetchRandomRecipes } from '../store/slices/recipeSlice';
import { RootState } from '../store';
import type { AppDispatch } from '../store';

const RecipeWidget: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: recipes, loading, error } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    dispatch(fetchRandomRecipes());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchRandomRecipes());
  };

  if (loading) {
    return (
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-pulse">
        <div className="h-20 flex items-center justify-center">
          <span className="text-gray-500">Loading recipes...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-2xl p-6 shadow-xl">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recipe Inspiration</h3>
        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          title="Get new recipes"
        >
          <RefreshCw className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex gap-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
                  {recipe.title}
                </h4>
                <div className="flex gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.readyInMinutes}min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeWidget;