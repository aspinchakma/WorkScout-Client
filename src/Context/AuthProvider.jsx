import AuthContext from "./AuthContex";

const AuthProvider = ({ children }) => {
  const userInfo = {
    name: "Aspin Chakma",
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
