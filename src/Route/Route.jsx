import { createBrowserRouter } from "react-router-dom";
import AddCompany from "../Components/AddCompany";
import AddTask from "../Components/AddTask";
import AllTask from "../Components/AllTask";
import Companies from "../Components/Companies";
import CompanyDetails from "../Components/CompanyDetails";
import Home from "../Components/Home";
import JobDetails from "../Components/JobDetails";
import MyComapnies from "../Components/MyComapnies";
import MyPosts from "../Components/MyPosts";
import Profile from "../Components/Profile";
import SignIn from "../Components/SignIn";
import Signup from "../Components/Signup";
import Loading from "../Error&Spinner/Loading";
import MainLayOut from "../Layouts/MainLayOut";
import PrivateRoute from "./PrivateRoute";

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
        element: (
          <PrivateRoute>
            <AddCompany />
          </PrivateRoute>
        ),
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
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/mycompanies",
        element: (
          <PrivateRoute>
            <MyComapnies />
          </PrivateRoute>
        ),
      },
      {
        path: "addtask",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "alltask",
        element: (
          <PrivateRoute>
            <AllTask />
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:5000/jobs"),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/tasks/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "myposts",
        element: (
          <PrivateRoute>
            {" "}
            <MyPosts />
          </PrivateRoute>
        ),
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
