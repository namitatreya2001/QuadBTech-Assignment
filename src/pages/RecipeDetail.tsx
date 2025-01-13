import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Recipe } from '../types/recipe';
import { Clock, Users, ChefHat, ArrowLeft, UtensilsCrossed, Tag, ListOrdered } from 'lucide-react';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      try {
        const data = await api.getRecipeById(parseInt(id));
        setRecipe(data);
      } catch (err) {
        setError('Failed to fetch recipe details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const formatInstructions = (instructions: string) => {
    // Split instructions into steps, handling both numbered lists and paragraphs
    const steps = instructions
      .split(/\d+\.|<br>|<br\/>|<br \/>|\n/)
      .filter(step => step.trim().length > 0)
      .map(step => step.trim());

    return steps;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <ChefHat className="w-16 h-16 text-emerald-600 animate-bounce" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <p className="text-red-600 font-medium">{error || 'Recipe not found'}</p>
        </div>
      </div>
    );
  }

  const instructionSteps = formatInstructions(recipe.instructions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Recipes
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-96">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h1 className="absolute bottom-8 left-8 right-8 text-4xl font-bold text-white">
              {recipe.title}
            </h1>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center px-4 py-2 bg-emerald-50 rounded-lg">
                <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                <span className="text-emerald-900">{recipe.readyInMinutes} minutes</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-emerald-50 rounded-lg">
                <Users className="h-5 w-5 text-emerald-600 mr-2" />
                <span className="text-emerald-900">{recipe.servings} servings</span>
              </div>
              {recipe.cuisines?.map((cuisine) => (
                <div key={cuisine} className="flex items-center px-4 py-2 bg-emerald-50 rounded-lg">
                  <UtensilsCrossed className="h-5 w-5 text-emerald-600 mr-2" />
                  <span className="text-emerald-900">{cuisine}</span>
                </div>
              ))}
            </div>

            {recipe.diets && recipe.diets.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-emerald-600" />
                  Dietary Information
                </h2>
                <div className="flex flex-wrap gap-2">
                  {recipe.diets.map((diet) => (
                    <span
                      key={diet}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800"
                    >
                      {diet}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-3">
                  {recipe.extendedIngredients.map((ingredient) => (
                    <li
                      key={ingredient.id}
                      className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
                    >
                      <div className="h-2 w-2 bg-emerald-500 rounded-full mr-3" />
                      {ingredient.original}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ListOrdered className="h-6 w-6 mr-2 text-emerald-600" />
                  Instructions
                </h2>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-100"></div>
                  <ol className="space-y-6 relative">
                    {instructionSteps.map((step, index) => (
                      <li key={index} className="pl-12">
                        <div className="relative group">
                          <div className="absolute -left-12 flex items-center justify-center">
                            <div className="w-8 h-8 bg-white border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-600 font-bold group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-200">
                              {index + 1}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-4 shadow-sm group-hover:shadow-md transition-all duration-200 border border-gray-100">
                            <p className="text-gray-700 leading-relaxed">{step}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}