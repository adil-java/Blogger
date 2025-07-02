import React, { useEffect, useState } from 'react';
import {
  PencilIcon,
  Trash2Icon,
  CheckCircle2Icon,
  ClockIcon,
  CheckIcon,
  AlarmClockPlusIcon,
} from 'lucide-react';

import { blogs_data,comments_data } from '../../assets/assert';   // adjust path if needed
import TableBlog from '../../components/admin/TableBlog';
// import { comments_data } from '../../assets/assert'; // if you store comments separately

export default function Dashboard() {
  /* ---------- derive stats ---------- */
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalComments: 0,
    totalDrafts: 0,
  });
const fetchData=async()=>{
 const totalBlogs    = blogs_data.length;
    const totalDrafts   = blogs_data.filter(b => !b.isPublished).length;
    const totalComments = comments_data.length; // TODO: replace with comments_data.length

    setStats({ totalBlogs, totalComments, totalDrafts });
}
  useEffect(() => {
   fetchData()
  }, []);

  /* ---------- UI ---------- */
  
  return (
    <div className="p-6 space-y-10">
      {/* ======== Stats Section ======== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Blogs" value={stats.totalBlogs} />
        <StatCard label="Comments" value={stats.totalComments} />
        <StatCard label="Drafts" value={stats.totalDrafts} />
      </section>

      {/* ======== Table Section ======== */}
      <TableBlog blogs_data={blogs_data} />
    </div>
  );
}

/* ─── Stat Card Component ─── */
function StatCard({ label, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center hover:scale-105 transition-all">
      <span className="text-3xl font-semibold text-primary-600">{value}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}