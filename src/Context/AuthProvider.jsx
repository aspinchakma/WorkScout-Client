import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase.init";
import AuthContext from "./AuthContex";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // creating user by email and  password
  const creatingUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userInfo = {
    name: "Aspin Chakma",
    creatingUser,
    setUser,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
