'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FaWindows, FaApple, FaLinux, FaCopy, FaCheck } from 'react-icons/fa';
import { LuTerminal } from 'react-icons/lu';

export default function CLIPage() {
  const [os, setOs] = useState<'windows' | 'macos' | 'linux' | null>(null);
  const [activeTab, setActiveTab] = useState<'windows' | 'unix'>('unix');
  const [copied, setCopied] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('win') !== -1) {
      setOs('windows');
      setActiveTab('windows');
    } else if (userAgent.indexOf('mac') !== -1) {
      setOs('macos');
      setActiveTab('unix');
    } else if (userAgent.indexOf('linux') !== -1) {
      setOs('linux');
      setActiveTab('unix');
    }
    
    if (Math.random() < 0.1) { 
      setShowEasterEgg(true);
    }
  }, []);

  const installCommands = {
    unix: 'curl -fsSL https://cli.ee3.lol/install | bash',
    windows: 'powershell -c "irm cli.ee3.lol/install.ps1 | iex"'
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCommands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111] opacity-70 z-0"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5 z-0"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-3xl"
      >
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)] text-white"
          >
            Install ee<span className="text-gray-300">3</span> CLI
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 text-lg mb-8 font-[family-name:var(--font-inter)]"
          >
            The CLI tool that works until it doesn't. Perfect for those who enjoy living dangerously.
          </motion.p>
          
          {showEasterEgg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg inline-block"
            >
              <p className="text-yellow-300 text-sm">
                Warning: This CLI might occasionally make sarcastic comments about your code. Don't take it personally.
              </p>
            </motion.div>
          )}
        </div>

        <div className="bg-[#0c0c0c] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          {/* OS Tabs */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('unix')}
              className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-colors ${activeTab === 'unix' ? 'bg-black/30 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <div className="flex items-center gap-2">
                <FaApple className="inline" />
                <FaLinux className="inline" />
                <span className="font-medium">Linux & macOS</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('windows')}
              className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-colors ${activeTab === 'windows' ? 'bg-black/30 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <div className="flex items-center gap-2">
                <FaWindows className="inline" />
                <span className="font-medium">Windows</span>
              </div>
            </button>
            
            <button
              onClick={() => window.open('https://github.com/ee3lol/ee3-cli/tree/main/scripts', '_blank')}
              className="py-4 px-6 text-gray-500 hover:text-gray-300 transition-colors"
            >
              View install script
            </button>
          </div>
          
          {/* Command display */}
          <div className="p-6 relative">
            <div className="flex items-center gap-2 mb-2">
              <LuTerminal className="text-gray-500" />
              <span className="text-gray-500 text-sm">Run this in your terminal:</span>
            </div>
            
            <div className="group relative">
              <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-white font-mono text-sm">
                {installCommands[activeTab]}
              </pre>
              
              <button
                onClick={copyToClipboard}
                className="absolute right-3 top-3 p-2 text-gray-400 hover:text-white transition-colors bg-black/30 rounded-md"
                aria-label="Copy to clipboard"
              >
                {copied ? <FaCheck /> : <FaCopy />}
              </button>
            </div>
            
            <p className="mt-4 text-gray-400 text-sm">
              {activeTab === 'unix' ? 
                "This command downloads and runs the installer script. You might need sudo access." : 
                "This command downloads and runs the installer script in PowerShell."}
            </p>
            
            <p className="mt-6 text-gray-500 text-xs">
              Detected OS: {os ? (
                <span className="text-white">
                  {os === 'windows' ? 'Windows' : os === 'macos' ? 'macOS' : 'Linux'}
                </span>
              ) : 'Detecting...'}
            </p>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>After installation, run <code className="bg-black/30 px-2 py-1 rounded text-gray-300">ee3 --help</code> to see available commands</p>
          <p className="mt-2 text-xs">Version 0.1.0 - Stuff I prefer (until it breaks)</p>
        </motion.div>
      </motion.div>
    </div>
  );
}