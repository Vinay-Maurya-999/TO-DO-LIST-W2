import { useState } from "react";
import { ClipboardList, CalendarDays, Flag, Plus, AlignLeft } from "lucide-react";

function TodoForm({ onSubmit, setaddTask, initialTask }) {
  const [formData, setFormData] = useState(() => ({
    title: initialTask?.title ?? "",
    description: initialTask?.description ?? "",
    priority: initialTask?.priority ?? "Low",
    dueDate: initialTask?.dueDate ?? "",
    status: initialTask?.status ?? "todo",
  }));
  const isEditing = Boolean(initialTask);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit?.(formData);
    setaddTask("false");
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-7"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-indigo-600 p-3 text-white">
          <ClipboardList size={24} />
        </div>

        <div className="flex items-center flex-row justify-between gap-70">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing ? "Edit Task" : "Create New Task"}
            </h2>
            <p className="text-sm text-slate-500">
              {isEditing ? "Update your task details" : "Fill in your task details"}
            </p>
          </div>
          <div
            onClick={() => {
              setaddTask("false");
            }}
            className="text-xl font-bold text-slate-900"
          >
            X
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-semibold text-slate-700">
          Task Title
        </label>

        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Build navbar"
          className={inputClass}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="flex items-center gap-2 text-sm font-semibold text-slate-700"
        >
          <AlignLeft size={16} />
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your task..."
          rows={3}
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Priority and Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="priority"
            className="flex items-center gap-2 text-sm font-semibold text-slate-700"
          >
            <Flag size={16} />
            Priority
          </label>

          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-semibold text-slate-700">
            Status
          </label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <label
          htmlFor="dueDate"
          className="flex items-center gap-2 text-sm font-semibold text-slate-700"
        >
          <CalendarDays size={16} />
          Due Date
        </label>

        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98]"
      >
        <Plus size={19} />
        {isEditing ? "Save Changes" : "Create Task"}
      </button>
    </form>
  );
}

export default TodoForm;
