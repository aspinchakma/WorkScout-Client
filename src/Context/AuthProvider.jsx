import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import AuthContext from "./AuthContex";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  // creating user by email and  password
  const creatingUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // observer
  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        // get data from database
        const userEmail = user.email;
        fetch(`http://localhost:5000/user/${userEmail}`)
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unSubscribed();
  }, []);

  // sign out method
  const userSignOut = () => {
    return signOut(auth);
  };
  const userInfo = {
    name: "Aspin Chakma",
    creatingUser,
    setUser,
    signInUser,
    user,
    userSignOut,
    isLoading,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
