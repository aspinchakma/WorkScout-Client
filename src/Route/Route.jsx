import { createBrowserRouter } from "react-router-dom";
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
    ],
  },
]);

export default Route;
