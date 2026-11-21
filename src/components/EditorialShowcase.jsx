import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function useRevealOpacity(progress, start, finish) {
  return useTransform(progress, [start, finish], [0, 1], { clamp: true });
}

function WordReveal({ text, progress, start, step = 0.012 }) {
  return (
    <motion.em className="editorial-emphasis" role="text" aria-label={text}>
      {Array.from(text).map((letter, index) => (
        <LetterReveal
          key={`${letter}-${index}`}
          letter={letter}
          progress={progress}
          start={start + index * step}
          finish={start + (index + 1) * step}
        />
      ))}
    </motion.em>
  );
}

function LetterReveal({ letter, progress, start, finish }) {
  const opacity = useRevealOpacity(progress, start, finish);
  return (
    <motion.span aria-hidden="true" style={{ opacity }}>
      {letter === ' ' ? '\u00a0' : letter}
    </motion.span>
  );
}

function useItemStyle(progress, start, finish, reduceMotion) {
  const opacity = useRevealOpacity(progress, start, finish);
  return reduceMotion ? undefined : { opacity };
}

export default function EditorialShowcase() {
  const reduceMotion = useReducedMotion();
  const collageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: ['start 0.82', 'end 0.35'],
  });

  const manStyle = useItemStyle(scrollYProgress, 0, 0.13, reduceMotion);
  const firstLineStyle = useItemStyle(scrollYProgress, 0.12, 0.27, reduceMotion);
  const billieStyle = useItemStyle(scrollYProgress, 0.29, 0.43, reduceMotion);
  const bestsellerStyle = useItemStyle(scrollYProgress, 0.45, 0.59, reduceMotion);
  const pinkStyle = useItemStyle(scrollYProgress, 0.65, 0.79, reduceMotion);
  const lastLineStyle = useItemStyle(scrollYProgress, 0.81, 0.97, reduceMotion);

  return (
    <section id="editorial" className="editorial-section w-full overflow-hidden bg-white px-4 pb-16 sm:px-6">
      <div ref={collageRef} className="editorial-collage relative mx-auto max-w-[402px] md:max-w-[760px] xl:max-w-[900px]">
        <motion.figure className="editorial-man" style={manStyle}>
          <img src="/images/new-products/asad.jpg" alt="Asad by Lattafa perfume bottle" loading="eager" decoding="async" />
        </motion.figure>

        <motion.h2 className="editorial-line editorial-line-one" style={firstLineStyle}>
          More than a<br /><WordReveal text="perfume" progress={scrollYProgress} start={0.20} />, it’s a<br />personal<br />signature
        </motion.h2>

        <motion.figure className="editorial-billie" style={billieStyle}>
          <img src="/images/new-products/choco-musk.jpg" alt="Choco Musk perfume bottle" loading="eager" decoding="async" />
        </motion.figure>

        <motion.p className="editorial-bestseller" style={bestsellerStyle}>
          Bestselling<br /><WordReveal text="fragrances." progress={scrollYProgress} start={0.53} />
        </motion.p>

        <motion.figure className="editorial-pink" style={pinkStyle}>
          <img src="/images/new-products/chloe-2.jpg" alt="Chloé perfume bottle" loading="eager" decoding="async" />
        </motion.figure>

        <motion.p className="editorial-line editorial-line-two" style={lastLineStyle}>
          Fragrances that become <WordReveal text="part of your story" progress={scrollYProgress} start={0.87} step={0.0075} /> and your presence.
        </motion.p>
      </div>
    </section>
  );
}
