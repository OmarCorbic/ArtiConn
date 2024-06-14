import { useState } from "react";
import { FiSearch } from "react-icons/fi";
const Sidebar = ({ updateQueryArgs }: { updateQueryArgs: any }) => {
  const [checkedCategories, setCheckedCategories] = useState<any>({});
  const [search, setSearch] = useState("");
  // Function to handle checkbox change
  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;
    setCheckedCategories({
      ...checkedCategories,
      [name]: checked,
    });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const categories = Object.entries(checkedCategories)
      .map(([name, checked]: any) => {
        if (checked === true) {
          return name;
        }
      })
      .filter((item) => item);
    updateQueryArgs({ search, categories });
  };

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const resetFilters = () => {
    setSearch("");
    setCheckedCategories({});
  };

  const categories = [
    "Electricity",
    "Plumbing",
    "Renovating",
    "Moving",
    "School work",
    "Gardening",
    "Cleaning",
    "Mechanic",
  ];

  return (
    <div className="h-full absolute z-[9999] bg-white border-r ">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3 py-3">
        <div className="flex  py-2 items-center gap-2 px-2">
          <input
            value={search}
            type="text"
            onChange={handleSearchChange}
            placeholder="Search for jobs..."
            className="w-full px-2 py-1 outline-none border"
          />
          <FiSearch color="gray" size={20} />
        </div>
        <div className="grid grid-cols-2 grid-rows-4 gap-3 px-2 items-center">
          {categories.map((category: string, i: number) => {
            return (
              <label key={i}>
                <input
                  className="mr-1"
                  type="checkbox"
                  name={category}
                  checked={checkedCategories[category] || false}
                  onChange={handleCheckboxChange}
                />
                {category}
              </label>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            className="bg-blue-400 px-2 py-1 rounded-sm text-white"
            type="submit"
          >
            Apply filters
          </button>
          <button
            onClick={resetFilters}
            className="bg-blue-400 px-2 py-1 rounded-sm text-white"
            type="button"
          >
            Reset filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
