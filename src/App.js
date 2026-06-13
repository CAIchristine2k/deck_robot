import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SplineBackground from './components/SplineBackground';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import ShootingStars from './components/ShootingStars';
import LoadingScreen from './components/LoadingScreen';
import useLoadingManager from './hooks/useLoadingManager';
import { LoadingProvider } from './contexts/LoadingContext';

// Pages
import Home from './pages/Home';

function App() {
  const { i18n } = useTranslation();
  const { isLoading, loadingProgress } = useLoadingManager();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    // Show content after loading is complete
    if (!isLoading) {
      setShowContent(true);
    }
  }, [isLoading]);

  return (
    <Router>
      <ScrollToTop />
      <LoadingScreen isLoading={isLoading} progress={loadingProgress} />
      <LoadingProvider isLoading={isLoading} hasLanguageSelected={true}>
        <div className="relative min-h-screen" style={{
          backgroundColor: '#000000',
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}>
          {/* Layer 0: Background effects (z-0) */}
          <div className="fixed inset-0 z-0"></div>

          {/* Layer 1: Spline 3D robot scene - z-index handled internally */}
          {showContent && <SplineBackground />}

          {/* Layer 3: Shooting stars (z-[2]) */}
          <ShootingStars />

          {/* Main content */}
          <div className="relative z-[3]" style={{ pointerEvents: 'none' }}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </LoadingProvider>
    </Router>
  );
}

export default App;
