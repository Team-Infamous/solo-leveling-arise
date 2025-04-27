import { useState, useContext } from 'react';
import GameContext from '../context/GameContext';
import CombatSystem from './CombatSystem';

const Dungeon = ({ dungeon }) => {
  const { startCombat, inCombat, combatLog } = useContext(GameContext);
  const [currentRoom, setCurrentRoom] = useState(0);
  const [enemiesDefeated, setEnemiesDefeated] = useState(0);

  const rooms = dungeon.rooms;
  const currentEnemy = rooms[currentRoom]?.enemy;

  const handleNextRoom = () => {
    if (currentRoom < rooms.length - 1) {
      setCurrentRoom(currentRoom + 1);
    } else {
      // Dungeon completed
      // Grant rewards
    }
  };

  const handleEnterCombat = () => {
    startCombat({
      ...currentEnemy,
      dungeon: dungeon.id
    });
  };

  return (
    <div className="dungeon-container bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">{dungeon.name}</h2>
      <p className="mb-6">{dungeon.description}</p>
      
      {inCombat && currentEnemy ? (
        <CombatSystem enemy={currentEnemy} />
      ) : (
        <div className="room-content">
          <h3 className="text-xl font-semibold mb-2">Room {currentRoom + 1} of {rooms.length}</h3>
          
          {currentEnemy ? (
            <div className="enemy-encounter bg-gray-900 p-4 rounded border border-red-700 mb-6">
              <div className="flex items-center">
                <img 
                  src={`/images/monsters/${currentEnemy.image}`} 
                  alt={currentEnemy.name}
                  className="w-24 h-24 mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold">{currentEnemy.name}</h4>
                  <p>Level: {currentEnemy.level}</p>
                  <p>Type: {currentEnemy.type}</p>
                </div>
              </div>
              
              <button 
                onClick={handleEnterCombat}
                className="mt-4 w-full py-2 bg-red-700 hover:bg-red-800 rounded"
              >
                Engage Combat
              </button>
            </div>
          ) : (
            <div className="room-empty bg-gray-900 p-4 rounded border border-green-700 mb-6">
              <p>This room is empty. You can proceed to the next room.</p>
              <button 
                onClick={handleNextRoom}
                className="mt-4 w-full py-2 bg-green-700 hover:bg-green-800 rounded"
              >
                Continue to Next Room
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="dungeon-progress mt-6">
        <div className="flex justify-between mb-2">
          <span>Progress</span>
          <span>Room {currentRoom + 1} of {rooms.length}</span>
        </div>
        <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
          <div 
            className="bg-red-600 h-full" 
            style={{ width: `${((currentRoom) / rooms.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Dungeon;
