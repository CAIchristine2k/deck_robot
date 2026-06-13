import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../contexts/LoadingContext';

const ShootingStars = () => {
  const [stars, setStars] = useState([]);
  const { hasLoadingCompleted } = useLoading();

  useEffect(() => {
    // Don't show shooting stars until loading is complete
    if (!hasLoadingCompleted) return;
    let interval;
    
    // Function to create a new star
    const createStar = () => ({
      id: Date.now(),
      // Random starting position only on the left 30% of the screen
      startX: Math.random() * (window.innerWidth * 0.3),
      startY: Math.random() * (window.innerHeight * 0.5),
      // Random angle between 30 and 60 degrees (downward)
      angle: 30 + Math.random() * 30,
      // Random duration between 4 and 6 seconds
      duration: 4 + Math.random() * 2,
      // Random size (medium)
      size: Math.random() * 0.8 + 0.5,
    });

    // Wait 4 seconds before the first star
    const firstStarTimeout = setTimeout(() => {
      const firstStar = createStar();
      setStars([firstStar]);

      // Remove the first star after animation completes
      setTimeout(() => {
        setStars([]);
      }, firstStar.duration * 1000 + 500);

      // Then create new stars every 16 seconds
      interval = setInterval(() => {
        const newStar = createStar();
        setStars([newStar]);

        // Remove the star after animation completes
        setTimeout(() => {
          setStars([]);
        }, newStar.duration * 1000 + 500);
      }, 16000);
    }, 4000);

    return () => {
      clearTimeout(firstStarTimeout);
      if (interval) clearInterval(interval);
    };
  }, [hasLoadingCompleted]);

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none">
      <AnimatePresence>
        {stars.map(star => {
          // Calculate end position based on angle for straight line movement
          const distance = 600; // Distance for the star to travel
          const angleRad = (star.angle * Math.PI) / 180;
          const deltaX = Math.cos(angleRad) * distance;
          const deltaY = Math.sin(angleRad) * distance;
          const endX = star.startX + deltaX;
          const endY = star.startY + deltaY;

          return (
            <motion.div
              key={star.id}
              className="absolute"
              initial={{
                x: star.startX,
                y: star.startY,
                opacity: 0,
              }}
              animate={{
                x: endX,
                y: endY,
                opacity: [0, 1, 1, 0],
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: star.duration,
                ease: 'easeOut',
                opacity: {
                  times: [0, 0.05, 0.9, 1],
                  duration: star.duration,
                },
              }}
            >
              {/* Star head - small bright dot */}
              <div
                className="absolute"
                style={{
                  width: `${star.size * 3}px`,
                  height: `${star.size * 3}px`,
                  background: 'rgba(255,255,255,1)',
                  borderRadius: '50%',
                }}
              />
              
              {/* Star tail - half the length */}
              <div
                className="absolute"
                style={{
                  width: `${star.size * 175}px`,
                  height: `${star.size * 0.8}px`,
                  background: `linear-gradient(to left, transparent 0%, rgba(255,255,255,0.3) 15%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.2) 70%, transparent 100%)`,
                  transform: `rotate(${star.angle}deg)`,
                  transformOrigin: 'right center',
                  right: 0,
                  top: '50%',
                  marginTop: `-${star.size * 0.4}px`,
                  filter: 'blur(0.3px)',
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ShootingStars;