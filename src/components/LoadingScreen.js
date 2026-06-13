import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ isLoading, progress }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  
  // Smooth progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress(prev => {
        const diff = progress - prev;
        if (Math.abs(diff) < 1) return progress;
        return prev + diff * 0.15;
      });
    }, 16);
    
    return () => clearInterval(timer);
  }, [progress]);
  
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
      
      {/* Very subtle animated glow removed */}
      
      <div className="relative">
        {/* Minimal logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Simple wordmark */}
          <h1 className="text-3xl font-orbitron font-light tracking-[0.4em] text-white mb-16">
            ROBOTIC
          </h1>
          
          {/* Ultra-minimal progress bar */}
          <div className="w-48 mb-8">
            <div className="h-[1px] bg-gray-800 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-white"
                style={{ 
                  width: `${displayProgress}%`,
                  transition: 'none'
                }}
              />
            </div>
          </div>
          
          {/* Simple percentage */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-sm font-light font-montserrat"
          >
            {Math.round(displayProgress)}%
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;