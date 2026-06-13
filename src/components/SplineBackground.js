import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { useLoading } from '../contexts/LoadingContext';
import MobileStarBackground from './MobileStarBackground';

const SplineBackground = ({ onLoad }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Separate Spline URLs for desktop and mobile
  const DESKTOP_SPLINE_URL = 'https://prod.spline.design/Rikbi7Ffxm6bYRBo/scene.splinecode';
  const MOBILE_SPLINE_URL = 'https://prod.spline.design/7WxuHrTtMuPEdR-g/scene.splinecode'; // Mobile-optimized scene

  // Improved mobile detection with SSR safety
  const detectMobile = () => {
    if (typeof window === 'undefined') return false;

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;

    // Return true if any two conditions are met
    return (isMobileUA && isSmallScreen) || (isMobileUA && isTouchDevice) || (isSmallScreen && isTouchDevice);
  };

  // Initialize with SSR-safe default
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return detectMobile();
  });
  const splineRef = useRef(null);
  const { hasLoadingCompleted } = useLoading();
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [shouldRenderSpline] = useState(true); // Always render to load
  const animationStarted = useRef(false);
  const [currentSceneUrl, setCurrentSceneUrl] = useState(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (splineRef.current && splineRef.current._cleanupResize) {
        splineRef.current._cleanupResize();
      }
    };
  }, []);

  // Update scene URL when mobile state changes
  useEffect(() => {
    const newUrl = isMobile ? MOBILE_SPLINE_URL : DESKTOP_SPLINE_URL;
    if (currentSceneUrl !== newUrl) {
      setCurrentSceneUrl(newUrl);
      setSplineLoaded(false);
      animationStarted.current = false;
    }
  }, [isMobile, currentSceneUrl]);

  useEffect(() => {
    // Set exact pixel dimensions with mobile detection
    const updateDimensions = () => {
      const width = document.documentElement.clientWidth || window.innerWidth;
      const height = document.documentElement.clientHeight || window.innerHeight;
      setDimensions({ width, height });
      setIsMobile(detectMobile());

      // Update Spline renderer size if available
      if (splineRef.current && splineRef.current._renderer) {
        splineRef.current._renderer.setSize(width, height);
        if (splineRef.current._camera) {
          splineRef.current._camera.aspect = width / height;
          splineRef.current._camera.updateProjectionMatrix();
        }
        if (splineRef.current._renderer.render && splineRef.current._scene && splineRef.current._camera) {
          splineRef.current._renderer.render(splineRef.current._scene, splineRef.current._camera);
        }
      }
    };

    // Initial update
    updateDimensions();

    // Update on resize with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDimensions, 100);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', updateDimensions);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', updateDimensions);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    // Optimize canvas settings with performance in mind
    const optimizeCanvas = () => {
      if (containerRef.current) {
        const canvas = containerRef.current.querySelector('canvas');
        if (canvas && dimensions.width > 0) {
          const mobile = detectMobile();
          const baseRatio = window.devicePixelRatio || 1;
          const dpr = mobile ? Math.min(baseRatio, 1.5) : Math.min(baseRatio, 2);

          if (canvas.width !== dimensions.width * dpr) {
            canvas.width = dimensions.width * dpr;
            canvas.height = dimensions.height * dpr;
            canvas.style.width = `${dimensions.width}px`;
            canvas.style.height = `${dimensions.height}px`;
          }

          canvas.style.imageRendering = 'auto';
          canvas.style.transform = 'translateZ(0)';
          canvas.style.willChange = 'auto';
        }
      }
    };

    const timer = setTimeout(optimizeCanvas, 150);
    return () => clearTimeout(timer);
  }, [dimensions]);

  // Start animations only after loading is complete (desktop only)
  useEffect(() => {
    if (hasLoadingCompleted && splineLoaded && splineRef.current && !animationStarted.current && !isMobile) {
      animationStarted.current = true;

      if (splineRef.current._mixer) {
        setTimeout(() => {
          splineRef.current._mixer.update(0);
          if (splineRef.current._animationActions) {
            Object.values(splineRef.current._animationActions).forEach((action) => {
              action.reset();
              action.play();
            });
          }
        }, 300);
      }

      if (splineRef.current.play) {
        splineRef.current.play();
      }
    }
  }, [hasLoadingCompleted, splineLoaded, isMobile]);

  return (
    <div className={`fixed inset-0 ${isMobile ? 'z-0' : 'z-[1]'}`}>
      {isMobile ? (
        <MobileStarBackground />
      ) : (
        <div
          ref={containerRef}
          className="fixed inset-0"
          style={{
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0,
          }}
        >
          <div
            className="spline-wrapper"
            style={{
              position: 'fixed',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100vw',
              height: '100vh',
              overflow: 'hidden',
              pointerEvents: 'auto',
              zIndex: 1,
            }}
          >
            {shouldRenderSpline && currentSceneUrl && (
              <Spline
                key={currentSceneUrl}
                ref={splineRef}
                scene={currentSceneUrl}
                onLoad={(splineApp) => {
                  splineRef.current = splineApp;

                  // Only pause animations during loading
                  if (!hasLoadingCompleted) {
                    if (splineApp._mixer) {
                      splineApp._mixer.stopAllAction();
                      if (splineApp._animationActions) {
                        Object.values(splineApp._animationActions).forEach((action) => {
                          action.stop();
                        });
                      }
                    }
                    if (splineApp.pause) {
                      splineApp.pause();
                    }
                  }

                  // Renderer optimizations for desktop
                  if (splineApp._renderer) {
                    const renderer = splineApp._renderer;
                    const dpr = Math.min(window.devicePixelRatio || 1, 2);
                    renderer.setPixelRatio(dpr);
                    renderer.setSize(dimensions.width, dimensions.height, false);
                    renderer.antialias = true;
                    renderer.powerPreference = 'high-performance';
                    renderer.shadowMap.enabled = true;
                  }

                  // Controls settings based on device type
                  if (splineApp._controls) {
                    if (isMobile) {
                      splineApp._controls.enabled = false;
                      splineApp._controls.enableRotate = false;
                      splineApp._controls.enableZoom = false;
                      splineApp._controls.enablePan = false;
                      splineApp._controls.enableDamping = false;
                      splineApp._controls.touches = { ONE: null, TWO: null };
                    } else {
                      splineApp._controls.enabled = true;
                      splineApp._controls.enableRotate = true;
                      splineApp._controls.enableZoom = true;
                      splineApp._controls.enablePan = true;
                    }
                  }

                  // Add resize handler for Spline
                  const handleSplineResize = () => {
                    if (splineApp.setSize) {
                      splineApp.setSize(window.innerWidth, window.innerHeight);
                    }
                  };
                  window.addEventListener('resize', handleSplineResize);

                  splineApp._cleanupResize = () => {
                    window.removeEventListener('resize', handleSplineResize);
                  };
                  setSplineLoaded(true);
                  if (onLoad) onLoad(splineApp);
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  pointerEvents: 'auto',
                  touchAction: 'auto',
                  userSelect: 'auto',
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SplineBackground;
