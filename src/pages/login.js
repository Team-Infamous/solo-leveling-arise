import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';
//import styles from '../styles/globals.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center bg-[url('/images/backgrounds/gate.jpg')] bg-cover bg-center">
      <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-500">Hunter Login</h1>
        
        {error && <div className="mb-4 p-2 bg-red-900 text-white rounded">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded transition duration-200"
          >
            Login
          </button>
        </form>
        
        <p className="mt-4 text-center">
          Not a hunter?{' '}
          <a href="/register" className="text-red-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
