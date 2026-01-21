import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assert";
import { LogOutIcon, UserIcon, PenLineIcon, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center py-5 mx-4 sm:mx-12 xl:mx-24 border-b-2 border-primary-200/50 animate-fade-in-up">
      {/* Logo */}
      <div 
        onClick={() => navigate("/")} 
        className="group flex items-center gap-2 cursor-pointer"
      >
        <div className="relative">
          <img
            src={assets.react_log}
            className="h-6 sm:h-9 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
            alt="Logo"
          />
        </div>
        <span className="self-center text-xl font-bold bg-gradient-to-r from-violet-600 to-primary-600 bg-clip-text text-transparent transition-all group-hover:from-primary-600 group-hover:to-violet-600">
          Blogger
        </span>
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            {/* User Info */}
            <div className="hidden sm:flex items-center gap-2 text-gray-600 group cursor-pointer">
              <div className="relative">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-9 h-9 rounded-full object-cover border-2 border-primary-300 transition-all duration-300 group-hover:border-primary-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <span className="text-sm font-semibold max-w-[100px] truncate group-hover:text-primary-600 transition-colors">
                {user?.name || 'Writer'}
              </span>
            </div>

            {/* Dashboard Link */}
            <Link
              to="/admin"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all duration-300 hover:shadow-lg hover:shadow-primary-200 hover:scale-105"
            >
              <PenLineIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span className="hidden sm:inline font-medium">Dashboard</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full text-sm border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 hover:scale-105"
            >
              <LogOutIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </>
        ) : (
          <Link
            to="/admin"
            className="group relative flex items-center gap-2 px-6 py-3 rounded-full text-sm bg-gradient-to-r from-primary-600 to-violet-600 text-white hover:from-primary-700 hover:to-violet-700 transition-all duration-300 hover:shadow-xl hover:shadow-primary-200 hover:scale-105 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <PenLineIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span className="font-semibold">Become a Writer</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </Link>
        )}
      </div>
    </div>
  );
}
