import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLoading } from '../contexts/LoadingContext';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(false);
  const { hasLoadingCompleted } = useLoading();

  // Show header after loading completes
  useEffect(() => {
    if (hasLoadingCompleted) {
      const timer = setTimeout(() => {
        setShowHeader(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [hasLoadingCompleted]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: showHeader && isVisible ? 0 : -100,
        opacity: showHeader ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-morphism"
      style={{ pointerEvents: 'auto' }}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link to="/" className="flex items-center gap-3 pointer-events-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center">
                <Bot className="w-5 h-5 text-neon-blue" />
              </div>
              <span className="text-xl font-orbitron font-bold tracking-[0.3em] text-star-white">
                ROBOTIC
              </span>
            </motion.div>
          </Link>

          {/* Language Switcher */}
          <div className="pointer-events-auto">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
