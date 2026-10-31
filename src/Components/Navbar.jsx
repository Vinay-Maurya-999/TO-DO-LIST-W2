import { useState } from "react";
import { CheckCheck, Search, CalendarDays, ListFilter, SlidersHorizontal } from "lucide-react";

function Navbar({ onSearch, onFilter, setaddTask }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleSearch = (value) => {
    setSearch(value);
    onSearch?.(value);
  };

  const handleFilter = (value) => {
    setFilter(value);
    onFilter?.(value);
  };

  return (
    <nav className="w-full border-b border-slate-200 bg-white px-4 py-5 text-slate-800 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        {/* Logo and Date */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2.5 text-white shadow-md shadow-indigo-200">
              <CheckCheck size={24} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                TaskFlow<span className="text-indigo-600">.</span>
              </h1>
              <p className="text-xs text-slate-500">Organize your day</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 sm:flex">
            <CalendarDays className="text-indigo-600" size={21} />
            <div>
              <p className="text-xs font-semibold text-slate-500">TODAY</p>
              <p className="text-sm font-medium text-slate-800">{today}</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100">
            <Search size={19} className="shrink-0 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search your tasks..."
              className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
            <ListFilter size={19} className="shrink-0 text-indigo-600" />

            <select
              value={filter}
              onChange={(e) => handleFilter(e.target.value)}
              className="w-full cursor-pointer bg-transparent py-3 text-sm font-medium text-slate-700 outline-none sm:w-36"
            >
              <option value="all">All Tasks</option>
              <option value="todo">To Do</option>
              <option value="in-progress">in-progress</option>
              <option value="completed">Completed</option>
            </select>

            <SlidersHorizontal size={18} className="shrink-0 text-slate-400" />
          </div>
          <button
            onClick={() => setaddTask("true")}
            className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            + Add Task
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
