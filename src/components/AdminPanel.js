import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

const AdminPanel = () => {
  const { user, banUser, unbanUser, killHunter, addToShadowArmy, bannedUsers } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      const users = JSON.parse(localStorage.getItem('solo-leveling-users')) || [];
      setAllUsers(users);
    }
  }, [user]);

  const filteredUsers = allUsers.filter(u => 
    u.email.includes(searchTerm) || 
    u.hunterName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserAction = (action) => {
    if (!selectedUser) return;
    
    switch(action) {
      case 'ban':
        banUser(selectedUser.email);
        setActionMessage(`Banned ${selectedUser.hunterName}`);
        break;
      case 'unban':
        unbanUser(selectedUser.email);
        setActionMessage(`Unbanned ${selectedUser.hunterName}`);
        break;
      case 'kill':
        killHunter(selectedUser.email);
        setActionMessage(`Killed ${selectedUser.hunterName} (permanent ban)`);
        break;
      case 'shadow':
        addToShadowArmy(selectedUser.email);
        setActionMessage(`Added ${selectedUser.hunterName} to Shadow Army`);
        break;
      default:
        break;
    }
    
    // Refresh users
    const updatedUsers = JSON.parse(localStorage.getItem('solo-leveling-users')) || [];
    setAllUsers(updatedUsers);
    setTimeout(() => setActionMessage(''), 3000);
  };

  if (user?.role !== 'admin') {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-red-700 text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p>Only the Shadow Monarch can access this panel.</p>
      </div>
    );
  }

  return (
    <div className="admin-panel bg-gray-800 p-6 rounded-lg border border-purple-700">
      <h2 className="text-2xl font-bold mb-6 text-purple-400">Shadow Monarch's Panel</h2>
      
      {actionMessage && (
        <div className="mb-4 p-2 bg-gray-900 rounded border border-purple-700">
          {actionMessage}
        </div>
      )}
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search hunters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">All Hunters</h3>
          <div className="user-list bg-gray-900 rounded border border-gray-700 max-h-96 overflow-y-auto">
            {filteredUsers.map(u => (
              <div 
                key={u.email}
                onClick={() => setSelectedUser(u)}
                className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-800 ${
                  selectedUser?.email === u.email ? 'bg-gray-800' : ''
                } ${
                  !u.isAlive ? 'text-red-500' : u.shadowArmy ? 'text-purple-400' : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{u.hunterName}</span>
                  <span className="text-sm">{u.rank}-Rank</span>
                </div>
                <div className="text-sm text-gray-400">{u.email}</div>
                {!u.isAlive && <div className="text-xs text-red-500">DECEASED</div>}
                {u.shadowArmy && <div className="text-xs text-purple-400">SHADOW ARMY</div>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-2">
          {selectedUser ? (
            <div className="user-details bg-gray-900 p-4 rounded border border-gray-700">
              <div className="flex items-start mb-4">
                <img 
                  src={`/images/hunters/${selectedUser.hunterClass.toLowerCase()}.jpg`} 
                  alt={selectedUser.hunterName}
                  className="w-20 h-20 rounded-full border border-gray-600 mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold">{selectedUser.hunterName}</h3>
                  <p className="text-gray-400">
                    Level {selectedUser.level} {selectedUser.rank}-Rank {selectedUser.hunterClass}
                  </p>
                  <p className="text-sm">
                    Status: {selectedUser.isAlive ? 
                      <span className="text-green-500">Active</span> : 
                      <span className="text-red-500">Deceased</span>
                    }
                    {selectedUser.shadowArmy && <span className="text-purple-500 ml-2">(Shadow Army)</span>}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">Stats</h4>
                  <ul className="space-y-1">
                    <li>STR: {selectedUser.stats?.strength || 0}</li>
                    <li>AGI: {selectedUser.stats?.agility || 0}</li>
                    <li>STA: {selectedUser.stats?.stamina || 0}</li>
                    <li>INT: {selectedUser.stats?.intelligence || 0}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Details</h4>
                  <ul className="space-y-1">
                    <li>Email: {selectedUser.email}</li>
                    <li>Created: {new Date(selectedUser.createdAt).toLocaleDateString()}</li>
                    <li>Banned: {bannedUsers.includes(selectedUser.email) ? 'Yes' : 'No'}</li>
                  </ul>
                </div>
              </div>
              
              <div className="action-buttons grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  onClick={() => handleUserAction('ban')}
                  disabled={bannedUsers.includes(selectedUser.email)}
                  className={`py-2 px-3 rounded text-sm ${
                    bannedUsers.includes(selectedUser.email) ? 
                    'bg-gray-700 cursor-not-allowed' : 
                    'bg-red-900 hover:bg-red-800'
                  }`}
                >
                  Ban
                </button>
                <button
                  onClick={() => handleUserAction('unban')}
                  disabled={!bannedUsers.includes(selectedUser.email)}
                  className={`py-2 px-3 rounded text-sm ${
                    !bannedUsers.includes(selectedUser.email) ? 
                    'bg-gray-700 cursor-not-allowed' : 
                    'bg-green-900 hover:bg-green-800'
                  }`}
                >
                  Unban
                </button>
                <button
                  onClick={() => handleUserAction('kill')}
                  disabled={!selectedUser.isAlive}
                  className={`py-2 px-3 rounded text-sm ${
                    !selectedUser.isAlive ? 
                    'bg-gray-700 cursor-not-allowed' : 
                    'bg-red-700 hover:bg-red-600'
                  }`}
                >
                  Kill Hunter
                </button>
                <button
                  onClick={() => handleUserAction('shadow')}
                  disabled={selectedUser.shadowArmy}
                  className={`py-2 px-3 rounded text-sm ${
                    selectedUser.shadowArmy ? 
                    'bg-gray-700 cursor-not-allowed' : 
                    'bg-purple-900 hover:bg-purple-800'
                  }`}
                >
                  Add to Shadows
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Select a hunter to view details and perform actions
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
