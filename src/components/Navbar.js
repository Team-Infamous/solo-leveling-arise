import { useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';
import Link from 'next/link';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 border-b border-red-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard">
          <a className="text-2xl font-bold text-red-500 flex items-center">
            <img src="/images/logo.png" alt="Solo Leveling" className="h-10 mr-2" />
            Solo Leveling: Arise
          </a>
        </Link>
        
        {user && (
          <div className="flex items-center space-x-6">
            <Link href="/dashboard/profile">
              <a className="hover:text-red-400">Profile</a>
            </Link>
            <Link href="/dashboard/inventory">
              <a className="hover:text-red-400">Inventory</a>
            </Link>
            <Link href="/dashboard/quests">
              <a className="hover:text-red-400">Quests</a>
            </Link>
            {user.role === 'admin' && (
              <Link href="/dashboard/admin">
                <a className="hover:text-red-400">Admin Panel</a>
              </Link>
            )}
            <button 
              onClick={handleLogout}
              className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
