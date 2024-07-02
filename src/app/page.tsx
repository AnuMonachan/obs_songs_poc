"use client";
import { SetStateAction, useState } from "react";
import Songs from "./_components/songs";
import Stories from "./_components/stories";

const Home = () => {
  const [selectedComponent, setSelectedComponent] = useState("Songs");

  const handleComponentChange = (component: SetStateAction<string>) => {
    setSelectedComponent(component);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Topbar</h1>
          <div className="flex space-x-4">
            <button
              className={`rounded px-4 py-2 ${
                selectedComponent === "Songs"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleComponentChange("Songs")}
            >
              Songs
            </button>
            <button
              className={`rounded px-4 py-2 ${
                selectedComponent === "Stories"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleComponentChange("Stories")}
            >
              Stories
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {selectedComponent === "Songs" && <Songs />}
        {selectedComponent === "Stories" && <Stories />}
      </div>
    </div>
  );
};

export default Home;
