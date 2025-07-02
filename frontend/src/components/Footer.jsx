import React from 'react';
import { Link } from 'react-router-dom';
import {
  Github,
  Twitter,
  Facebook,
  Instagram,
  GithubIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon
} from 'lucide-react';
import { assets } from '../assets/assert';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Column 1 - Logo & Name */}
        <div>
          <h1 className="text-2xl font-bold mb-2"><img src={assets.react_log} alt="" />Blogger</h1>
          <p className="text-gray-400 text-sm">A place to read and share ideas.</p>
        </div>

        {/* Column 2 - Navigation */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/signup" className="hover:underline">Signup</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
          </ul>
        </div>

        {/* Column 3 - Social Links */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4 text-gray-400 text-lg">
            <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="hover:text-white w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterIcon className="hover:text-white w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookIcon className="hover:text-white w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="hover:text-white w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 4 - Optional Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p className="text-gray-400 text-sm">Email: info@Blogger.com</p>
          <p className="text-gray-400 text-sm">Location: Karachi, Pakistan</p>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="mt-10 border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Blogger. Built by 
        <a
          href="https://github.com/adil-java"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white ml-1 hover:underline"
        >
          @adil-java
        </a>
      </div>
    </footer>
  );
}
