import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import Route from "./Route/Route";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Route} />
  </StrictMode>
);
