import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, blogs_data as fallbackBlogs } from '../assets/assert.js';
import { BlogCard } from './BlogCard.jsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { blogAPI } from '../api/api.js';
import toast from 'react-hot-toast';
import { Search, Sparkles } from 'lucide-react';

export default function BlogList() {
  const [query, setQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCat, setActiveCat] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogAPI.getAll();
        if (response.success) {
          setBlogs(response.blogs);
        } else {
          // Fallback to static data if API fails
          setBlogs(fallbackBlogs);
          toast.error('Using cached data');
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        // Fallback to static data
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search and category
  useEffect(() => {
    const results = blogs.filter(b => {
      const text = `${b.title} ${b.author || ''} ${b.description} ${b.category}`.toLowerCase();
      return (
        (activeCat === 'All' || b.category === activeCat) &&
        text.includes(query.trim().toLowerCase()) &&
        b.isPublished
      );
    });
    setFiltered(results);
  }, [query, activeCat, blogs]);

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
      <div className="flex justify-center flex-wrap gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="w-80">
              <Skeleton height={180} baseColor="#e2e8f0" highlightColor="#d1e8f1" borderRadius={16} />
              <Skeleton height={30} width="50%" className="mt-4" />
              <Skeleton count={2} className="mt-2" />
              <Skeleton height={30} width="40%" className="mt-2" />
            </div>
          ))
        ) : filtered.length > 0 ? (
          filtered.map((b, index) => (
            <Link 
              key={b._id} 
              to={`/blog/${b._id}`} 
              className="block animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
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
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blogs match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
