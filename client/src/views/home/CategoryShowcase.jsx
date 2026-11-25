'use client';

import { useState } from "react";
import { Link } from "react-router-dom";

const CATEGORY_DETAILS = {
  "Energy Management": {
    image: "/assets/courses/course_workshop.webp",
    imageSm: "/assets/courses/course_workshop-384.webp",
    title: "Energy Management & Efficiency",
    desc: "Optimize energy consumption, implement ISO 50001 standards, and learn to perform energy reviews and audits to achieve sustainability goals.",
    count: "12+ Courses Available",
  },
  "Quality Management": {
    image: "/assets/courses/course_meeting.webp",
    imageSm: "/assets/courses/course_meeting-384.webp",
    title: "Quality Management & Six Sigma",
    desc: "Drive process excellence, reduce defects, and implement key QMS frameworks using industry-standard tools like RCA, FMEA, and APQP.",
    count: "18+ Courses Available",
  },
  "ISO Systems": {
    image: "/assets/courses/iso_dashboard.webp",
    imageSm: "/assets/courses/iso_dashboard-384.webp",
    title: "Leading ISO Categories for Professionals",
    desc: "Explore our most in-demand ISO course categories chosen by professionals to support compliance, skill development, and career growth.",
    count: "60+ Courses Available",
  },
  "Environmental Management": {
    image: "/assets/courses/course_lecture.webp",
    imageSm: "/assets/courses/course_lecture-384.webp",
    title: "Environmental & Sustainability",
    desc: "Master waste management, circular economy practices, and environmental compliance audits under the globally recognized ISO 14001 standard.",
    count: "24+ Courses Available",
  },
};

export default function CategoryShowcase() {
  const [activeTab, setActiveTab] = useState("ISO Systems");
  const current = CATEGORY_DETAILS[activeTab];

  return (
    <div className="darksec">
      <div className="sec-head-center">
        <div className="eyebrow text-white-color">Popular Category Courses</div>
        <h2>Leading ISO categories for professionals</h2>
        <div className="tabs">
          {Object.keys(CATEGORY_DETAILS).map((t) => {
            const isActive = t === activeTab;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTab(t)}
                className={isActive ? "on" : ""}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
      <div className="dg">
        <div className="vis">
          <img
            src={current.image}
            srcSet={`${current.imageSm} 384w, ${current.image} 520w`}
            sizes="(max-width: 860px) 352px, 520px"
            alt={current.title}
            width={520}
            height={260}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="details">
          <h3>{current.title}</h3>
          <p>{current.desc}</p>
          <div className="count">{current.count}</div>
          <Link to="/courses" className="btn borderhover  btn-energy">
            Explore Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
