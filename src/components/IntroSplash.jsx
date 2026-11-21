import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GlassIconReveal } from './ui/liquid-glass-logo-reveal.tsx';

const INTRO_DURATION = 3600;

export default function IntroSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), INTRO_DURATION);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Scented by Carelle"
        >
          <GlassIconReveal
            logo="/images/logo_highres.png"
            label="Scented by Carelle"
            className="h-full w-full cursor-default"
            background="#ffffff"
            originalColors
            loop={false}
            speed={1.2}
            hold={0}
            tuning={{ present: 1.8, glide: 1.6, startZoom: 2.1 }}
          />
          <p className="pointer-events-none absolute bottom-[18%] left-0 right-0 text-center font-elgina text-sm tracking-[0.16em] text-[#252D61]/65">
            A fragrance, remembered.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
