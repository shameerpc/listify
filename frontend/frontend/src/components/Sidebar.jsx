import React from "react";

const Sidebar = () => {
  return (
    <div className="w-[280px] border-r min-h-screen p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-blue-600 text-white rounded-full p-2 text-lg">📅</div>
        <h1 className="text-2xl font-bold">Listify</h1>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500 font-semibold">Tasks</p>
        <div className="bg-gray-100 px-3 py-2 rounded-md mt-1">Today <span className="float-right font-bold">2</span></div>
      </div>

      <div>
        <p className="text-sm text-gray-500 font-semibold">Lists</p>
        <ul className="mt-2 space-y-1">
          <li className="text-sm flex justify-between">Daily Routine <span className="font-bold">1</span></li>
          <li className="text-sm flex justify-between">Study <span className="font-bold">0</span></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
