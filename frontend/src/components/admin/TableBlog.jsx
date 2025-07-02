/*  src/pages/admin/Comments.jsx  */
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import React, { useState ,useEffect} from 'react';
import {
  Trash2Icon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
} from 'lucide-react';

export default function TableBlog({ blogs_data }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(()=>{
      setLoading(false)

    },[1000])
  }, [])
  
  return (
  
    <>
    {
      
      !loading?(

      <section className="overflow-auto rounded-lg shadow-md hidden sm:block">
        <table className="w-full text-left min-w-[640px]">
          <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="pl-3">#</th>
              <th className="py-3 px-4">Blog Title</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs_data.map((b, i) => (
              <tr key={b._id} className="even:bg-gray-50 hover:bg-gray-100 transition">
                <td className="pl-3">{i + 1}.</td>
                <td className="py-3 px-4">{b.title}</td>
                <td className="py-3 px-4">
                  {b.isPublished ? (
                    <Badge color="green" text="Published" />
                  ) : (
                    <Badge color="yellow" text="Draft" icon={<ClockIcon className="w-4 h-4" />} />
                  )}
                </td>
                <td className="py-3 px-4">
                  <ActionButtons blog={b} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>):(<section className="overflow-auto rounded-lg shadow hidden sm:block">
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
              {[...Array(blogs_data.length)].map((_, i) => (
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
        </section>)
        }

      {/* ───────── Mobile (card list) ───────── */}
      <section className="space-y-3 sm:hidden">
        {blogs_data.map((b, i) => (
          <div
            key={b._id}
            className="rounded-lg shadow border p-3 flex flex-col gap-2 bg-white"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{b.title}</span>
              <span className="text-sm text-gray-500">#{i + 1}</span>
            </div>

            <div className="flex items-center justify-between">
              {b.isPublished ? (
                <Badge color="green" text="Published" />
              ) : (
                <Badge color="yellow" text="Draft" icon={<ClockIcon className="w-4 h-4" />} />
              )}

              <ActionButtons blog={b} iconOnly />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

/* ───────── helpers ───────── */

function Badge({ color, text, icon }) {
  const base =
    'inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full';
  const palette =
    color === 'green'
      ? 'bg-green-100 text-green-700'
      : 'bg-yellow-100 text-yellow-700';
  return (
    <span className={`${base} ${palette}`}>
      {icon ?? <CheckCircle2Icon className="w-4 h-4" />}
      {text}
    </span>
  );
}

function ActionButtons({ blog, iconOnly = false }) {
  const unpublishBtn = (
    <button
      onClick={() => alert(`Unpublish blog ${blog._id}`)}
      className="inline-flex items-center gap-1 text-primary-600 hover:underline"
    >
      {iconOnly ? <XCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-4 h-4" />}
      {!iconOnly && 'Unpublish'}
    </button>
  );

  const publishBtn = (
    <button
      onClick={() => alert(`Publish blog ${blog._id}`)}
      className="inline-flex items-center gap-1 text-gray-600 hover:underline"
    >
      {iconOnly ? <CheckCircle2Icon className="w-5 h-5" /> : <CheckCircle2Icon className="w-4 h-4" />}
      {!iconOnly && 'Publish'}
    </button>
  );

  const deleteBtn = (
    <button
      onClick={() => alert(`Delete blog ${blog._id}`)}
      className={`inline-flex items-center gap-1 text-red-600 hover:underline ${
        iconOnly ? '' : 'ml-4'
      }`}
    >
      {iconOnly ? (
        <Trash2Icon className="w-5 h-5" />
      ) : (
        <>
          <Trash2Icon className="w-4 h-4" /> Delete
        </>
      )}
    </button>
  );

  return (
    <div className={`flex ${iconOnly ? 'gap-3' : 'gap-4'}`}>
      {blog.isPublished ? unpublishBtn : publishBtn}
      {deleteBtn}
    </div>
  );
}
