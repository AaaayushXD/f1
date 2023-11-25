import { auth } from "./base";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activateLoading,
  deactivateLoading,
  selectLoading,
} from "../functions/LoadingSlice";
import { PacManLoader } from "../loading/LoadingComponent";
import { useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
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
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    dispatch(activateLoading());
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      dispatch(deactivateLoading());
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUpWithEmail,
    loginWithEmail,
    signInWithGoogle,
    logOut,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
