import React from "react";
import Weights from "./pages/weights/Weights";
import MyFooter from "./pages/footer/MyFooter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkThemeToggle } from "flowbite-react";
import { Sidebar } from "flowbite-react";
import {
  HomeIcon,
  ScaleIcon,
  QueueListIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import Exercises from "./pages/exercises/Exercises";
import Trenings from "./pages/trenings/Trenings";
import AddTrening from "./pages/trenings/AddTrening";
import MainPage from "./pages/main/MainPage";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className=" w-64" aria-label="Sidebar">
          <Sidebar>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="/" icon={HomeIcon}>
                  Home
                </Sidebar.Item>
                <Sidebar.Item href="/trenings" icon={ComputerDesktopIcon}>
                  Trenings
                </Sidebar.Item>
                <Sidebar.Item href="/weights" icon={ScaleIcon}>
                  Weights
                </Sidebar.Item>
                <Sidebar.Item href="/exercises" icon={QueueListIcon}>
                  Exercises
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 dark:bg-gray-800">
          <DarkThemeToggle />

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/trenings" element={<Trenings />} />
            <Route path="/weights" element={<Weights />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/add-trening" element={<AddTrening />} />
          </Routes>
          <MyFooter />
        </main>
      </div>
    </Router>
  );
}

export default App;
