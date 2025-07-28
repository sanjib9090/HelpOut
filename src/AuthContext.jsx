import React, { createContext, useState, useEffect } from 'react';
import { auth, db, googleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigateTo }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken(true);
          console.log('Sending ID Token to backend:', idToken.substring(0, 50) + '...');
          const response = await axios.post('http://localhost:5000/auth-status', { token: idToken });
          const userData = response.data;

          // Fetch additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser({ ...userData, ...userDoc.data() });
          } else {
            setUser(userData);
          }
          setAuthError(null);

          // Check membership
          const membershipRes = await axios.get('http://localhost:5000/membership');
          if (!membershipRes.data.isMember) {
            navigateTo('complete-profile');
          } else {
            navigateTo('home');
          }
        } catch (error) {
          console.error('Session error:', error);
          setAuthError('Authentication failed. Please try again.');
          if (error.response?.status === 401) {
            await signOut(auth);
            console.log('Invalid session - signed out. Please sign in again.');
            navigateTo('auth');
          }
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigateTo]);

  const signInWithGoogle = async (role) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const userRef = doc(db, 'users', firebaseUser.uid);
      await setDoc(userRef, { role }, { merge: true });
      setAuthError(null);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setAuthError('Sign-in failed: ' + error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await axios.post('http://localhost:5000/logout');
      setUser(null);
      setAuthError(null);
    } catch (error) {
      console.error('Logout Error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, authError, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
