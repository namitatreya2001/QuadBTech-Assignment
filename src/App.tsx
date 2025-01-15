import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import RecipeWidget from './components/RecipeWidget';
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Header';

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
              <TaskInput />
              <TaskList />
            </div>
          </div>
          <div className="space-y-6">
            <RecipeWidget />
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Use priorities to organize tasks</li>
                <li>• Check completed tasks to track progress</li>
                <li>• Get inspired by daily recipes</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;