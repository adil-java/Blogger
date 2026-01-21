import React, { useEffect, useState } from 'react';
import {
  PencilIcon,
  Trash2Icon,
  CheckCircle2Icon,
  ClockIcon,
  CheckIcon,
  AlarmClockPlusIcon,
} from 'lucide-react';

import { blogs_data as fallbackBlogs, comments_data as fallbackComments } from '../../assets/assert';
import TableBlog from '../../components/admin/TableBlog';
import { blogAPI, commentAPI, dashboardAPI } from '../../api/api';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalComments: 0,
    totalDrafts: 0,
  });
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Try to fetch from API
      const [blogsRes, commentsRes] = await Promise.all([
        blogAPI.getUserBlog(),
        commentAPI.getAll()
      ]);

      if (blogsRes.success) {
        const blogsList = blogsRes.blogs || [];
        setBlogs(blogsList);
        
        const totalBlogs = blogsList.length;
        const totalDrafts = blogsList.filter(b => !b.isPublished).length;
        const totalComments = commentsRes.success ? (commentsRes.comments?.length || 0) : 0;
        
        setStats({ totalBlogs, totalComments, totalDrafts });
      } else {
        // Fallback to static data
        setBlogs(fallbackBlogs);
        setStats({
          totalBlogs: fallbackBlogs.length,
          totalComments: fallbackComments.length,
          totalDrafts: fallbackBlogs.filter(b => !b.isPublished).length,
        });
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Fallback to static data
      setBlogs(fallbackBlogs);
      setStats({
        totalBlogs: fallbackBlogs.length,
        totalComments: fallbackComments.length,
        totalDrafts: fallbackBlogs.filter(b => !b.isPublished).length,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const response = await blogAPI.delete(id);
      if (response.success) {
        toast.success('Blog deleted successfully');
        fetchData(); // Refresh data
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
        fetchData(); // Refresh data
      } else {
        toast.error(response.message || 'Failed to update blog status');
      }
    } catch (error) {
      toast.error('Failed to update blog status');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------- UI ---------- */
  
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's your blog overview.</p>
      </div>

      {/* ======== Stats Section ======== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Blogs" value={stats.totalBlogs} loading={loading} delay={0} />
        <StatCard label="Comments" value={stats.totalComments} loading={loading} delay={0.1} />
        <StatCard label="Drafts" value={stats.totalDrafts} loading={loading} delay={0.2} />
      </section>

      {/* ======== Table Section ======== */}
      <TableBlog 
        blogs_data={blogs} 
        onDelete={handleDelete} 
        onTogglePublish={handleTogglePublish}
        loading={loading}
      />
    </div>
  );
}

/* ─── Stat Card Component ─── */
function StatCard({ label, value, loading, delay = 0 }) {
  return (
    <div 
      className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent">
        {loading ? '...' : value}
      </span>
      <span className="text-sm text-gray-500 mt-2 font-medium">{label}</span>
    </div>
  );
}