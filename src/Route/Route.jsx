import { createBrowserRouter } from "react-router-dom";
import AddCompany from "../Components/AddCompany";
import Companies from "../Components/Companies";
import Home from "../Components/Home";
import Loading from "../Error&Spinner/Loading";
import MainLayOut from "../Layouts/MainLayOut";

const Route = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/addcompany",
        Component: AddCompany,
      },
      {
        path: "/companies",
        Component: Companies,
        loader: () => fetch("http://localhost:5000/companies"),
        hydrateFallbackElement: <Loading />,
      },
    ],
  },
]);

export default Route;
