'use client';

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import NavBar from "../components/shared/NavBar";
// import Footer from "../components/shared/Footer";
import { COURSES, SYL, REVIEWS, syllabusFor } from "../data/courses";
const courseBg = "/assets/bghero.png";
const adsimag = "/assets/bghero.png";
const adsbg = "/assets/bghero.png";
const heroBg = "/assets/bghero.png";

// Import course images
const courseMeeting = "/assets/courses/course_meeting.png";
const courseLecture = "/assets/courses/course_lecture.png";
const courseWorkshop = "/assets/courses/course_workshop.png";
const coursePresentation = "/assets/courses/course_presentation.png";
const isoDashboard = "/assets/courses/iso_dashboard.png";

const getCourseImage = (title) => {
  const t = title.toLowerCase();
  if (t.includes("six sigma")) return courseMeeting;
  if (t.includes("energy review") || t.includes("energy manager")) return courseLecture;
  if (t.includes("awareness")) return courseWorkshop;
  if (t.includes("14001") || t.includes("9001")) return coursePresentation;
  if (t.includes("nebosh")) return courseWorkshop;
  if (t.includes("esg")) return courseLecture;
  if (t.includes("45001")) return courseWorkshop;
  if (t.includes("waste")) return coursePresentation;
  return courseMeeting;
};

const FILTERS = [
  { f: "all", label: "All courses" },
  { f: "quality", label: "Quality" },
  { f: "safety", label: "Safety" },
  { f: "health", label: "Health" },
  { f: "environment", label: "Environment" },
  { f: "energy", label: "Energy" },
  { f: "esg", label: "ESG" },
  { f: "awareness", label: "Awareness" },
  { f: "auditor", label: "Internal Auditor" },
  { f: "implementer", label: "Lead Implementer" },
  { f: "exam", label: "Exam Prep" },

];

function matches(c, filter, q) {
  if (filter !== "all" && c.track !== filter && c.dom !== filter) return false;
  if (q && !(c.t + " " + c.tag + " " + c.d).toLowerCase().includes(q.toLowerCase())) return false;
  return true;
}

function sortCourses(list, sort) {
  return [...list].sort((a, b) => {
    if (sort === "newest") return list.indexOf(a) - list.indexOf(b);
    if (sort === "enrolled") return b.enr - a.enr;
    if (sort === "rating") return b.rat - a.rat;
    if (sort === "priceLow") return (a.price === "Free" ? 0 : parseInt(a.price.replace(/[^0-9]/g, ""))) - (b.price === "Free" ? 0 : parseInt(b.price.replace(/[^0-9]/g, "")));
    return (b.enr * b.rat) - (a.enr * a.rat); // popular
  });
}

function CourseDetail({ c, onBack }) {
  const nav = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const syl = syllabusFor(c);
  const outcomes = [
    "Apply the standard confidently in your own workplace",
    "Produce audit-ready documentation and records",
    "Pass the assessment and earn a recognised certificate",
    "Carry your progress and certificate into the community",
  ];
  const courseFaqs = [
    { q: "Is there a certificate?", a: "Yes. You earn a recognised eGrowth certificate on completion, which lives on your community profile." },
    { q: "Can I pay with Merit?", a: "Many courses can be unlocked with Merit earned in the community. Paid enrolment also earns a loyalty Merit bonus." },
    { q: "How is it delivered?", a: `${c.level}. A mix of self-paced lessons and, for cohorts, live sessions. Everything opens inside your community dashboard.` },
  ];
  return (
    <>
      <div className="cd-hero" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <a className="cd-back" onClick={onBack} style={{ cursor: "pointer" }}>← All courses</a>
        <span className="tag" style={{ position: "relative", alignSelf: "flex-start" }}>{c.tag}</span>
        <h1 className="text-white-course">{c.t}</h1>
        {/* <div className="cd-meta">⭐ {c.rat.toFixed(1)} · {c.enr.toLocaleString()} enrolled · {c.level}</div> */}
        {/* <span className="text-[#0096FF] font-bold">⭐ 0</span> */}
      </div>
      <div className="cd-body wrap">
        <div className="cd-main">
          <section>
            <h2>About this course</h2>
            <p>{c.d} Delivered by certified practitioners with live support and a recognised certificate on completion.</p>
          </section>
          <section>
            <h2>What you will be able to do</h2>
            <ul className="cd-out">{outcomes.map(o => <li key={o}>{o}</li>)}</ul>
          </section>
          <section>
            <h2>Curriculum</h2>
            <div className="syl">
              {syl.map((m, i) => (
                <div key={i} className="syl-item">
                  <span className="syl-n">{i + 1}</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2>Your instructor</h2>
            <div className="cd-inst">
              <span className="cd-av">PS</span>
              <div>
                <b>eGrowth Faculty</b>
                <div className="cd-role">Practising QHSE &amp; ESG professionals · CQI/IRCA, NEBOSH, BEE certified</div>
                <p>Courses are built and taught by working auditors and trainers, not generalists. You learn how the standard plays out on a real shop floor.</p>
              </div>
            </div>
          </section>
          <section>
            <h2>Learner reviews</h2>
            <div className="cd-revs">
              {REVIEWS.map(r => (
                <div key={r.name} className="drev">
                  <div className="stars">★★★★★</div>
                  <p>{r.q}</p>
                  <div className="who"><b>{r.name}</b> · {r.role}</div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2>FAQ</h2>
            <div className="faq">
              {courseFaqs.map((f, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <div key={f.q} className={`faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                    >
                      <span>{f.q}</span>
                      <span className="faq-icon">{isOpen ? "−" : "+"}</span>
                    </button>
                    <div className="faq-answer-wrapper">
                      <div className="faq-answer-inner">
                        <div className="ans">{f.a}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <aside className="cd-side">
          <div className="cd-card">
            {c.price === "Free"
              ? <span className="price free" style={{ fontSize: 26 }}>Free</span>
              : <span className="price" style={{ fontSize: 26 }}>{c.price}{c.orig && <s>{c.orig}</s>}</span>
            }
            <div className="cd-sub">{c.price === "Free" ? "Open to everyone · certificate included" : "or unlock with Merit · loyalty bonus on enrol"}</div>
            <button className="btn btn-energy" style={{ width: "100%", justifyContent: "center", marginTop: 6 }} onClick={() => nav("/login")}>
              {c.price === "Free" ? "Start free →" : "Enrol now →"}
            </button>
            <button className="btn btn-outline btn-light" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => nav("/contact")}>
              Request in-house training
            </button>
            <ul className="cd-incl">
              <li>✓ Recognised certificate</li>
              <li>✓ Templates &amp; checklists</li>
              <li>✓ Community access &amp; support</li>
              <li>✓ Lifetime access to materials</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

export default function CoursesPage() {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const nav = useNavigate();

  const SORT_OPTIONS = [
    { value: "popular", label: "Most popular" },
    { value: "newest", label: "Newest" },
    { value: "enrolled", label: "Most enrolled" },
    { value: "rating", label: "Top rated" },
    { value: "priceLow", label: "Price: low to high" }
  ];

  const selectedOption = SORT_OPTIONS.find(opt => opt.value === sort) || SORT_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // eslint-disable-next-line no-unused-vars
  const list = sortCourses(COURSES.filter(c => matches(c, filter, q)), sort).map(c => ({
    ...c,
    image: getCourseImage(c.t)
  }));

  if (detail) {
    return (
      <>
        {/* <NavBar active="courses" /> */}
        <CourseDetail c={detail} onBack={() => setDetail(null)} />
        <section className="wrap" style={{ paddingBottom: 60 }}>
          <div className="band" style={{ paddingBottom: 60, backgroundImage: `url(${adsbg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <h2>Your courses live inside your community.</h2>
            <p>Enrol once and the course appears in your Learn Hub dashboard, synced with your profile, certificates, and Merit.</p>
            <div className="cta">
              {/* <button className="btn btn-energy" onClick={() => nav("#")}>Create a free account</button> */}
              {/* <button className="btn btn-light btn-white " onClick={() => nav("/portal/learn")}>Enter community</button> */}
              <button className="btn btn-light btn-white ">Enter community</button>
            </div>
          </div>
        </section>
        {/* <Footer /> */}
      </>
    );
  }

  return (
    <>
      {/* <NavBar active="courses" /> */}

      <section className="hero page-hero" style={{ backgroundImage: `url(${courseBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="wrap hero-in">
          <div className="eyebrow eyebrow-white">eGrowth Learn Hub</div>
          <h1>Recognised <span className="hl">QHSE &amp; ESG certifications</span>, built by practitioners<span className="text-[#f18032]">.</span></h1>
          <p>Browse every course freely, no sign-up needed. Enrol when you're ready and it opens inside your community dashboard, where your progress and certificates live alongside your Merit.</p>
          {/* <div className="cta">
            <a className="btn btn-energy" href="#catalog">Browse courses ↓</a>
            <button className="btn btn-outline text-white" onClick={() => nav("/portal")}>Join the community free</button>
          </div> */}
          <div className="login-note">🔒 Browsing is public · Log in to enrol and track progress in your dashboard</div>
        </div>
      </section>







      <section className="pad wrap" id="catalog">
        <div className="lh-toolbar">
          {/* <div className="lh-search">
              <span>⌕</span>
              <input placeholder="Search courses, standards or topics…" value={q} onChange={e=>setQ(e.target.value)} />
            </div> */}
          <div className="lh-sort" ref={dropdownRef}>
            <span>Sort</span>
            <div className="custom-select-container">
              <button
                type="button"
                className="custom-select-trigger"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{selectedOption.label}</span>
                <span className={`custom-select-arrow ${isOpen ? 'open' : ''}`}>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2' style={{ width: '100%', height: '100%' }}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div className="custom-select-options">
                  {SORT_OPTIONS.map(opt => (
                    <div
                      key={opt.value}
                      className={`custom-select-option ${sort === opt.value ? 'selected' : ''}`}
                      onClick={() => {
                        setSort(opt.value);
                        setIsOpen(false);
                      }}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="filters" id="filters">
          {FILTERS.map(({f,label})=>(
            <span key={f} className={`chip${filter===f?" active":""}`} onClick={()=>setFilter(f)}>{label}</span>
          ))}
        </div>
      <div className="flex flex-col justify-center items-center py-24 text-center">
        <span className="text-3xl font-bold text-slate-800 tracking-tight">
          Coming Soon
        </span>
        <div className="w-12 h-1 bg-[#0096FF] rounded-full mt-3 opacity-60"></div>
      </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 60, }}>
        <div className="band" style={{ backgroundImage: `url(${adsimag})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <h2>Your courses live inside your community.</h2>
          <p>Enrol once and the course appears in your Learn Hub dashboard, synced with your profile, certificates, and Merit. Browsing here stays open to everyone.</p>
          <div className="cta">
            
            <button className="btn btn-light" onClick={() => nav("/coming-soon")}>Enter community</button>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
}
