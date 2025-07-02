import React from 'react';

export default function Newsletter() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 my-32 px-4">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!</h1>

      <p className="md:text-lg text-gray-600 pb-2 max-w-xl">
        Subscribe to get the latest blogs, new tech, and exclusive news
      </p>

      <form className="w-full max-w-xl flex h-12 md:h-14">
        <input
          className="flex-grow border border-gray-300 h-full px-4 rounded-l-md text-gray-700 focus:outline-none"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 md:px-10 rounded-r-md hover:bg-blue-700 transition-all"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
