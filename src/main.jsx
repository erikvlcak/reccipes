import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import IngredientsContext from "./ingredientsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <IngredientsContext>
      <App />
    </IngredientsContext>
  </StrictMode>
);
