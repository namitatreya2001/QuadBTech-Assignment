import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn, CheckSquare } from 'lucide-react';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { RootState } from '../../store';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'demo@example.com' && password === 'password') {
        dispatch(
          loginSuccess({
            id: '1',
            email,
            name: 'Demo User',
          })
        );
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      dispatch(loginFailure(err instanceof Error ? err.message : 'Login failed'));
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl">
      <div className="flex items-center justify-center gap-3 mb-8">
        <CheckSquare className="w-10 h-10 text-blue-600" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Advanced Todo
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            required
            placeholder="demo@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            required
            placeholder="password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {loading ? (
            'Logging in...'
          ) : (
            <>
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </>
          )}
        </button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Use demo@example.com / password to login
        </p>
      </form>
    </div>
  );
};

export default LoginForm;