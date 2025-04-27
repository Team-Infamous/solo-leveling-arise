import { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [currentDungeon, setCurrentDungeon] = useState(null);
  const [inCombat, setInCombat] = useState(false);
  const [combatLog, setCombatLog] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [equippedItems, setEquippedItems] = useState({
    weapon: null,
    armor: null,
    accessory: null
  });
  const [shadowArmy, setShadowArmy] = useState([]);
  const [quests, setQuests] = useState([]);

  // Load game data
  useEffect(() => {
    if (user) {
      // Load inventory
      const savedInventory = JSON.parse(localStorage.getItem(`inventory-${user.email}`));
      if (savedInventory) setInventory(savedInventory);
      
      // Load equipped items
      const savedEquipped = JSON.parse(localStorage.getItem(`equipped-${user.email}`));
      if (savedEquipped) setEquippedItems(savedEquipped);
      
      // Load quests
      const savedQuests = JSON.parse(localStorage.getItem(`quests-${user.email}`));
      if (savedQuests) setQuests(savedQuests);
      
      // Load shadow army (for admin)
      if (user.role === 'admin') {
        const allUsers = JSON.parse(localStorage.getItem('solo-leveling-users')) || [];
        const shadows = allUsers.filter(u => u.shadowArmy);
        setShadowArmy(shadows);
      }
    }
  }, [user]);

  // Save game data
  useEffect(() => {
    if (user) {
      localStorage.setItem(`inventory-${user.email}`, JSON.stringify(inventory));
      localStorage.setItem(`equipped-${user.email}`, JSON.stringify(equippedItems));
      localStorage.setItem(`quests-${user.email}`, JSON.stringify(quests));
    }
  }, [inventory, equippedItems, quests, user]);

  // Combat functions
  const startCombat = (enemy) => {
    setInCombat(true);
    setCurrentDungeon(enemy.dungeon);
    addToCombatLog(`You encountered a ${enemy.name}!`);
  };

  const addToCombatLog = (message) => {
    setCombatLog(prev => [...prev, message]);
  };

  const endCombat = (victory) => {
    setInCombat(false);
    if (victory) {
      addToCombatLog('You defeated the enemy!');
      // Grant rewards
    } else {
      addToCombatLog('You were defeated...');
    }
  };

  // Inventory functions
  const addItem = (item) => {
    setInventory(prev => [...prev, item]);
  };

  const removeItem = (itemId) => {
    setInventory(prev => prev.filter(item => item.id !== itemId));
  };

  const equipItem = (item) => {
    setEquippedItems(prev => ({
      ...prev,
      [item.type]: item
    }));
  };

  // Quest functions
  const addQuest = (quest) => {
    setQuests(prev => [...prev, quest]);
  };

  const completeQuest = (questId) => {
    setQuests(prev => prev.map(q => 
      q.id === questId ? { ...q, completed: true } : q
    ));
  };

  // Shadow Army functions (admin only)
  const commandShadow = (shadowId, command) => {
    if (user?.role !== 'admin') return;
    // Implement shadow commands
  };

  return (
    <GameContext.Provider value={{
      currentDungeon,
      inCombat,
      combatLog,
      inventory,
      equippedItems,
      shadowArmy,
      quests,
      startCombat,
      endCombat,
      addToCombatLog,
      addItem,
      removeItem,
      equipItem,
      addQuest,
      completeQuest,
      commandShadow
    }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
