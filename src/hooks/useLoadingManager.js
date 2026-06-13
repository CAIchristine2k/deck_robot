import { useState, useEffect, useCallback } from 'react';

const useLoadingManager = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStartTime] = useState(Date.now());
  const [resources, setResources] = useState({
    images: false,
    fonts: false,
    scripts: false,
    styles: false,
    dom: false
  });

  // Calculate overall progress
  const calculateProgress = useCallback(() => {
    const resourceKeys = Object.keys(resources);
    const loadedCount = resourceKeys.filter(key => resources[key]).length;
    const progress = Math.round((loadedCount / resourceKeys.length) * 100);
    return progress;
  }, [resources]);

  // Update resource loading status
  const updateResourceStatus = useCallback((resourceName, status) => {
    setResources(prev => ({
      ...prev,
      [resourceName]: status
    }));
  }, []);

  // Check if minimum loading time has passed
  const checkMinimumLoadingTime = useCallback(() => {
    const elapsedTime = Date.now() - loadingStartTime;
    const minimumTime = 1500; // 1.5 seconds
    return elapsedTime >= minimumTime;
  }, [loadingStartTime]);

  // Update progress with smooth animation
  useEffect(() => {
    const targetProgress = calculateProgress();
    
    // Smooth progress animation
    const animateProgress = () => {
      setLoadingProgress(current => {
        const diff = targetProgress - current;
        if (Math.abs(diff) < 1) {
          return targetProgress;
        }
        // Ease out animation
        return current + diff * 0.1;
      });
    };
    
    const interval = setInterval(animateProgress, 50);
    
    // Check if everything is loaded and minimum time has passed
    if (targetProgress === 100 && checkMinimumLoadingTime()) {
      // Add a small delay for smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
    
    return () => clearInterval(interval);
  }, [resources, calculateProgress, checkMinimumLoadingTime]);

  // Monitor DOM content loaded
  useEffect(() => {
    if (document.readyState === 'complete') {
      updateResourceStatus('dom', true);
    } else {
      const handleLoad = () => updateResourceStatus('dom', true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [updateResourceStatus]);

  // Monitor font loading
  useEffect(() => {
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        updateResourceStatus('fonts', true);
      }).catch(() => {
        // Fallback if fonts fail to load
        setTimeout(() => updateResourceStatus('fonts', true), 1000);
      });
    } else {
      // Fallback for browsers that don't support font loading API
      setTimeout(() => updateResourceStatus('fonts', true), 1000);
    }
  }, [updateResourceStatus]);

  // Monitor image loading
  useEffect(() => {
    const images = Array.from(document.images);
    let loadedImages = 0;

    if (images.length === 0) {
      updateResourceStatus('images', true);
      return;
    }

    const checkImages = () => {
      loadedImages = images.filter(img => img.complete && img.naturalHeight !== 0).length;
      if (loadedImages === images.length) {
        updateResourceStatus('images', true);
      }
    };

    // Check already loaded images
    checkImages();

    // Set up observers for remaining images
    images.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', checkImages);
        img.addEventListener('error', checkImages); // Count errors as loaded
      }
    });

    // Fallback timeout
    const timeout = setTimeout(() => {
      updateResourceStatus('images', true);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      images.forEach(img => {
        img.removeEventListener('load', checkImages);
        img.removeEventListener('error', checkImages);
      });
    };
  }, [updateResourceStatus]);

  // Monitor stylesheets
  useEffect(() => {
    const stylesheets = Array.from(document.styleSheets);
    
    if (stylesheets.length === 0) {
      updateResourceStatus('styles', true);
      return;
    }

    // Check if stylesheets are loaded
    const checkStylesheets = () => {
      try {
        stylesheets.forEach(sheet => {
          // Accessing cssRules will throw if not loaded
          if (sheet.cssRules || sheet.rules) {
            // Stylesheet is loaded
          }
        });
        updateResourceStatus('styles', true);
      } catch (e) {
        // Not all stylesheets loaded yet
        setTimeout(checkStylesheets, 100);
      }
    };

    checkStylesheets();

    // Fallback timeout
    const timeout = setTimeout(() => {
      updateResourceStatus('styles', true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [updateResourceStatus]);

  // Monitor scripts (for dynamically loaded scripts)
  useEffect(() => {
    const scripts = Array.from(document.scripts);
    
    if (scripts.length === 0) {
      updateResourceStatus('scripts', true);
      return;
    }

    // Most scripts are already loaded by the time React runs
    updateResourceStatus('scripts', true);
  }, [updateResourceStatus]);

  // Ensure minimum loading time
  useEffect(() => {
    const checkTime = setInterval(() => {
      if (checkMinimumLoadingTime() && calculateProgress() === 100) {
        clearInterval(checkTime);
        setTimeout(() => setIsLoading(false), 300);
      }
    }, 100);

    return () => clearInterval(checkTime);
  }, [checkMinimumLoadingTime, calculateProgress]);

  return {
    isLoading,
    loadingProgress,
    updateResourceStatus,
    resources
  };
};

export default useLoadingManager;