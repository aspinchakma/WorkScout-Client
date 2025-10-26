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

  const [currentEmail, setCurrentEmail] = useState("");

  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        console.log("inside observer", user);
        setCurrentEmail(user.email);
      } else {
        setCurrentEmail("");
        setUser(null);
        setLoading(false);
      }
    });
    return () => unSubscribed();
  }, []);

  // get all users information
  useEffect(() => {
    if (currentEmail) {
      fetch(`http://localhost:5000/users`)
        .then((res) => res.json())
        .then((data) => {
          // setUser(data);
          const finalIzeUser = data.find((usr) => usr.email === currentEmail);
          if (finalIzeUser) {
            setUser(finalIzeUser);
          } else {
            setUser(null);
          }
          // stop loading
          setLoading(false);
        });
    }
  }, [currentEmail]); // currentEmail চেঞ্জ হলে fetch হবে

  console.log(user);
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
