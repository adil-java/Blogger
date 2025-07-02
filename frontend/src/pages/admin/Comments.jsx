/*  src/pages/admin/Comments.jsx  */
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2Icon,
  ClockIcon,
  Trash2Icon,
  XCircleIcon,
} from "lucide-react";

import { comments_data } from "../../assets/assert.js";


/* ——————————————————————————————— */
export default function Comments() {
  /* local state */
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("all"); // all | approved | pending
  const [loading, setLoading] = useState(true);
  const fetchComments=async()=>{
    setComments(comments_data);

  }
  /* fetch mock data once */
  useEffect(() => {
    const timeout =setTimeout(()=>{
      fetchComments()
      setLoading(false);
    },1000)
    return()=>clearInterval(timeout)
  }, []);

  /* helper to grab blog title by id */
 const findBlogTitle = (comment) => comment.blog?.title ?? "Unknown Blog";


  /* filtered list */
  const filtered = useMemo(() => {
    if (filter === "all") return comments;
    const isApproved = filter === "approved";
    return comments.filter((c) => c.isApproved === isApproved);
  }, [comments, filter]);

  /* toggle & delete handlers */
  const toggleStatus = (c) =>
    setComments((prev) =>
      prev.map((item) =>
        item._id === c._id ? { ...item, isApproved: !item.isApproved } : item
      )
    );

  const deleteComment = (c) =>
    window.confirm("Delete comment?") &&
    setComments((prev) => prev.filter((item) => item._id !== c._id));

  /* ————— render ————— */
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-primary-700">Comments</h1>

      {/* filter buttons */}
      <div className="flex gap-4">
        {["all", "approved", "pending"].map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-1 rounded-full border ${
              filter === key
                ? "bg-primary-500 text-white border-primary-500"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* content */}
     {loading ? (
  <section className="overflow-auto rounded-lg shadow hidden sm:block">
    <table className="w-full min-w-[720px] text-left">
      <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
        <tr>
          <th className="pl-3">#</th>
          <th className="py-3 px-4">Blog</th>
          <th className="py-3 px-4">Name</th>
          <th className="py-3 px-4">Comment</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(comments_data.length)].map((_, i) => (
          <tr key={i} className="even:bg-gray-50">
            <td className="pl-3">
              <Skeleton height={20} width="50%" />
            </td>
            <td className="py-3 px-4">
              <Skeleton height={20} width="80%" />
            </td>
            <td className="py-3 px-4">
              <Skeleton height={20} width="60%" />
            </td>
            <td className="py-3 px-4">
              <Skeleton height={20} width="90%" />
            </td>
            <td className="py-3 px-4">
              <Skeleton height={20} width="60%" />
            </td>
            <td className="py-3 px-4">
              <Skeleton height={20} width="60%" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>

      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No comments found.</p>
      ) : (
        <>
          {/* ——— desktop table ——— */}
          <section className="overflow-auto rounded-lg shadow hidden sm:block">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                <tr>
                  <th className="pl-3">#</th>
                  <th className="py-3 px-4">Blog</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Comment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr
                    key={c._id}
                    className="even:bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <td className="pl-3">{i + 1}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {findBlogTitle(c)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">{c.name}</td>
                    <td className="py-3 px-4">{c.content}</td>
                    <td className="py-3 px-4">
                      {c.isApproved ? (
                        <Badge color="green" text="Approved" />
                      ) : (
                        <Badge
                          color="yellow"
                          text="Pending"
                          icon={<ClockIcon className="w-4 h-4" />}
                        />
                      )}
                    </td>
                    <td className="py-3 px-4 flex gap-4">
                      <button
                        onClick={() => toggleStatus(c)}
                        className="inline-flex items-center gap-1 text-primary-600 hover:underline"
                      >
                        {c.isApproved ? (
                          <>
                            <XCircleIcon className="w-4 h-4" />
                            Unapprove
                          </>
                        ) : (
                          <>
                            <CheckCircle2Icon className="w-4 h-4" />
                            Approve
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => deleteComment(c)}
                        className="inline-flex items-center gap-1 text-red-600 hover:underline"
                      >
                        <Trash2Icon className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* ——— mobile cards ——— */}
          <section className="sm:hidden space-y-4">
            {filtered.map((c) => (
              <div
                key={c._id}
                className="border rounded-lg shadow p-4 space-y-2 bg-white"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{c.name}</span>
                  {c.isApproved ? (
                    <Badge color="green" text="Approved" />
                  ) : (
                    <Badge
                      color="yellow"
                      text="Pending"
                      icon={<ClockIcon className="w-4 h-4" />}
                    />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {findBlogTitle(c)}
                </p>
                <p>{c.content}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleStatus(c)}
                    className="text-primary-600"
                  >
                    {c.isApproved ? (
                      <XCircleIcon className="w-5 h-5" />
                    ) : (
                      <CheckCircle2Icon className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteComment(c)}
                    className="text-red-600"
                  >
                    <Trash2Icon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

/* ——— tiny badge helper ——— */
function Badge({ color, text, icon }) {
  const base =
    "inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full";
  const palette =
    color === "green"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  return (
    <span className={`${base} ${palette}`}>
      {icon ?? <CheckCircle2Icon className="w-4 h-4" />}
      {text}
    </span>
  );
}
