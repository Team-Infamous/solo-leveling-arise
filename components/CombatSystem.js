import { useState, useEffect, useContext } from 'react';
import GameContext from '../context/GameContext';

const CombatSystem = ({ enemy }) => {
  const { user } = useContext(AuthContext);
  const { inCombat, combatLog, addToCombatLog, endCombat } = useContext(GameContext);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(enemy.health);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  useEffect(() => {
    if (!inCombat) return;
    
    if (!isPlayerTurn) {
      // Enemy attack
      const timer = setTimeout(() => {
        const damage = Math.floor(Math.random() * 10) + 5;
        setPlayerHealth(prev => Math.max(0, prev - damage));
        addToCombatLog(`${enemy.name} attacks you for ${damage} damage!`);
        setIsPlayerTurn(true);
        
        if (playerHealth - damage <= 0) {
          endCombat(false);
          // Handle player death
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, inCombat, playerHealth]);

  const attack = () => {
    if (!isPlayerTurn) return;
    
    const damage = Math.floor(Math.random() * 15) + 10;
    setEnemyHealth(prev => Math.max(0, prev - damage));
    addToCombatLog(`You attack ${enemy.name} for ${damage} damage!`);
    setIsPlayerTurn(false);
    
    if (enemyHealth - damage <= 0) {
      endCombat(true);
      // Grant rewards
    }
  };

  const useSkill = (skill) => {
    if (!isPlayerTurn) return;
    
    // Implement skill logic
    addToCombatLog(`You use ${skill.name}!`);
    setIsPlayerTurn(false);
  };

  const flee = () => {
    if (Math.random() > 0.7) {
      addToCombatLog("You failed to flee!");
      setIsPlayerTurn(false);
    } else {
      addToCombatLog("You successfully fled from battle!");
      endCombat(false);
    }
  };

  return (
    <div className="combat-container bg-gray-900 p-6 rounded-lg border border-red-700">
      <div className="combat-status flex justify-between mb-6">
        <div className="player-status text-center">
          <h3 className="text-xl font-bold">{user.hunterName}</h3>
          <div className="health-bar bg-gray-700 h-6 rounded-full mt-2 overflow-hidden">
            <div 
              className="health-fill bg-red-600 h-full" 
              style={{ width: `${playerHealth}%` }}
            ></div>
          </div>
          <p>{playerHealth}% HP</p>
        </div>
        
        <div className="vs-text flex items-center px-4">
          <span className="text-2xl font-bold">VS</span>
        </div>
        
        <div className="enemy-status text-center">
          <h3 className="text-xl font-bold">{enemy.name}</h3>
          <div className="health-bar bg-gray-700 h-6 rounded-full mt-2 overflow-hidden">
            <div 
              className="health-fill bg-red-600 h-full" 
              style={{ width: `${enemyHealth}%` }}
            ></div>
          </div>
          <p>{enemyHealth}% HP</p>
        </div>
      </div>
      
      <div className="combat-log bg-black p-4 h-40 overflow-y-auto mb-6 rounded border border-gray-700">
        {combatLog.map((log, index) => (
          <p key={index} className="mb-1">{log}</p>
        ))}
      </div>
      
      <div className="combat-actions">
        <h3 className="text-lg font-semibold mb-2">Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={attack}
            disabled={!isPlayerTurn}
            className={`py-2 px-4 rounded ${isPlayerTurn ? 'bg-red-700 hover:bg-red-800' : 'bg-gray-700 cursor-not-allowed'}`}
          >
            Attack
          </button>
          <button 
            onClick={flee}
            className="py-2 px-4 rounded bg-gray-700 hover:bg-gray-600"
          >
            Flee
          </button>
        </div>
      </div>
    </div>
  );
};

export default CombatSystem;
