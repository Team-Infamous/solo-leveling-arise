import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_EMAIL = "lord_izana@yahoo.com";
const ADMIN_PASSWORD = "hasnainkk-07";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bannedUsers, setBannedUsers] = useState([]);

  useEffect(() => {
    // Check localStorage for saved user
    const savedUser = JSON.parse(localStorage.getItem('solo-leveling-user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (email, password) => {
    // Check if user is banned
    if (bannedUsers.includes(email)) {
      throw new Error("This account has been permanently banned.");
    }

    // Hardcoded admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        email: ADMIN_EMAIL,
        name: "Sung Jinwoo",
        role: "admin",
        hunterName: "Shadow Monarch",
        level: 999,
        rank: "S",
        shadowArmy: true
      };
      setUser(adminUser);
      localStorage.setItem('solo-leveling-user', JSON.stringify(adminUser));
      return;
    }

    // Normal user login
    const users = JSON.parse(localStorage.getItem('solo-leveling-users')) || [];
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('solo-leveling-user', JSON.stringify(foundUser));
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const register = (email, password, hunterName, hunterClass) => {
    // Check if email is already registered
    const users = JSON.parse(localStorage.getItem('solo-leveling-users')) || [];
    if (users.some(u => u.email === email)) {
      throw new Error("Email already registered");
    }

    const newUser = {
      email,
      password,
      hunterName,
      hunterClass,
      level: 1,
      rank: "E",
      exp: 0,
      stats: {
        strength: 10,
        agility: 10,
        stamina: 10,
        intelligence: 10
      },
      inventory: [],
      skills: [],
      shadowArmy: false,
      isAlive: true,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('solo-leveling-users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('solo-leveling-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('solo-leveling-user');
  };

  // Admin functions
  const banUser = (email) => {
    if (user?.email !== ADMIN_EMAIL) return;
    setBannedUsers([...bannedUsers, email]);
  };

  const unbanUser = (email) => {
    if (user?.email !== ADMIN_EMAIL) return;
    setBannedUsers(bannedUsers.filter(e => e !== email));
  };

  const killHunter = (email) => {
    if (user?.email !== ADMIN_EMAIL) return;
    banUser(email);
    // Update user data to mark as dead
    const users = JSON.parse(localStorage.getItem('solo-leveling-users')) || [];
    const updatedUsers = users.map(u => {
      if (u.email === email) {
        return { ...u, isAlive: false };
      }
      return u;
    });
    localStorage.setItem('solo-leveling-users', JSON.stringify(updatedUsers));
  };

  const addToShadowArmy = (email) => {
    if (user?.email !== ADMIN_EMAIL) return;
    const users = JSON.parse(localStorage.getItem('solo-leveling-users')) || [];
    const updatedUsers = users.map(u => {
      if (u.email === email) {
        return { ...u, shadowArmy: true };
      }
      return u;
    });
    localStorage.setItem('solo-leveling-users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      banUser,
      unbanUser,
      killHunter,
      addToShadowArmy,
      bannedUsers
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
