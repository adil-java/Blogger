import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

export const BlogCard = ({ title, author, description, category, img }) => (
  <div className="group relative bg-white shadow-lg rounded-2xl overflow-hidden w-80 max-w-md cursor-pointer card-hover">
    {/* Bookmark Button */}
    <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary-600 p-2.5 rounded-full hover:bg-primary-600 hover:text-white z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
      <BookOpen size={18} />
    </button>

    {/* Category Badge */}
    <span className="absolute top-4 left-4 bg-primary-600/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full z-10">
      {category}
    </span>

    {/* Image with overlay */}
    <div className="relative overflow-hidden">
      <img
        src={img}
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    <div className="p-6 space-y-3">
      <h2 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
        {title}
      </h2>
      
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
          <span className="text-primary-600 text-xs font-medium">
            {author?.charAt(0)?.toUpperCase() || 'A'}
          </span>
        </div>
        <span>{author}</span>
      </div>

      <div
        className="text-gray-600 text-sm line-clamp-2"
        dangerouslySetInnerHTML={{ __html: description.slice(0, 100) }}
      />

      <button className="group/btn flex items-center gap-2 text-primary-600 font-medium text-sm hover:gap-3 transition-all duration-300">
        Read More 
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>
  </div>
);
