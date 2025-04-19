import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
      <div className="bg-gray-900 bg-opacity-90 p-10 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center tracking-wide">GoodieRun Login</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
<input
  id="email"
  name="email"
  type="email"
  autoComplete="email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="you@example.com"
  className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
/>

          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
<input
  id="password"
  name="password"
  type="password"
  autoComplete="current-password"
  required
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
  className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
/>

          </div>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-bold text-lg transition shadow-lg hover:shadow-indigo-500/50"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
