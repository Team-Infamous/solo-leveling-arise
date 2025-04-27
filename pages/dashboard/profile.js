import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import HunterProfile from '../../components/HunterProfile';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Hunter Profile</h1>
        <HunterProfile />
      </main>
    </div>
  );
};

export default ProfilePage;
