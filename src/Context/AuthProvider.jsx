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
          });
      } else {
        setUser(null);
      }
    });

    return () => unSubscribed();
  }, []);

  // sign out method
  const userSignOut = () => {
    return signOut(auth);
  };
  console.log(user);
  const userInfo = {
    name: "Aspin Chakma",
    creatingUser,
    setUser,
    signInUser,
    user,
    userSignOut,
  };
  console.log(user);
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
