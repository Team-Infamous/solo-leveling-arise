import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../context/AuthContext';
import GameContext from '../../context/GameContext';
import Navbar from '../../components/Navbar';
import Dungeon from '../../components/Dungeon';
import CombatSystem from '../../components/CombatSystem';
import Shop from '../../components/Shop';
import Inventory from '../../components/Inventory';
import PvPArena from '../../components/PvPArena';
import ShadowArmy from '../../components/ShadowArmy';
import { dungeons } from '../../utils/monsters';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const { inCombat, currentDungeon, combatLog } = useContext(GameContext);
  const [activeTab, setActiveTab] = useState('dungeons');
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dungeons':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Available Dungeons</h2>
            {dungeons
              .filter(d => d.recommendedRank <= user.rank)
              .map(dungeon => (
                <Dungeon key={dungeon.id} dungeon={dungeon} />
              ))}
          </div>
        );
      case 'shop':
        return <Shop />;
      case 'inventory':
        return <Inventory />;
      case 'pvp':
        return <PvPArena />;
      case 'shadow':
        return user.role === 'admin' ? <ShadowArmy /> : (
          <div className="text-center py-8">
            <p>Only the Shadow Monarch can command the army</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Hunter Dashboard</h1>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-red-900 rounded-full text-sm">
              {user.rank}-Rank
            </span>
            <span className="px-3 py-1 bg-blue-900 rounded-full text-sm">
              Lv. {user.level}
            </span>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dungeons')}
            className={`px-4 py-2 font-medium ${activeTab === 'dungeons' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
          >
            Dungeons
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-4 py-2 font-medium ${activeTab === 'shop' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
          >
            Shop
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 font-medium ${activeTab === 'inventory' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('pvp')}
            className={`px-4 py-2 font-medium ${activeTab === 'pvp' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
          >
            PvP Arena
          </button>
          <button
            onClick={() => setActiveTab('shadow')}
            className={`px-4 py-2 font-medium ${activeTab === 'shadow' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
          >
            Shadow Army
          </button>
        </div>

        {inCombat ? (
          <div className="combat-screen">
            <CombatSystem />
          </div>
        ) : (
          <div className="dashboard-content">
            {renderTabContent()}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
