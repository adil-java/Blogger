import React, { useEffect, useState } from 'react';
import TableBlog from '../../components/admin/TableBlog';
import { blogs_data } from '../../assets/assert'; // update path if needed

export default function ListBlog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // In real scenario, fetch from backend
    setBlogs(blogs_data);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-primary-700">All Blogs</h1>
      <TableBlog blogs_data={blogs} />
    </div>
  );
}
