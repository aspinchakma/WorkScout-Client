import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import DataProvider from "./Context/DataProvider";
import "./index.css";
import Route from "./Route/Route";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Sharing Authentication Data */}
    <AuthProvider>
      {/* Sharing Data */}
      <DataProvider>
        <RouterProvider router={Route} />
      </DataProvider>
    </AuthProvider>
  </StrictMode>
);
