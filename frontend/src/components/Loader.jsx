import React from 'react';

export default function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
