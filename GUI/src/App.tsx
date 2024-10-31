import React from "react";
import Weights from "./pages/weights/Weights";
import MyFooter from "./pages/footer/MyFooter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkThemeToggle, Footer } from "flowbite-react";
import { Sidebar } from "flowbite-react";
import {
  HomeIcon,
  ScaleIcon,
  CogIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Exercises from "./pages/exercises/Exercises";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="h-dvh w-64" aria-label="Sidebar">
          <Sidebar>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="/" icon={HomeIcon}>
                  Home
                </Sidebar.Item>
                <Sidebar.Item href="/trenings" icon={ScaleIcon}>
                  Trenings
                </Sidebar.Item>
                <Sidebar.Item href="/weights" icon={CogIcon}>
                  Weights
                </Sidebar.Item>
                <Sidebar.Item href="/exercises" icon={UserIcon}>
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
            <Route path="/weights" element={<Weights />} />
            <Route path="/exercises" element={<Exercises />} />
          </Routes>
          <MyFooter />
        </main>
      </div>
    </Router>
  );
}

export default App;
