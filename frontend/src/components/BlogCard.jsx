import React from 'react';
import { BookOpen } from 'lucide-react';

export const BlogCard = ({ title, author, description, category, img }) => (
  <div className="relative bg-white shadow-lg rounded-2xl overflow-hidden w-80 max-w-md cursor-pointer hover:shadow-xl hover:scale-105 transition ease-in">
    <button className="absolute top-4 right-4 bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 z-10">
      <BookOpen size={18} />
    </button>

    <img
      src={img}
      alt={title}
      className="w-full h-48 object-cover"
    />

    <div className="p-6 space-y-2">
      <h2 className="text-xl font-bold">{title}</h2>
      <span className="text-sm text-gray-500">Author: {author}</span>
      <br />
      <span className="text-sm text-gray-500">{category}</span>

     <div
  className="text-gray-600 text-sm"
  dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
></div>

      <button className="sm:text-sm bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
        Learn More
      </button>
    </div>
  </div>
);
