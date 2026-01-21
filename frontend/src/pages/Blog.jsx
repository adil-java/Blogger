import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
import Moment from 'moment';
import { useParams } from 'react-router-dom';
import { assets, blogs_data as fallbackBlogs, comments_data as fallbackComments } from '../assets/assert';
import './Blog.css';                      /* ← import the stylesheet */
import { FacebookIcon, Instagram, LinkedinIcon, XIcon,HomeIcon } from 'lucide-react';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import { blogAPI, commentAPI } from '../api/api';

export default function Blog() {
  const { id }   = useParams();
  const [data, setData] = useState(null);
  const [cmtData, setCmtData] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const addComment = async e => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setSubmitting(true);
    try {
      const response = await commentAPI.add(id, name, comment);
      if (response.success) {
        toast.success('Comment submitted successfully!');
        setName('');
        setComment('');
        // Refresh comments
        fetchComments();
      } else {
        toast.error(response.message || 'Failed to submit comment');
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      toast.error('Failed to submit comment');
    } finally {
      setSubmitting(false);
    }
  };

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getById(id);
      if (response.success) {
        setData(response.blog);
      } else {
        // Fallback to static data
        const found = fallbackBlogs.find(item => item._id == id);
        setData(found || null);
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      // Fallback to static data
      const found = fallbackBlogs.find(item => item._id == id);
      setData(found || null);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentAPI.getByBlogId(id);
      if (response.success) {
        setCmtData(response.comments);
      } else {
        // Fallback to static data
        setCmtData(fallbackComments.filter(c => c.blog?._id == id));
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      // Fallback to static data
      setCmtData(fallbackComments.filter(c => c.blog?._id == id));
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);


  if (!data) return (
    <article className="blog-container">


    <header className="blog-meta">
      
      <p className="blog-date">
        <Skeleton width={120} baseColor="#e2e8f0" highlightColor="#a8aafc" />
      </p>
      <h1 className="blog-title">
        <Skeleton width={`80%`} height={30} baseColor="#e2e8f0" highlightColor="#161514" />
      </h1>
      <h2 className="blog-category">
        <Skeleton width={100} baseColor="#e2e8f0" highlightColor="#f8fafcx" />
      </h2>
      <p className="blog-author">
        <Skeleton width={150} baseColor="#e2e8f0" highlightColor="#f8fafc" />
      </p>
    </header>

    <Skeleton height={300} className="mb-6" baseColor="#e2e8f0" highlightColor="#f8fafc" />

    <section className="rich-text">
      <Skeleton count={6} baseColor="#e2e8f0" highlightColor="#f8fafc" />
    </section>

    <div className='mt-10 mb-10 max-w-3xl mx-auto'>
      <p className='mb-3'><Skeleton width={100} baseColor="#e2e8f0" highlightColor="#f8fafc" /></p>
      <div className='flex flex-col gap-4'>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-primary-300 p-4 rounded">
            <div className='flex items-center gap-2 mb-2'>
              <Skeleton circle width={24} height={24} baseColor="#e2e8f0" highlightColor="#f8fafc" />
              <Skeleton width={100} baseColor="#e2e8f0" highlightColor="#f8fafc" />
            </div>
            <Skeleton count={2} baseColor="#e2e8f0" highlightColor="#f8fafc" />
          </div>
        ))}
      </div>
    </div>
  </article>
);

  return (
    <>
    <article className="blog-container">
      {/* meta */}

        <div onClick={()=>navigate('/')}><HomeIcon/><span>Browse blogs</span>
      </div>
      <header className="blog-meta">
        <p className="blog-date">
          Published on: {Moment(data.createdAt).format('MMMM Do, YYYY')}
        </p>
        <h1 className="blog-title">{data.title}</h1>
        <h2 className="blog-category">{data.category}</h2>
        <p className="blog-author">by: <b>{data.author}</b></p>
      </header>

      {/* hero image */}
      <img className="blog-image" src={data.image || data.img} alt={data.title} />

      {/* rich text */}
      <section
        className="rich-text"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />

    </article>
    <div className='mt-4 mb-10 max-w-3xl mx-auto '>
      <p className='mb-3'> Comments:{`(${cmtData.length})`}</p>
      <div className='flex flex-col gap-4'>
    
      {cmtData.map((item, index) => (
    <div
      key={item._id || index}
      className="relative bg-primary-300 border border-primary-400 max-w-xl p-4 rounded text-grey-600"
    >
      <div className="flex items-center gap-2 mb-2">
        <img src={assets.user_icon} className="w-6" />
        <p className="font-medium">{item.name}</p>
      </div>
      <p className="text-sm max-w-md ml-8">{item.content}</p>
      <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
        {Moment(item.createdAt).fromNow()}
      </div>
    </div>
))}


    
      </div>
        <div className="max-w-3xl mx-auto px-4 py-2">
      <p className="text-lg font-semibold mb-4">Add your comment</p>

      <form onSubmit={addComment} className="flex flex-col gap-4 max-w-lg w-full">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          placeholder="Your Name"
          required
          className="w-full p-3 bg-white rounded-md border border-gray-300 
                     outline-none focus:ring-2 focus:ring-primary-400 transition-all"
        />

        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows="5"
          placeholder="Write your comment here..."
          required
          className="w-full p-3 bg-white rounded-md border border-gray-300 
                     outline-none focus:ring-2 focus:ring-primary-400 transition-all"
        ></textarea>

        <button
          type="submit"
          disabled={submitting}
          className="bg-primary-500 text-white font-medium px-6 py-2 w-full h-full rounded-md 
                     hover:bg-primary-600 disabled:opacity-60 transition-all"
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
    <div className="mt-12">
  <div className="text-center mb-4">
    <p className="text-lg font-semibold">Share this article on social media</p>
  </div>

  <div className="flex justify-center items-center gap-4 flex-wrap">
    <a href="#" target="_blank" rel="noopener noreferrer">
      <FacebookIcon className="w-8 h-8 p-1 bg-white rounded-xl border border-gray-300 hover:text-primary-700 transition" />
    </a>

    <a href="#" target="_blank" rel="noopener noreferrer">
      <XIcon className="w-8 h-8 p-1 bg-white rounded-xl border border-gray-300 hover:text-primary-700 transition" />
    </a>

    <a href="#" target="_blank" rel="noopener noreferrer">
      <LinkedinIcon className="w-8 h-8 p-1 bg-white rounded-xl border border-gray-300 hover:text-primary-700 transition" />
    </a>

    <a href="#" target="_blank" rel="noopener noreferrer">
      <Instagram className="w-8 h-8 p-1 bg-white rounded-xl border border-gray-300 hover:text-primary-700 transition" />
    </a>
  </div>
</div>

      </div>
      <Footer/>
    </>

  );
}
