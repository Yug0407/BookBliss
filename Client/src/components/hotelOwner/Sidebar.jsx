import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react"; // For toggle icons

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon },
  ];

  return (
    <aside
      className={`fixed top-12 left-0 h-[calc(100vh-3rem)] bg-white border-r border-gray-200 shadow-md flex flex-col transition-all duration-300 z-40 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 mt-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="h-8 w-8 opacity-80" />
            <h1 className="font-semibold text-gray-800 text-lg">Owner Panel</h1>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-100 transition-all"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col mt-2">
        {sidebarLinks.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            end
            className={({ isActive }) =>
              [
                "flex items-center transition-all duration-200 rounded-r-lg",
                isCollapsed
                  ? "justify-center py-3"
                  : "py-3 px-5 md:px-6 gap-3",
                isActive
                  ? "bg-blue-100 border-r-4 border-blue-600 text-blue-700 font-medium"
                  : "hover:bg-gray-100 text-gray-700",
              ].join(" ")
            }
          >
            <img
              src={item.icon}
              alt={item.name}
              className="h-6 w-6 object-contain"
            />
            {!isCollapsed && (
              <p className="text-sm tracking-wide whitespace-nowrap">
                {item.name}
              </p>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="mt-auto py-4 border-t border-gray-100 text-center text-xs text-gray-400">
          © 2025 QuickStay
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
