import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, CheckSquare, User } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="bg-white/70 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckSquare className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Advanced Todo
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">{user?.name}</span>
            </div>
            <button
              onClick={() => dispatch(logout())}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;