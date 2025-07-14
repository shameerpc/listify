import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("bg-yellow-300");
  const [repeat, setRepeat] = useState("Daily");
  const [tags, setTags] = useState("");

  const colors = [
    "bg-green-200", "bg-purple-300", "bg-orange-200", "bg-cyan-100", "bg-yellow-300", "bg-lime-400", "bg-cyan-300", "bg-blue-400", "bg-purple-400", "bg-pink-400", "bg-red-400", "bg-gray-200"
  ];

  const handleCreate = async () => {
    try {
      const res = await axios.post('/api/task', {
        title,
        description,
        color,
        repeat,
        tags: tags.split(",").map((t) => t.trim()), // Convert string to array
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert("Failed to create task.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Task <span className="ml-1">📝</span></h2>
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

        <input
          type="text"
          placeholder="Name your new task"
          className="w-full border p-3 rounded-md mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Describe your new task"
          className="w-full border p-3 rounded-md mb-6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className="mb-6">
          <p className="font-semibold mb-2">Card Color</p>
          <div className="flex gap-3">
            {colors.map((c, i) => (
              <div
                key={i}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${c} ${color === c ? "border-black" : "border-transparent"}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-md shadow">
            <p className="font-semibold">Repeat</p>
            <p className="text-sm text-gray-500 mb-2">Set a cycle for your task</p>
            <div className="flex gap-3 mb-3">
              {["Daily", "Weekly", "Monthly"].map((option) => (
                <button
                  key={option}
                  onClick={() => setRepeat(option)}
                  className={`px-4 py-2 rounded-full ${
                    repeat === option ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-md shadow">
            <p className="font-semibold">Set a tag for your task</p>
            <input
              type="text"
              placeholder="Comma separated tags (e.g., work,urgent)"
              className="border mt-2 mb-3 w-full p-2 rounded-md"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        <button
          className="fixed bottom-6 right-6 bg-white text-xl p-4 shadow-lg rounded-full"
          onClick={handleCreate}
        >
          ✅
        </button>
      </main>
    </div>
  );
};

export default NewTask;
