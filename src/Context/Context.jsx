import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("kanban-tasks") || "[]");
      return savedTasks.map((task) => ({ ...task, id: task.id ?? crypto.randomUUID() }));
    } catch {
      return [];
    }
  });

  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID() }]);
  };

  const deleteTask = (taskId) => {
    console.log(taskId);
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Edit task
  const editTask = (taskId, updatedData) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updatedData } : task)),
    );
  };

  return (
    <TodoContext.Provider value={{ tasks, addTask, deleteTask, editTask, setTasks }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook
export const useTodos = () => {
  return useContext(TodoContext);
};
