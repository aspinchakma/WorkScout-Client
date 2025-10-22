import { createBrowserRouter } from "react-router-dom";
import AddCompany from "../Components/AddCompany";
import Home from "../Components/Home";
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
    ],
  },
]);

export default Route;
