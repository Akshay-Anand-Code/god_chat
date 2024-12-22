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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1B23] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 
              className="text-6xl font-bold" 
              style={{
                fontFamily: "'Bangers', cursive",
                color: '#FF6B00',
                letterSpacing: '0.02em',
                filter: 'brightness(1.2) contrast(1.1)',
                textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)',
                paddingLeft: '0.5rem'
              }}
            >
              CHAT.FUN
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="https://t.me/your_telegram" 
              target="_blank"
              className="text-[#8F95B2] hover:text-[#A8E34D] transition-colors"
            >
              <FaTelegramPlane size={24} />
            </Link>
            <Link 
              href="https://twitter.com/your_twitter" 
              target="_blank"
              className="text-[#8F95B2] hover:text-[#A8E34D] transition-colors"
            >
              <FaTwitter size={24} />
            </Link>
            <Link 
              href="https://github.com/your_github" 
              target="_blank"
              className="text-[#8F95B2] hover:text-[#A8E34D] transition-colors"
            >
              <FaGithub size={24} />
            </Link>
            <div className="relative group flex items-center bg-[#282A36] rounded-lg px-4 py-2 ml-6 border border-[#363945]">
              <span className="text-[#8F95B2] font-mono text-sm">{contractAddress}</span>
              <button
                onClick={handleCopy}
                className="ml-2 p-1.5 text-[#8F95B2] hover:text-[#A8E34D] rounded-md hover:bg-[#363945] transition-colors"
              >
                <FaCopy size={16} />
              </button>
              {copied && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#A8E34D] text-[#1C1D25] text-xs py-1 px-2 rounded">
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