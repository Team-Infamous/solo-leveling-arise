import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import GameContext from '../context/GameContext';

const ShadowArmy = () => {
  const { user } = useContext(AuthContext);
  const { shadowArmy, commandShadow } = useContext(GameContext);

  const handleCommand = (shadowId, command) => {
    commandShadow(shadowId, command);
    // Show feedback to user
  };

  return (
    <div className="shadow-army bg-gray-800 p-6 rounded-lg border border-purple-700">
      <h2 className="text-2xl font-bold mb-6 text-purple-400">Shadow Army</h2>
      
      <div className="mb-6 p-4 bg-gray-900 rounded border border-purple-700">
        <h3 className="text-lg font-semibold mb-2">Army Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">{shadowArmy.length}</div>
            <div className="text-sm">Total Shadows</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">0</div>
            <div className="text-sm">In Combat</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">0</div>
            <div className="text-sm">On Missions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">0</div>
            <div className="text-sm">In Reserve</div>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">Your Shadows</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shadowArmy.length > 0 ? (
          shadowArmy.map(shadow => (
            <div key={shadow.email} className="shadow-card bg-gray-900 p-4 rounded border border-purple-700">
              <div className="flex items-center mb-3">
                <img 
                  src={`/images/hunters/${shadow.hunterClass.toLowerCase()}.jpg`} 
                  alt={shadow.hunterName}
                  className="w-12 h-12 rounded-full border border-purple-600 mr-3"
                />
                <div>
                  <h4 className="font-bold text-purple-300">{shadow.hunterName}</h4>
                  <p className="text-sm text-gray-400">
                    Lv. {shadow.level} {shadow.rank}-Rank {shadow.hunterClass}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleCommand(shadow.email, 'dungeon')}
                  className="py-1 px-2 bg-purple-800 hover:bg-purple-700 rounded text-sm"
                >
                  Send to Dungeon
                </button>
                <button
                  onClick={() => handleCommand(shadow.email, 'guard')}
                  className="py-1 px-2 bg-purple-800 hover:bg-purple-700 rounded text-sm"
                >
                  Set as Guard
                </button>
                <button
                  onClick={() => handleCommand(shadow.email, 'extract')}
                  className="py-1 px-2 bg-purple-800 hover:bg-purple-700 rounded text-sm"
                >
                  Extract Shadows
                </button>
                <button
                  onClick={() => handleCommand(shadow.email, 'release')}
                  className="py-1 px-2 bg-red-900 hover:bg-red-800 rounded text-sm"
                >
                  Release
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            <p>Your shadow army is empty</p>
            <p className="mt-2">Use "Arise" on defeated hunters to add them to your army</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShadowArmy;
