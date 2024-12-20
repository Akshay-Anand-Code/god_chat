"use client";

import { FaTelegramPlane, FaTwitter, FaGithub, FaCopy } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "0x1234...5678"; // Replace with your actual contract address

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-5xl font-extrabold tracking-wider" style={{
              textShadow: `
                3px 3px 0 #1e3a8a,
                -3px -3px 0 #1e3a8a,
                3px -3px 0 #1e3a8a,
                -3px 3px 0 #1e3a8a,
                6px 6px 0 rgba(30, 58, 138, 0.5)
              `,
              fontFamily: "'Bangers', cursive",
              color: '#FCD34D',
              letterSpacing: '0.1em',
              transform: 'rotate(-2deg)',
              padding: '0.2em',
            }}>
              CHAT.FUN
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="https://t.me/your_telegram" 
              target="_blank"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              <FaTelegramPlane size={24} />
            </Link>
            <Link 
              href="https://twitter.com/your_twitter" 
              target="_blank"
              className="text-gray-600 hover:text-blue-400 transition-colors"
            >
              <FaTwitter size={24} />
            </Link>
            <Link 
              href="https://github.com/your_github" 
              target="_blank"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaGithub size={24} />
            </Link>
            <div className="relative group flex items-center bg-gray-100 rounded-lg px-4 py-2 ml-6">
              <span className="text-gray-600 font-mono text-sm">{contractAddress}</span>
              <button
                onClick={handleCopy}
                className="ml-2 p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <FaCopy size={16} />
              </button>
              {copied && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                  Copied!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 