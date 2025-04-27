import { useContext } from 'react';
import GameContext from '../context/GameContext';
import { getShopItems } from '../utils/items';

const Shop = () => {
  const { user } = useContext(AuthContext);
  const { addItem } = useContext(GameContext);
  const [activeCategory, setActiveCategory] = useState('weapons');
  
  const shopItems = getShopItems(user.rank);
  const currentItems = shopItems[activeCategory];

  const buyItem = (item) => {
    // Check if player has enough gold
    if (user.gold >= item.price) {
      addItem(item);
      // Deduct gold
      // Update user gold in context
    } else {
      alert("Not enough gold!");
    }
  };

  return (
    <div className="shop-container bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Hunter Association Shop</h2>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveCategory('weapons')}
          className={`px-4 py-2 rounded ${activeCategory === 'weapons' ? 'bg-red-700' : 'bg-gray-700'}`}
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
          onClick={() => setActiveCategory('potions')}
          className={`px-4 py-2 rounded ${activeCategory === 'potions' ? 'bg-red-700' : 'bg-gray-700'}`}
        >
          Potions
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map(item => (
          <div key={item.id} className="shop-item bg-gray-900 p-4 rounded border border-gray-700">
            <img 
              src={`/images/items/${item.image}`} 
              alt={item.name}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-400 text-sm mb-2">
              {item.type === 'weapon' && `ATK: ${item.attack}`}
              {item.type === 'armor' && `DEF: ${item.defense}`}
              {item.type === 'potion' && Object.entries(item.effect).map(([stat, value]) => (
                <span key={stat}>{stat}: +{value} </span>
              ))}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-yellow-400">{item.price} Gold</span>
              <button
                onClick={() => buyItem(item)}
                className="px-3 py-1 bg-red-700 hover:bg-red-800 rounded text-sm"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
