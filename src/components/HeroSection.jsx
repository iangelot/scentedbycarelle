import React from 'react';

export default function HeroSection({ onShopNow, onExploreCollection }) {
  return (
    <section className="hero-section w-full overflow-hidden bg-white px-4 pt-0 pb-9 sm:px-6 md:pt-10">
      <div className="hero-wrap mx-auto max-w-[402px] md:max-w-[760px] xl:max-w-[900px]">
        <div className="hero-stage relative isolate mx-auto w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+3rem)] sm:-mx-6 md:mx-auto md:w-full" aria-label="Scented by Carelle, luxury scented house">
          <img src="/images/blue_flower_clean.png" alt="" aria-hidden="true" className="hero-flower hero-flower-blue" />
          <img src="/images/pink_flower_clean.png" alt="" aria-hidden="true" className="hero-flower hero-flower-pink" />

          <div className="hero-title relative z-[4] text-center">
            <p className="hero-eyebrow">Luxury scented house</p>
            <h1>Made to stick<br />in your<br />memory</h1>
          </div>

          <img
            src="/images/hero section hands.png"
            alt="Hands sharing a bottle of perfume"
            className="hero-hands"
            fetchPriority="high"
          />
          <img
            src="/images/hero-hand-presenting.png"
            alt=""
            aria-hidden="true"
            className="hero-hands-separated hero-hand-presenting"
            fetchPriority="high"
          />
          <img
            src="/images/hero-hand-reaching.png"
            alt=""
            aria-hidden="true"
            className="hero-hands-separated hero-hand-reaching"
            fetchPriority="high"
          />

          <p className="hero-signature relative z-[3]">Curated<br />By Carelle</p>
        </div>

        <p className="hero-description mx-auto mt-3 max-w-[320px] text-center">
          Discover refined fragrance made for unforgettable moments. Each scent is blended with dedicated notes, timeless character, and a touch of quiet luxury.
        </p>
        <div className="hero-actions mt-4 flex items-center justify-center gap-5">
          <button onClick={onShopNow} className="hero-primary">Shop Now</button>
          <a href="/collection" className="hero-secondary group">
            Explore Collection <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
