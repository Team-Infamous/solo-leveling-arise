import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import GameContext from '../context/GameContext';
import CombatSystem from './CombatSystem';

const PvPArena = () => {
  const { user } = useContext(AuthContext);
  const { inCombat, startCombat, endCombat } = useContext(GameContext);
  const [opponents, setOpponents] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [challengeSent, setChallengeSent] = useState(false);

  // Fetch available opponents (in a real app, this would come from backend)
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('solo-leveling-users')) || [];
    const availableOpponents = users
      .filter(u => u.email !== user.email && u.isAlive)
      .slice(0, 5);
    setOpponents(availableOpponents);
  }, [user]);

  const challengeOpponent = (opponent) => {
    setSelectedOpponent(opponent);
    setChallengeSent(true);
    // In a real app, this would send a notification to the opponent
    setTimeout(() => {
      setChallengeSent(false);
      startCombat({
        name: opponent.hunterName,
        level: opponent.level,
        health: 100,
        attack: 20,
        defense: 10,
        isPlayer: true
      });
    }, 2000);
  };

  if (inCombat) {
    return (
      <div className="pvp-combat">
        <CombatSystem />
      </div>
    );
  }

  return (
    <div className="pvp-arena bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Hunter PvP Arena</h2>
      
      {challengeSent ? (
        <div className="text-center py-8">
          <p>Challenge sent to {selectedOpponent.hunterName}...</p>
          <p>Waiting for response</p>
        </div>
      ) : (
        <div>
          <div className="mb-6 p-4 bg-gray-900 rounded border border-red-700">
            <h3 className="text-lg font-semibold mb-2">Arena Rules</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>No healing items allowed during combat</li>
              <li>Death results in permanent account deletion</li>
              <li>Winner gains 50% of loser's gold</li>
              <li>No rank restrictions</li>
            </ul>
          </div>
          
          <h3 className="text-xl font-semibold mb-4">Available Hunters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {opponents.map(opponent => (
              <div key={opponent.email} className="opponent-card bg-gray-900 p-4 rounded border border-gray-700">
                <div className="flex items-center mb-3">
                  <img 
                    src={`/images/hunters/${opponent.hunterClass.toLowerCase()}.jpg`} 
                    alt={opponent.hunterName}
                    className="w-12 h-12 rounded-full border border-gray-600 mr-3"
                  />
                  <div>
                    <h4 className="font-bold">{opponent.hunterName}</h4>
                    <p className="text-sm text-gray-400">
                      Lv. {opponent.level} {opponent.rank}-Rank {opponent.hunterClass}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span>Wins: 0</span>
                  <span>Losses: 0</span>
                </div>
                <button
                  onClick={() => challengeOpponent(opponent)}
                  className="w-full py-2 bg-red-700 hover:bg-red-800 rounded"
                >
                  Challenge
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PvPArena;
