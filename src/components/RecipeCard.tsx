import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, UtensilsCrossed } from 'lucide-react';
import type { Recipe } from '../types/recipe';

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {recipe.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-emerald-500" />
                <span>{recipe.readyInMinutes}m</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-emerald-500" />
                <span>{recipe.servings}</span>
              </div>
            </div>
            
            {recipe.diets && recipe.diets.length > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                {recipe.diets[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}