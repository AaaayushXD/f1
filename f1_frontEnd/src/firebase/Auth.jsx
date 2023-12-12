import { auth } from "./base";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  deleteUser,
  linkWithCredential,
  signInWithCredential,
} from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const signUpWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    return await signInWithPopup(auth, provider);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const removeAcc = () => {
    return deleteUser(currentUser);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUpWithEmail,
    loginWithEmail,
    signInWithGoogle,
    signInWithGithub,
    logOut,
    removeAcc,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
