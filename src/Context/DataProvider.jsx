import { use, useEffect, useState } from "react";
import AuthContext from "./AuthContex";
import DataContextl from "./DataContextl";

const DataProvider = ({ children }) => {
  const user = use(AuthContext)?.user;
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/selectedCompanies/${user?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      });
  }, [user?._id]);
  const storedData = {
    companies,
    setCompanies,
  };
  return (
    <DataContextl.Provider value={storedData}>{children}</DataContextl.Provider>
  );
};

export default DataProvider;
