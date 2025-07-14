import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";
import TaskCard from "../components/TaskCard";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("/api/task", {
        params: { search: searchTerm },
      });
      setTasks(data.response); // Your backend sends `response` array
    } catch (err) {
      console.error("Error fetching tasks:", err);
      toast.error("Failed to fetch tasks");
    }
  };

  // ✅ Toggle task completion
  const toggleComplete = async (task) => {
    try {
      await axios.put(`/api/task/${task._id}`, {
        done: !task.done,
      });
      fetchTasks(); // Refresh list after update
    } catch (err) {
      console.error("Error toggling task:", err);
      toast.error("Failed to update task");
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/task/${id}`);
      fetchTasks();
      toast.success("Task deleted");
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar navigation */}
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Today</h2>
          <div className="flex items-center gap-4">
            <button className="text-xl">🌙</button>
            <button className="text-xl">🔔</button>
            <img
              src="https://i.pravatar.cc/40"
              className="w-8 h-8 rounded-full"
              alt="user"
            />
          </div>
        </div>

        {/* 🔍 Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchTasks()}
            className="border px-4 py-2 rounded w-full shadow-sm"
          />
        </div>

        {/* 📋 Task List */}
        <div className="space-y-4">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                title={task.title}
                description={task.description}
                icon={task.icon || "📖"}
                color={task.color || "bg-yellow-100"}
                completed={task.done}
                onToggle={() => toggleComplete(task)}
                onDelete={() => deleteTask(task._id)}
                onUpdate={() => {
                  // Optional: redirect to update page
                  window.location.href = `/update-task/${task._id}`;
                }}
              />
            ))
          ) : (
            <p className="text-gray-500">No tasks found.</p>
          )}
        </div>

        {/* ➕ Add New Task Button */}
        <button
          className="fixed bottom-6 right-6 bg-white text-xl p-4 shadow-lg rounded-full hover:shadow-xl"
          onClick={() => {
            window.location.href = "/new-task";
          }}
        >
          ➕
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
