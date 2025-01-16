import { GiMeal } from "react-icons/gi";
import { LuCookingPot } from "react-icons/lu";

export default function SearchBar() {
  return (
    <div>
      <label htmlFor="query" className="block text-sm/6 font-medium text-gray-900">
        Find recipe
      </label>
      <div className="mt-2 flex">
        <div className="-mr-px grid grow grid-cols-1 focus-within:relative">
          <input
            id="query"
            name="query"
            type="text"
            placeholder="I want to eat..."
            className="col-start-1 row-start-1 block w-full rounded-l-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
          />
          <GiMeal
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
          />
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 focus:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
          <LuCookingPot aria-hidden="true" className="-ml-0.5 size-4 text-gray-400" />
          Search
        </button>
      </div>
    </div>
  );
}
