import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ScrollReveal({ children, className = '', delay = 0, as: Element = 'div', ...props }) {
  const reduceMotion = useReducedMotion();
  const MotionElement = motion[Element] || motion.div;

  return (
    <MotionElement
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.16 }}
      transition={{ duration: reduceMotion ? 0 : 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionElement>
  );
}
