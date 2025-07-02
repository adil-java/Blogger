import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, blogs_data } from '../assets/assert.js';
import { BlogCard } from './BlogCard.jsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BlogList() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [activeCat, setActiveCat] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async fetch delay
    const timeout = setTimeout(() => {
      const results = blogs_data.filter(b => {
        const text = `${b.title} ${b.author} ${b.description} ${b.category}`.toLowerCase();
        return (
          (activeCat === 'All' || b.category === activeCat) &&
          text.includes(query.trim().toLowerCase()) &&
          b.isPublished
        );
      });
      setFiltered(results);
      setLoading(false);
    }, 1000); // simulate loading delay

    return () => clearTimeout(timeout);
  }, [query, activeCat]);

  return (
    <div className="px-4">
      {/* Search */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 max-w-xl w-full mx-auto p-2 sm:p-4 bg-white border border-gray-300 rounded-xl shadow-sm">
        <input
          type="text"
          placeholder="Search for blogs"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-grow w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-all w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {/* Categories */}
      <div className="flex sm:text-sm justify-center drop-shadow-2xl gap-4 sm:gap-8 my-10">
        {categories.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveCat(tag)}
            className={`px-3 py-2 rounded-2xl sm:text-sm text-sm transition ${
              tag === activeCat
                ? 'bg-primary-700 text-white'
                : 'text-black hover:bg-primary-700 hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog Cards or Skeleton */}
      <div className="flex justify-center flex-wrap gap-2">
        {loading ? (
          [...Array(blogs_data.length-1)].map((_, i) => (
            <div key={i} className="w-78 ">
              <Skeleton height={180} baseColor="#e2e8f0" highlightColor="#d1e8f1" />
              <Skeleton height={30} width="50%" />
              <Skeleton count={2} />
              <Skeleton height={30} width="40%" />
            </div>
          ))
        ) : filtered.length > 0 ? (
          filtered.map(b => (
            <Link key={b._id} to={`/blog/${b._id}`} className="cursor-pointer block transition-all ease-in">
              <BlogCard
                title={b.title}
                author={b.author}
                description={b.description}
                category={b.category}
                img={b.img}
              />
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No blogs match your search.</p>
        )}
      </div>
    </div>
  );
}
