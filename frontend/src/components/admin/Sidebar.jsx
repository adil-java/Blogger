import React from 'react';
import {
  HomeIcon,
  AppWindowIcon,
  MessageCircleCodeIcon,
  ListIcon,
  PlusSquareIcon,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const base =
    'flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition hover:bg-primary-100';

  /* add -mr-4 so the blue border overlaps the grey sidebar border */
  const active = 'bg-primary-50 border-r-4 border-primary-600 -mr-1';

  return (
    <aside className="flex flex-col border-r-4 border-primary-300 min-h-screen pt-5">
      {/* Dashboard */}
      <NavLink
        end
        to="/admin"
        className={({ isActive }) => `${base} ${isActive ? active : ''}`}
      >
        <HomeIcon className="m-5 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      {/* Add Blog */}
      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) => `${base} ${isActive ? active : ''}`}
      >
        <PlusSquareIcon className="m-5 w-5" />
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>

      {/* Comments */}
      <NavLink
        to="/admin/comments"
        className={({ isActive }) => `${base} ${isActive ? active : ''}`}
      >
        <MessageCircleCodeIcon className="m-5 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>

      {/* List Blog */}
      <NavLink
        to="/admin/listBlog"
        className={({ isActive }) => `${base} ${isActive ? active : ''}`}
      >
        <ListIcon className="m-5 w-5" />
        <p className="hidden md:inline-block">List Blog</p>
      </NavLink>
    </aside>
  );
}
