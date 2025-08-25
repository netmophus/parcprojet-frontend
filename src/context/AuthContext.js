import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Vérifie le token au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
      const decoded = jwtDecode(token);

        setUser({
          _id: decoded.id,
          role: decoded.role || 'admin', // ajuste si tu stockes le rôle dans le token
        });
      } catch (error) {
        console.error('Token invalide ou expiré');
        setUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
