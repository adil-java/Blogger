import { Sparkle } from 'lucide-react';
import React from 'react';

function Header() {
  return (
    <div className="relative isolate overflow-hidden py-16">
      {/* Background gradient using absolute div */}
      <div className="absolute inset-0 -z-10 " />

      <div className="mx-6 sm:mx-16 xl:mx-24 text-center">
        {/* Highlight Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 rounded-full bg-blue-100 text-blue-800 text-sm font-medium shadow-sm">
          <Sparkle className="w-4 h-4 animate-pulse text-blue-600" />
          <span>New AI Feature Integrated</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 leading-tight">
          Your Personal AI Blogging Assistant
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg text-blue-700 max-w-xl mx-auto">
          Generate, reflect, and organize your thoughts effortlessly using AI.
        </p>
      </div>
    </div>
  );
}

export default Header;
