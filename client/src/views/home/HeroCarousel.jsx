'use client';

import { useState, useEffect, useRef } from "react";

const HERO_SLIDES = [
  {
    id: 1,
    image: "/assets/herocrausal/emergency-preparedness.webp",
    image640: "/assets/herocrausal/emergency-preparedness-640.webp",
    image480: "/assets/herocrausal/emergency-preparedness-480.webp",
    title: "Emergency Preparedness & Response",
  },
  {
    id: 2,
    image: "/assets/herocrausal/free-webinar.webp",
    image640: "/assets/herocrausal/free-webinar-640.webp",
    image480: "/assets/herocrausal/free-webinar-480.webp",
    title: "Free Live Webinar ISO 9001:2026",
  },
  {
    id: 3,
    image: "/assets/herocrausal/safety-data-sheet.webp",
    image640: "/assets/herocrausal/safety-data-sheet-640.webp",
    image480: "/assets/herocrausal/safety-data-sheet-480.webp",
    title: "Safety Data Sheet Management",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [loadExtraSlides, setLoadExtraSlides] = useState(false);
  const dragStartX = useRef(null);

  useEffect(() => {
    let intervalId;
    const loadTimer = setTimeout(() => setLoadExtraSlides(true), 2800);
    const startTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        setActive((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 3500);
    }, 3500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(startTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handlePointerDown = (e) => {
    setLoadExtraSlides(true);
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) < 30) return;
    if (dx < 0) {
      setActive((prev) => (prev + 1) % HERO_SLIDES.length);
    } else {
      setActive((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }
  };

  return (
    <div
      className="adcar relative w-full h-[210px] sm:h-[250px] md:h-[280px] lg:h-[270px] !min-h-0 rounded-[24px] overflow-hidden  select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      role="region"
      aria-label="Featured training banners"
    >
      <div
        className="flex w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {HERO_SLIDES.map((slide, idx) => (
          <div key={slide.id} className="w-full h-full shrink-0 relative rounded-[24px] overflow-hidden">
            {idx === 0 || loadExtraSlides || active === idx ? (
              <img
                src={idx === 0 ? slide.image640 : slide.image}
                srcSet={`${slide.image480} 480w, ${slide.image640} 640w, ${slide.image} 800w`}
                sizes="(max-width: 767px) 356px, 480px"
                alt={slide.title}
                width={800}
                height={450}
                loading={idx === 0 ? "eager" : "lazy"}
                fetchPriority={idx === 0 ? "high" : "low"}
                decoding={idx === 0 ? "sync" : "async"}
                draggable={false}
                className="w-full h-full object-cover object-center rounded-[24px] transition-transform duration-500  cursor-grab active:cursor-grabbing"
              />
            ) : (
              <div className="w-full h-full rounded-[24px] bg-[#062d4d]" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
      <div className="hero-carousel-dots">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
            aria-current={idx === active ? "true" : undefined}
            className={`hero-carousel-dot${idx === active ? " active" : ""}`}
            onMouseEnter={() => setLoadExtraSlides(true)}
            onClick={() => {
              setLoadExtraSlides(true);
              setActive(idx);
            }}
          >
            <span className="hero-carousel-dot-inner" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
