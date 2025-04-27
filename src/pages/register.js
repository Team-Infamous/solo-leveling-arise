import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hunterName, setHunterName] = useState('');
  const [hunterClass, setHunterClass] = useState('Warrior');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, hunterName, hunterClass);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center bg-[url('/images/backgrounds/gate.jpg')] bg-cover bg-center">
      <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-500">Become a Hunter</h1>
        
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
          
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Hunter Name</label>
            <input
              type="text"
              value={hunterName}
              onChange={(e) => setHunterName(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2">Hunter Class</label>
            <select
              value={hunterClass}
              onChange={(e) => setHunterClass(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="Warrior">Warrior</option>
              <option value="Mage">Mage</option>
              <option value="Assassin">Assassin</option>
              <option value="Tanker">Tanker</option>
              <option value="Healer">Healer</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded transition duration-200"
          >
            Register
          </button>
        </form>
        
        <p className="mt-4 text-center">
          Already a hunter?{' '}
          <a href="/login" className="text-red-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
