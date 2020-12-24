import { createContext, useState } from 'react';

const useProviderAuth = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([])

  const signIn = async (userInfo) => {
    try {
      const response = await fetch(`${process.env.API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userInfo }),
      });
      const data = await response.json();
      if (data.token) {
        sessionStorage.setItem('token', data.token)
        setUser(data.results[0])
        setUsers(data.results)
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };
  const signOut = () => {};

  return {
    user,
    users,
    signIn,
    signOut,
  };
};

export const AuthContext = createContext();

export const ProviderAuth = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
