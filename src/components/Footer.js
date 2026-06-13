import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="relative bg-transparent z-[30]" style={{ pointerEvents: 'none' }}>
      <div className="container mx-auto px-6 relative z-[30]" style={{ pointerEvents: 'none' }}>
        <div className="py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-10 h-10 rounded-xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-neon-blue" />
            </div>
            <span className="text-xl font-orbitron font-bold tracking-[0.3em] text-star-white">
              ROBOTIC
            </span>
          </motion.div>

          <p className="text-gray-400 font-montserrat max-w-xl">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="py-4 border-t border-neon-blue/20">
          <div className="text-gray-500 font-montserrat text-sm" style={{ pointerEvents: 'none' }}>
            © {new Date().getFullYear()} {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
