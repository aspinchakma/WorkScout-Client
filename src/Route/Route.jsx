import { createBrowserRouter } from "react-router-dom";
import AddCompany from "../Components/AddCompany";
import Companies from "../Components/Companies";
import CompanyDetails from "../Components/CompanyDetails";
import Home from "../Components/Home";
import SignIn from "../Components/SignIn";
import Signup from "../Components/Signup";
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
      {
        path: "/companyDetails/:id",
        element: <CompanyDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/companyDetails/${params.id}`),
        hydrateFallbackElement: <Loading />,
      },
    ],
  },
  {
    path: "signup",
    Component: Signup,
  },
  {
    path: "signin",
    Component: SignIn,
  },
]);

export default Route;
