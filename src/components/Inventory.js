import { useContext, useState } from 'react';
import GameContext from '../context/GameContext';

const Inventory = () => {
  const { inventory, equippedItems, equipItem, removeItem } = useContext(GameContext);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredItems = inventory.filter(item => 
    activeCategory === 'all' || item.type === activeCategory
  );

  return (
    <div className="inventory-container bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Hunter Inventory</h2>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded ${activeCategory === 'all' ? 'bg-red-700' : 'bg-gray-700'}`}
        >
          All Items
        </button>
        <button
          onClick={() => setActiveCategory('weapon')}
          className={`px-4 py-2 rounded ${activeCategory === 'weapon' ? 'bg-red-700' : 'bg-gray-700'}`}
        >
          Weapons
        </button>
        <button
          onClick={() => setActiveCategory('armor')}
          className={`px-4 py-2 rounded ${activeCategory === 'armor' ? 'bg-red-700' : 'bg-gray-700'}`}
        >
          Armor
        </button>
        <button
          onClick={() => setActiveCategory('potion')}
          className={`px-4 py-2 rounded ${activeCategory === 'potion' ? 'bg-red-700' : 'bg-gray-700'}`}
        >
          Potions
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Equipped Items</h3>
          <div className="equipped-items bg-gray-900 p-4 rounded border border-gray-700">
            <div className="mb-3">
              <h4 className="font-medium mb-1">Weapon</h4>
              {equippedItems.weapon ? (
                <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                  <span>{equippedItems.weapon.name}</span>
                  <button 
                    onClick={() => equipItem({ type: 'weapon', item: null })}
                    className="text-xs bg-gray-700 px-2 py-1 rounded"
                  >
                    Unequip
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No weapon equipped</p>
              )}
            </div>
            
            <div className="mb-3">
              <h4 className="font-medium mb-1">Armor</h4>
              {equippedItems.armor ? (
                <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                  <span>{equippedItems.armor.name}</span>
                  <button 
                    onClick={() => equipItem({ type: 'armor', item: null })}
                    className="text-xs bg-gray-700 px-2 py-1 rounded"
                  >
                    Unequip
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No armor equipped</p>
              )}
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Accessory</h4>
              {equippedItems.accessory ? (
                <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                  <span>{equippedItems.accessory.name}</span>
                  <button 
                    onClick={() => equipItem({ type: 'accessory', item: null })}
                    className="text-xs bg-gray-700 px-2 py-1 rounded"
                  >
                    Unequip
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No accessory equipped</p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Inventory ({filteredItems.length})</h3>
          <div className="inventory-items bg-gray-900 p-4 rounded border border-gray-700 max-h-96 overflow-y-auto">
            {filteredItems.length > 0 ? (
              <div className="space-y-2">
                {filteredItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs text-gray-400 ml-2">
                        {item.type === 'weapon' && `ATK: ${item.attack}`}
                        {item.type === 'armor' && `DEF: ${item.defense}`}
                        {item.type === 'potion' && Object.entries(item.effect).map(([stat, value]) => (
                          <span key={stat}>{stat}: +{value} </span>
                        ))}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {(item.type === 'weapon' || item.type === 'armor') && (
                        <button
                          onClick={() => equipItem({ type: item.type, item })}
                          className="text-xs bg-blue-700 px-2 py-1 rounded"
                        >
                          Equip
                        </button>
                      )}
                      {item.type === 'potion' && (
                        <button
                          onClick={() => {
                            // Apply potion effect
                            removeItem(item.id);
                          }}
                          className="text-xs bg-green-700 px-2 py-1 rounded"
                        >
                          Use
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm(`Discard ${item.name}?`)) {
                            removeItem(item.id);
                          }
                        }}
                        className="text-xs bg-red-700 px-2 py-1 rounded"
                      >
                        Discard
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Your inventory is empty</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
