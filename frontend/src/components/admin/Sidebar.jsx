import React from 'react';
import {
  HomeIcon,
  MessageCircleCodeIcon,
  ListIcon,
  PlusSquareIcon,
  LogOutIcon,
  UserIcon,
  SparklesIcon,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { to: '/admin', icon: HomeIcon, label: 'Dashboard', end: true },
    { to: '/admin/addBlog', icon: PlusSquareIcon, label: 'Add Blog' },
    { to: '/admin/comments', icon: MessageCircleCodeIcon, label: 'Comments' },
    { to: '/admin/', icon: ListIcon, label: 'List Blog' },
    {to: '/', icon: HomeIcon, label: 'Browse Blogs' }
  ];

  return (
    <aside className="flex flex-col justify-between h-screen w-16 md:w-64 pt-5 bg-white shadow-xl animate-slide-in-left overflow-y-auto">
      <div>
        {/* User Profile Section */}
        <div className="px-4 md:px-6 pb-6 mb-4 border-b border-gray-100">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full object-cover border-3 border-primary-300 transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
            </div>
            <div className="hidden md:block">
              <p className="font-semibold text-gray-800 text-sm truncate max-w-[140px] group-hover:text-primary-600 transition-colors">
                {user?.name || 'Writer'}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <SparklesIcon className="w-3 h-3 text-amber-500" />
                <span>Writer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-2 md:px-3 space-y-1">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              end={item.end}
              to={item.to}
              className={({ isActive }) => `
                sidebar-link flex items-center gap-3 py-3.5 px-4 md:px-6 rounded-xl cursor-pointer
                transition-all duration-300 animate-fade-in-up
                ${isActive 
                  ? 'bg-primary-100 text-primary-700 shadow-md shadow-primary-100' 
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <item.icon className="sidebar-icon w-5 h-5" />
              <p className="hidden md:inline-block font-medium">{item.label}</p>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="group flex items-center gap-3 w-full py-3.5 px-4 md:px-6 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
        >
          <LogOutIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          <span className="hidden md:inline-block font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
