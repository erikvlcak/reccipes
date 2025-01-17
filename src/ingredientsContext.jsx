/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import fetchFood from "./utils";

const ingredientInfoContext = createContext();
const selectedIngredientContext = createContext();
const setSelectedIngredientContext = createContext();

export function useIngredientContext() {
  return useContext(ingredientInfoContext);
}
export function useSelectedIngredientContext() {
  return useContext(selectedIngredientContext);
}
export function useSetSelectedIngredientContext() {
  return useContext(setSelectedIngredientContext);
}

export default function IngredientsContext({ children }) {
  const [ingredientInfo, setIngredientInfo] = useState([]);
  const [selectedIngredientInfo, setSelectedIngredientInfo] = useState([]);

  async function fetchIngredientInfo() {
    //fetch all ingredients
    try {
      const response = await fetchFood("/list.php?i=list");
      const ingredientInfo = response.data.meals;
      setIngredientInfo(ingredientInfo);
    } catch (error) {
      console.error("Error fetching ingredients info:", error);
    }
  }

  useEffect(() => {
    fetchIngredientInfo();
  }, []);

  return (
    <ingredientInfoContext.Provider value={ingredientInfo}>
      <selectedIngredientContext.Provider value={selectedIngredientInfo}>
        <setSelectedIngredientContext.Provider value={setSelectedIngredientInfo}>
          {children}
        </setSelectedIngredientContext.Provider>
      </selectedIngredientContext.Provider>
    </ingredientInfoContext.Provider>
  );
}
