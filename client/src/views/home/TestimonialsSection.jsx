'use client';

import { useState, useEffect, useRef } from "react";

const TESTIS = [
  {
    q: "The trainer used strong real-world examples that made difficult situations easy to understand.",
    rate: "★★★★★",
    sub: "Score: 30/30",
    av: "KK",
    name: "Kaushal Kishore Sharma",
    role: "Sr Engineer, Mines Operation · UltraTech Cement Limited",
    bg: "#0069B8"
  },
  {
    q: "Gained clarity on the difference between correction and corrective action, and how weak root cause analysis leads to repeat issues.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "SU",
    name: "Shivam Kumar Upadhyay",
    role: "Section Head-ER · UltraTech Cement (Maihar)",
    bg: "#B85200"
  },
  {
    q: "The examples used were simple and helped him grasp concepts quickly.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "SU",
    name: "Sachin Ulmale",
    role: "Process Manager · Ultratech Cement, Maihar",
    bg: "#0073c4"
  },
  {
    q: "Found the example-based explanations effective.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "SL",
    name: "Suresh Lohar",
    role: "Manager · Ultratech Cement, Maihar",
    bg: "#CC2200"
  },
  {
    q: "Learned effectively through the examples provided during the session.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "RM",
    name: "Ravendra Kumar Mishra",
    role: "Engineer, E&I · Maihar Cement Works (UTCL)",
    bg: "#0069B8"
  },
  {
    q: "Appreciated the clear explanation of ISO 9001, 14001, 45001, 19011, and the newer clause changes.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "MN",
    name: "Monika Nishad",
    role: "Junior Engineer · Maihar Cement Works",
    bg: "#B85200"
  },
  {
    q: "Every topic was explained with strong clarity.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "BS",
    name: "Bhupendra Singh",
    role: "Internal Auditor · IIPL Jagdishpur",
    bg: "#0073c4"
  },
  {
    q: "Now looks at plant operations through risk-based thinking rather than just compliance.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "KV",
    name: "Kuldeep Verma",
    role: "Power Plant Operation · Indorama India, Jagdishpur",
    bg: "#CC2200"
  },
  {
    q: "Valued the grounding in ISO certification concepts.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "BP",
    name: "Bipin Pratap Patel",
    role: "Deputy Manager · Indorama India Pvt Ltd",
    bg: "#0069B8"
  },
  {
    q: "Real plant scenarios in the audit examples made ISO concepts click.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "SV",
    name: "Simant Raj Vishwakarma",
    role: "Assistant Manager · Indorama India Pvt Ltd",
    bg: "#B85200"
  },
  {
    q: "Understood the role audits play in strengthening overall process discipline.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "SP",
    name: "Saumitra Kesh Pandey",
    role: "Agronomy · Indorama India Pvt Ltd",
    bg: "#0073c4"
  },
  {
    q: "Real-life examples during the session improved both understanding and engagement.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "CK",
    name: "Chetan Kadukar",
    role: "Section Head Safety · Ultratech Cement, Maihar",
    bg: "#CC2200"
  },
  {
    q: "Real scenario examples made it easier to understand different audit situations.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "VN",
    name: "Vivak Kumar Niranjan",
    role: "Assistant Manager · Maihar Cement Works",
    bg: "#0069B8"
  },
  {
    q: "Found the ISO-based examples helpful.",
    rate: "★★★★☆",
    sub: "Score: 26/30",
    av: "RM",
    name: "Rajnish Mishra",
    role: "Assistant Manager · Ultratech Cement, Shahjahanpur",
    bg: "#B85200"
  },
  {
    q: "Overall a strong learning experience.",
    rate: "★★★★☆",
    sub: "Score: 26/30",
    av: "AP",
    name: "Ankesh Pandey",
    role: "Section Head, Security & Administration · UltraTech Cement",
    bg: "#0073c4"
  },
  {
    q: "Real-life audit examples linked clearly to different plant departments.",
    rate: "★★★★☆",
    sub: "Score: 26/30",
    av: "DD",
    name: "Dhawal Kumar Dhabalia",
    role: "Assistant Manager · Maihar Cement Works",
    bg: "#CC2200"
  },
  {
    q: "The trainer kept every participant engaged throughout.",
    rate: "★★★★☆",
    sub: "Score: 26/30",
    av: "OP",
    name: "Om Pathak",
    role: "Internal Auditor · Maihar Cement Works",
    bg: "#0069B8"
  },
  {
    q: "Understood how ISO 9001, 14001, and 45001 come together into one integrated system.",
    rate: "★★★★☆",
    sub: "Score: 26/30",
    av: "KK",
    name: "Kishor Kunal",
    role: "AGM, GE & Inspection · Indorama India Pvt Ltd",
    bg: "#B85200"
  },
  {
    q: "Case-specific examples gave clear direction on how the audit process works.",
    rate: "★★★★☆",
    sub: "Score: 26/30",
    av: "PS",
    name: "Prakhar Singh",
    role: "Assistant General Manager, Strategy · Indorama India Pvt Ltd",
    bg: "#0073c4"
  },
  {
    q: "The floor-sweeping example made the concept of an integrated management system click.",
    rate: "★★★★☆",
    sub: "Score: 26/30",
    av: "MR",
    name: "Mohd Rohil",
    role: "Assistant Manager · Indorama India Pvt Ltd",
    bg: "#CC2200"
  }
];

export default function TestimonialsSection() {
  const testiRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleTestiScroll = () => {
    const el = testiRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    });
  };

  useEffect(() => {
    const el = testiRef.current;
    if (!el) return;

    let isVisible = false;
    const observer = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              isVisible = true;
              setShowAll(true);
            } else {
              isVisible = false;
            }
          },
          { threshold: 0.05, rootMargin: "500px" }
        )
      : null;

    if (observer) observer.observe(el);

    const idleTimer = setTimeout(() => setShowAll(true), 6000);

    const interval = setInterval(() => {
      if (!isVisible) return;
      requestAnimationFrame(() => {
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScrollLeft - 10) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollBy({ left: 364, behavior: "smooth" });
        }
      });
    }, 3000);

    return () => {
      clearTimeout(idleTimer);
      clearInterval(interval);
      if (observer) observer.disconnect();
    };
  }, []);

  const visibleItems = showAll ? TESTIS : TESTIS.slice(0, 4);

  return (
    <>
      <div className="rec-header">
        <div>
          <div className="eyebrow">What learners say</div>
          <h2>Trusted Opinions from Industry Professionals</h2>
        </div>
        <div className="rec-nav-btns">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => testiRef.current?.scrollBy({ left: -364, behavior: "smooth" })}
            className={`circle-nav-btn prev ${canScrollLeft ? "active" : "inactive"}`}
            disabled={!canScrollLeft}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => testiRef.current?.scrollBy({ left: 364, behavior: "smooth" })}
            className={`circle-nav-btn next ${canScrollRight ? "active" : "inactive"}`}
            disabled={!canScrollRight}
          >
            ›
          </button>
        </div>
      </div>

      <div className="testi-row-redesign" id="testiRow" ref={testiRef} onScroll={handleTestiScroll}>
        {visibleItems.map((t) => (
          <div key={t.name} className="testi-card-redesign">
            <div>
              <div className="testi-quote-redesign">&ldquo;</div>
              <p className="testi-text-redesign">{t.q}</p>
            </div>
            <div>
              <div className="testi-rating-line">
                <span className="rating-stars">{t.rate}</span>
                <span className="rating-subtext">{t.sub}</span>
              </div>
              <div className="testi-author-box">
                <span className="testi-avatar" style={{ background: t.bg }}>
                  {t.av}
                </span>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
