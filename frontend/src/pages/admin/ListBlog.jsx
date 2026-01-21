import React, { useEffect, useState } from 'react';
import TableBlog from '../../components/admin/TableBlog';
import { blogs_data as fallbackBlogs } from '../../assets/assert';
import { blogAPI } from '../../api/api';
import toast from 'react-hot-toast';

export default function ListBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAll();
      if (response.success) {
        setBlogs(response.blogs || []);
      } else {
        setBlogs(fallbackBlogs);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      setBlogs(fallbackBlogs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const response = await blogAPI.delete(id);
      if (response.success) {
        toast.success('Blog deleted successfully');
        fetchBlogs();
      } else {
        toast.error(response.message || 'Failed to delete blog');
      }
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const response = await blogAPI.togglePublish(id);
      if (response.success) {
        toast.success('Blog status updated');
        fetchBlogs();
      } else {
        toast.error(response.message || 'Failed to update blog status');
      }
    } catch (error) {
      toast.error('Failed to update blog status');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-primary-700">All Blogs</h1>
      <TableBlog 
        blogs_data={blogs} 
        onDelete={handleDelete}
        onTogglePublish={handleTogglePublish}
        loading={loading}
      />
    </div>
  );
}
