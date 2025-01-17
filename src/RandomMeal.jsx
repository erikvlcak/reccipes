/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import fetchFood from "./utils";
import "ldrs/ring";
import { BsQuestionCircle } from "react-icons/bs";
import Modal from "./Modal";
import { useIngredientContext, useSelectedIngredientContext, useSetSelectedIngredientContext } from "./ingredientsContext";

export default function RandomMeal() {
  //random meal
  const [randomMeal, setRandomMeal] = useState({});
  const [mealComponents, setMealComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const selectedIngredient = useSelectedIngredientContext();
  const setSelectedIngredient = useSetSelectedIngredientContext();
  const ingredientInfo = useIngredientContext();

  async function fetchRandomMeal() {
    setIsLoading(true);
    try {
      const response = await fetchFood("/random.php");
      const meal = response.data.meals[0];
      setRandomMeal(meal);
      const components = getMealComponents(meal);
      setMealComponents(components);
    } catch (error) {
      console.error("Error fetching random meal:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleIngredientInfo(clickedIngredient) {
    setSelectedIngredient(() => ingredientInfo.filter((f) => f.strIngredient == clickedIngredient));
    console.log(selectedIngredient);
  }

  useEffect(() => {
    fetchRandomMeal();
  }, []);
 
  function getMealComponents(randomMeal) {
    const ingredients = [];
    const measures = [];
    const mealComponents = [];

    for (let key in randomMeal) {
      if (key.startsWith("strIngredient") && randomMeal[key]) {
        ingredients.push(randomMeal[key]);
      }
      if (key.startsWith("strMeasure") && randomMeal[key]) {
        measures.push(randomMeal[key]);
      }
    }

    for (let i = 0; i < ingredients.length; i++) {
      mealComponents.push({ id: i, ingredient: ingredients[i], measure: measures[i] });
    }
    return mealComponents;
  }

  if (isLoading) {
    return <l-ring size={100}></l-ring>;
  } else {
    return (
      <div className="bg-white mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Modal open={open} setOpen={setOpen} />
        <section aria-labelledby="features-heading" className="relative">
          <img
            alt="Black leather journal with silver steel disc binding resting on wooden shelf with machined steel pen."
            src={randomMeal.strMealThumb}
            className="aspect-[3/2] w-full object-cover sm:aspect-[5/2] lg:absolute lg:aspect-auto lg:h-full lg:w-1/2 lg:pr-4 xl:pr-16"
          />

          <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-32">
            <div className="lg:col-start-2">
              <h2 id="features-heading" className="font-medium text-gray-500">
                Cuisine: {randomMeal.strArea}
              </h2>
              <p className="mt-4 text-4xl font-bold tracking-tight text-gray-900">{randomMeal.strMeal}</p>
              <p className="mt-4 text-gray-500">{randomMeal.strInstructions}</p>

              <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 text-sm sm:grid-cols-2">
                {mealComponents.map((item) => (
                  <div key={item.id}>
                    <dd className="font-medium text-gray-900 flex items-center">
                      {item.ingredient} {"   "}
                      <BsQuestionCircle
                        className="ml-1 hover:cursor-pointer"
                        onClick={() => {
                          handleIngredientInfo(item.ingredient);
                          console.log(item.ingredient);
                          setOpen(!open);
                        }}
                      />
                    </dd>

                    <dd className="mt-2 text-gray-500">{item.measure}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
