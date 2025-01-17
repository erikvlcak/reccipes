/* eslint-disable react/prop-types */
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useSelectedIngredientContext } from "./ingredientsContext";

export default function Modal({ open, setOpen }) {
  const selectedIngredient = useSelectedIngredientContext();

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div>
              {selectedIngredient.map((item) => (
                <img className="mx-auto"
                  key={item.idIngredient}
                  src={`https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png`}
                  alt=""
                />
              ))}

              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  {selectedIngredient.map((item) => (
                    <h1 key={item.idIngredient}>{item.strIngredient}</h1>
                  ))}
                </DialogTitle>
                <div className="mt-2">
                  {selectedIngredient.map((item) => (
                    <p key={item.idIngredient} className="text-sm text-gray-500">
                      {item.strDescription || "Description not available"}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Return
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
