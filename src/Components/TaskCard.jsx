// import { CalendarDays, Flag, Clock3, Pencil, Trash2, Circle } from "lucide-react";

// function TaskCard({ task, onEdit, onDelete }) {
//   const priorityStyles = {
//     Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
//     Medium: "bg-amber-50 text-amber-700 ring-amber-200",
//     High: "bg-rose-50 text-rose-700 ring-rose-200",
//   };

//   const statusLabels = {
//     todo: "To Do",
//     "in-progress": "In Progress",
//     completed: "Completed",
//   };

//   const statusStyles = {
//     todo: "bg-slate-100 text-slate-600",
//     "in-progress": "bg-blue-50 text-blue-700",
//     completed: "bg-emerald-50 text-emerald-700",
//   };

//   const formattedDate = task.dueDate
//     ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       })
//     : "No due date";

//   return (
//     <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/60">
//       {/* Title and Description */}
//       <div className="flex items-start gap-3">
//         <div className="mt-0.5 rounded-lg bg-slate-100 p-2 text-slate-500">
//           <Circle size={19} />
//         </div>

//         <div className="min-w-0 flex-1">
//           <h3 className="break-words text-base font-bold text-slate-900">{task.title}</h3>

//           <p className="mt-2 break-words text-sm leading-6 text-slate-500">
//             {task.description || "No description provided."}
//           </p>
//         </div>
//       </div>

//       {/* Priority and Status */}
//       <div className="mt-4 flex flex-wrap items-center gap-2">
//         <span
//           className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
//             priorityStyles[task.priority] || priorityStyles.Medium
//           }`}
//         >
//           <Flag size={13} />
//           {task.priority}
//         </span>

//         <span
//           className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
//             statusStyles[task.status] || statusStyles.todo
//           }`}
//         >
//           <Clock3 size={13} />
//           {statusLabels[task.status] || task.status}
//         </span>
//       </div>

//       {/* Due Date */}
//       <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
//         <CalendarDays size={17} className="text-indigo-500" />
//         <span>Due date</span>
//         <span className="ml-auto font-medium text-slate-700">{formattedDate}</span>
//       </div>

//       {/* Actions */}
//       <div className="mt-4 flex gap-3">
//         <button
//           type="button"
//           onClick={() => onEdit?.(task)}
//           className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
//         >
//           <Pencil size={16} />
//           Edit
//         </button>

//         <button
//           type="button"
//           onClick={() => onDelete?.(task.id)}
//           title="Double-click to delete this task"
//           className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
//         >
//           <Trash2 size={16} />
//           Delete
//         </button>
//       </div>
//     </article>
//   );
// }

// export default TaskCard;

import { useState } from "react";
import {
  CalendarDays,
  Flag,
  Clock3,
  Pencil,
  Trash2,
  Circle,
  X,
  Save,
  CloudLightning,
} from "lucide-react";

function TaskCard({ task, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: task.title ?? "",
    description: task.description ?? "",
    priority: task.priority ?? "",
    status: task.status ?? "",
    dueDate: task.dueDate ?? "",
  });

  const priorityStyles = {
    Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Medium: "bg-amber-50 text-amber-700 ring-amber-200",
    High: "bg-rose-50 text-rose-700 ring-rose-200",
  };

  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  const statusStyles = {
    todo: "bg-slate-100 text-slate-600",
    "in-progress": "bg-blue-50 text-blue-700",
    completed: "bg-emerald-50 text-emerald-700",
  };

  const formattedDate = task.dueDate
    ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No due date";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData({
      title: task.title ?? "",
      description: task.description ?? "",
      priority: task.priority ?? "Medium",
      status: task.status ?? "todo",
      dueDate: task.dueDate ?? "",
    });

    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    onEdit?.(task.id, {
      ...formData,
      title: formData.title.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      title: task.title ?? "",
      description: task.description ?? "",
      priority: task.priority ?? "Medium",
      status: task.status ?? "todo",
      dueDate: task.dueDate ?? "",
    });

    setIsEditing(false);
    return;
  };

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/60">
      {isEditing ? (
        /* Edit Form */
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Edit Task</h3>

            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Cancel editing"
            >
              <X size={18} />
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Task Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="Enter task description"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Priority</label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Due Date</label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Save size={16} />
              Save Changes
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        /* Normal Task Card */
        <>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-slate-100 p-2 text-slate-500">
              <Circle size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="break-words text-base font-bold text-slate-900">{task.title}</h3>

              <p className="mt-2 break-words text-sm leading-6 text-slate-500">
                {task.description || "No description provided."}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                priorityStyles[task.priority] || priorityStyles.Medium
              }`}
            >
              <Flag size={13} />
              {task.priority || "Medium"}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                statusStyles[task.status] || statusStyles.todo
              }`}
            >
              <Clock3 size={13} />
              {statusLabels[task.status] || task.status}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
            <CalendarDays size={17} className="text-indigo-500" />
            <span>Due date</span>
            <span className="ml-auto font-medium text-slate-700">{formattedDate}</span>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handleEdit}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
            >
              <Pencil size={16} />
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete?.(task.id)}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export default TaskCard;
