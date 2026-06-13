import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'pt', label: 'Português', short: 'PT' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'nl', label: 'Nederlands', short: 'NL' },
  { code: 'zh', label: '中文', short: 'ZH' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const current =
    LANGUAGES.find((l) => l.code === i18n.language) ||
    LANGUAGES.find((l) => i18n.language?.startsWith(l.code)) ||
    LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative pointer-events-auto">
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Change language"
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/15 bg-white/5 text-star-white hover:border-neon-blue/40 hover:text-neon-blue transition-all duration-300 font-montserrat text-sm"
      >
        <Globe className="w-4 h-4" />
        <span className="font-semibold tracking-wide">{current.short}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-44 rounded-xl glass-morphism border border-neon-blue/20 overflow-hidden z-50"
          >
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm font-montserrat transition-colors duration-200 hover:bg-neon-blue/10 ${
                    current.code === lang.code ? 'text-neon-blue' : 'text-star-white'
                  }`}
                >
                  <span>{lang.label}</span>
                  {current.code === lang.code && <Check className="w-4 h-4" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
