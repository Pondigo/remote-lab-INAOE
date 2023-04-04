import React from "react";
import "./App.css";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <div className="flex justify-between w-400 bg-white shadow-md p-20 rounded-lg">
      <div className="w-100 h-100 bg-blue-500 flex flex-col items-center justify-center text-white rounded-md">
        <div className="text-2xl font-bold">Menu Option 1</div>
        <div className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>

      <div className="w-100 h-100 bg-orange-500 flex flex-col items-center justify-center text-white rounded-md">
        <div className="text-2xl font-bold">Menu Option 2</div>
        <div className="text-sm">
          Ut enim ad minim veniam, quis nostrud exercitation.
        </div>
      </div>

      <div className="w-100 h-100 bg-pink-500 flex flex-col items-center justify-center text-white rounded-md">
        <div className="text-2xl font-bold">Menu Option 3</div>
        <div className="text-sm">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </div>
      </div>
    </div>
  );
}

export default App;
