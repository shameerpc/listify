import React from "react";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 shadow">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 text-white rounded-full p-2">📅</div>
        <h1 className="text-2xl font-bold">Listify</h1>
      </div>
      <nav className="flex gap-6 text-sm font-medium">
        <a href="#">About us</a>
        <a href="#">Contacts</a>
      </nav>
    </header>
  );
};

export default Navbar;
