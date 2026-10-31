import React from "react";
import Navbar from "./Components/Navbar";
import TodoForm from "./Components/NewTask";
import { useState, useEffect } from "react";
import { useTodos } from "./Context/Context";
import TaskCard from "./Components/TaskCard";

const App = () => {
  const { addTask, tasks, deleteTask, editTask } = useTodos();
  const [addTasks, setaddTask] = useState("null");
  const [Search, setSearch] = useState("");
  const [Filter, setFilter] = useState("");

  const handleCreateTask = (task) => {
    addTask(task);
  };

  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (Search) {
      const searchText = Search.trim().toLowerCase();
      const matchesSearch = (task.title ?? "").toLowerCase().includes(searchText);
      const matchesStatus = Filter === "all" || task.status === Filter;
      return matchesSearch && matchesStatus;
    } else {
      return task;
    }
  });

  const todolist = filteredTasks.filter((T) => {
    const todo = T.status === "todo";
    return todo;
  });

  const inProgressList = filteredTasks.filter((T) => {
    const inProgress = T.status === "in-progress";
    return inProgress;
  });
  const completedList = filteredTasks.filter((T) => {
    const completed = T.status === "completed";
    return completed;
  });

  return (
    <div className="flex flex-col gap-3">
      <Navbar
        onSearch={(value) => setSearch(value)}
        onFilter={(value) => setFilter(value)}
        setaddTask={setaddTask}
      />
      {addTasks === "true" && <TodoForm onSubmit={handleCreateTask} setaddTask={setaddTask} />}
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Board Header */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                My Tasks
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Organize your work and track your progress.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              {todolist.length + inProgressList.length + completedList.length} total tasks
            </div>
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-3 lg:gap-6">
            {/* Todo */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <h2 className="font-bold text-slate-800">Todo</h2>
                </div>
                <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                  {todolist.length}
                </span>
              </div>

              <div className="flex max-h-[650px] min-h-40 flex-col gap-3 overflow-y-auto bg-slate-50/70 p-3 sm:p-4">
                {todolist.length > 0 ? (
                  todolist.map((task, idx) => (
                    <TaskCard
                      key={task.id ?? idx}
                      task={task}
                      onEdit={editTask}
                      onDelete={deleteTask}
                    />
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
                    <p className="text-sm font-medium text-slate-500">No tasks yet</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Your upcoming tasks will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* In Progress */}
            <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50/70 p-4">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-blue-500" />
                  <h2 className="font-bold text-blue-800">In Progress</h2>
                </div>
                <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                  {inProgressList.length}
                </span>
              </div>

              <div className="flex max-h-[650px] min-h-40 flex-col gap-3 overflow-y-auto bg-blue-50/30 p-3 sm:p-4">
                {inProgressList.length > 0 ? (
                  inProgressList.map((task, idx) => (
                    <TaskCard
                      key={task.id ?? idx}
                      task={task}
                      onEdit={editTask}
                      onDelete={deleteTask}
                    />
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-blue-200 p-6 text-center">
                    <p className="text-sm font-medium text-blue-600">Nothing in progress</p>
                    <p className="mt-1 text-xs text-slate-400">Active tasks will appear here.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Completed */}
            <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-emerald-100 bg-emerald-50/70 p-4">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  <h2 className="font-bold text-emerald-800">Completed</h2>
                </div>
                <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  {completedList.length}
                </span>
              </div>

              <div className="flex max-h-[650px] min-h-40 flex-col gap-3 overflow-y-auto bg-emerald-50/30 p-3 sm:p-4">
                {completedList.length > 0 ? (
                  completedList.map((task, idx) => (
                    <TaskCard
                      key={task.id ?? idx}
                      task={task}
                      onEdit={editTask}
                      onDelete={deleteTask}
                    />
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-emerald-200 p-6 text-center">
                    <p className="text-sm font-medium text-emerald-700">No completed tasks</p>
                    <p className="mt-1 text-xs text-slate-400">Finished tasks will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
