import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-screen w-full overflow-hidden">
        <img 
          src="/images/backgrounds/gate.jpg" 
          alt="Solo Leveling Gate"
          className="absolute h-full w-full object-cover opacity-70"
        />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-red-500">
            SOLO LEVELING: ARISE
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Become the hunter you were meant to be. Enter the gates and face your destiny.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => router.push('/register')}
              className="px-8 py-3 bg-red-700 hover:bg-red-800 rounded-lg text-lg font-semibold transition-all"
            >
              Register as Hunter
            </button>
            <button 
              onClick={() => router.push('/login')}
              className="px-8 py-3 bg-transparent border-2 border-red-700 hover:bg-red-900 rounded-lg text-lg font-semibold transition-all"
            >
              Hunter Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
