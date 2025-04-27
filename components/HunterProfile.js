import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import GameContext from '../context/GameContext';

const HunterProfile = () => {
  const { user } = useContext(AuthContext);
  const { equippedItems } = useContext(GameContext);

  if (!user) return null;

  const getRankColor = () => {
    switch(user.rank) {
      case 'S': return 'text-purple-500';
      case 'A': return 'text-red-500';
      case 'B': return 'text-orange-500';
      case 'C': return 'text-yellow-500';
      case 'D': return 'text-green-500';
      case 'E': return 'text-blue-500';
      default: return 'text-white';
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <div className="flex items-start">
        <div className="mr-6">
          <img 
            src={`/images/hunters/${user.hunterClass.toLowerCase()}.jpg`} 
            alt={user.hunterName}
            className="w-40 h-40 rounded-full border-4 border-red-700"
          />
        </div>
        
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{user.hunterName}</h2>
          <p className="text-gray-400 mb-4">Level {user.level} <span className={getRankColor()}>{user.rank}-Rank Hunter</span></p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stats</h3>
              <ul className="space-y-1">
                <li>Strength: {user.stats?.strength || 0}</li>
                <li>Agility: {user.stats?.agility || 0}</li>
                <li>Stamina: {user.stats?.stamina || 0}</li>
                <li>Intelligence: {user.stats?.intelligence || 0}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Equipment</h3>
              <ul className="space-y-1">
                <li>Weapon: {equippedItems.weapon?.name || 'None'}</li>
                <li>Armor: {equippedItems.armor?.name || 'None'}</li>
                <li>Accessory: {equippedItems.accessory?.name || 'None'}</li>
              </ul>
            </div>
          </div>
          
          {user.shadowArmy && (
            <div className="mt-4 p-3 bg-gray-900 rounded border border-purple-700">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">Shadow Army Member</h3>
              <p>You serve the Shadow Monarch</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Hunter License</h3>
        <div className="bg-gray-900 p-4 rounded border border-red-700">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">{user.hunterName}</span>
            <span className={`px-2 py-1 rounded ${getRankColor()} bg-gray-800`}>
              {user.rank}-Rank
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p>Class: {user.hunterClass}</p>
              <p>Level: {user.level}</p>
            </div>
            <div>
              <p>Gates Cleared: 0</p>
              <p>Monsters Killed: 0</p>
            </div>
            <div>
              <p>Status: {user.isAlive ? 'Active' : 'Deceased'}</p>
              <p>Since: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HunterProfile;
