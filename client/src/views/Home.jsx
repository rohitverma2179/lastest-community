'use client';

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// import NavBar from "../components/shared/NavBar";
// import Footer from "../components/shared/Footer";

const heroBg = "/assets/bghero.png";
const commmingsoon = "/assets/Tab.webp";
// const icons_01 = "/assets/homeIcons/icons-01.webp";
const icons_01 = "/assets/homeIcons/icons-01.webp";
const icons_02 = "/assets/homeIcons/icons-02.webp";
const icons_03 = "/assets/homeIcons/icons-03.webp";
const icons_04 = "/assets/homeIcons/icons-04.webp";
const icons_05 = "/assets/homeIcons/icons-05.webp";
const icons_06 = "/assets/homeIcons/icons-06.webp";
const icons_07 = "/assets/homeIcons/icons-07.webp";
const icons_08 = "/assets/homeIcons/icons-08.webp";
const icons_09 = "/assets/homeIcons/icons-09.webp";
const icons_10 = "/assets/homeIcons/icons-10.webp";
const icons_11 = "/assets/homeIcons/icons-11.webp";
const icons_12 = "/assets/homeIcons/icons-12.webp";
const icons_13 = "/assets/homeIcons/icons-13.webp";
const icons_14 = "/assets/homeIcons/icons-14.webp";
const icons_15 = "/assets/homeIcons/icons-15.webp";

const library = "/assets/labrary.png";

const courseMeeting = "/assets/courses/course_meeting.png";
const courseLecture = "/assets/courses/course_lecture.png";
const courseWorkshop = "/assets/courses/course_workshop.png";
const coursePresentation = "/assets/courses/course_presentation.png";
const isoDashboard = "/assets/courses/iso_dashboard.png";

const heroCarouselImg1 = "/assets/herocrausal/emergency-preparedness.webp";
const heroCarouselImg2 = "/assets/herocrausal/free-webinar.webp";
const heroCarouselImg3 = "/assets/herocrausal/safety-data-sheet.webp";

const showComingSoon = true;

const HERO_SLIDES = [
  { id: 1, image: heroCarouselImg1, title: "Emergency Preparedness & Response" },
  { id: 2, image: heroCarouselImg2, title: "Free Live Webinar ISO 9001:2026" },
  { id: 3, image: heroCarouselImg3, title: "Safety Data Sheet Management" }
];

function HeroCarousel() {
  return (
    <div className="adcar relative w-full h-[210px] sm:h-[250px] md:h-[280px] lg:h-[270px] !min-h-0 rounded-[24px] overflow-hidden  select-none">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        className="w-full h-full rounded-[24px] overflow-hidden"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="w-full h-full">
            <div className="w-full h-full relative rounded-[24px] overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center rounded-[24px] transition-transform duration-500  cursor-grab active:cursor-grabbing"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const PROG_COURSES = [
  {
    bg: "linear-gradient(135deg,#1d77b8,#155d92,#0a3556)",
    tag: "Awareness",
    title: "General Safety Awareness, Workplace Induction",
    level: "Foundational · 3 hrs",
    price: "Free",
    free: true,
    href: "/courses?f=awareness",
    image: courseMeeting,
    desc: "Gain a clear understanding of key occupational health and safety laws applicable across workplace inductions."
  },
  {
    bg: "linear-gradient(135deg,#0e4040,#1e8a8a,#b8e2e2)",
    tag: "Internal Auditor",
    title: "ISO 9001 Internal Auditor, Practitioner",
    level: "Intermediate · 20 hrs",
    price: "₹4,999",
    free: false,
    href: "/courses?f=auditor",
    image: courseLecture,
    desc: "Learn the principles and practices of performing independent internal audits for quality management systems."
  },
  {
    bg: "linear-gradient(135deg,#c2700a,#e08a14,#fdeccb)",
    tag: "Lead Implementer",
    title: "ISO 45001 Lead Implementer",
    level: "Advanced · 36 hrs",
    price: "₹17,999",
    free: false,
    href: "/courses?f=implementer",
    image: courseWorkshop,
    desc: "Master the implementation of international occupational health and safety management standards in your organisation."
  },
  {
    bg: "linear-gradient(135deg,#155d92,#1d77b8,#e08a14)",
    tag: "Exam Prep",
    title: "IRCA ISO 9001 Lead Auditor, Exam Prep",
    level: "Advanced · 30 hrs",
    price: "₹12,999",
    free: false,
    href: "/courses?f=exam",
    image: coursePresentation,
    desc: "Prepare thoroughly for the lead auditor exam with simulated mock assessments and transition checklists."
  },
  {
    bg: "linear-gradient(135deg,#2d5a3d,#4a8a5e,#dcefe2)",
    tag: "Environmental",
    title: "Waste Management & Circular Economy",
    level: "Intermediate · 14 hrs",
    price: "₹6,499",
    free: false,
    href: "/courses?f=environment",
    image: courseWorkshop,
    desc: "Explore key requirements and best practices for circular economy, waste reduction, and compliance audits."
  },
];

const COURSES_TO_RENDER = showComingSoon ? [
  { bg: "linear-gradient(135deg,#1d77b8,#155d92,#0a3556)", tag: "Coming Soon", title: "More exciting courses are coming soon!", level: "Stay tuned!", price: "Coming Soon", free: true, href: "#" }
] : PROG_COURSES;

const LIKE_COURSES = [
  { bg: "linear-gradient(135deg,#155d92,#1d77b8,#8cc6ee)", tag: "Quality", title: "Six Sigma Green Belt, Manufacturing", level: "Intermediate · 32 hrs", price: "₹7,999" },
  { bg: "linear-gradient(135deg,#0a3556,#155d92,#1d77b8)", tag: "Energy", title: "Energy Review & ISO 50001 (BEE)", level: "Intermediate · 24 hrs", price: "₹8,999" },
  { bg: "linear-gradient(135deg,#c2700a,#e08a14,#f0a23c)", tag: "Awareness", title: "Awareness Sessions Pack, Toolbox Talks", level: "Foundational · 6 hrs", price: "₹1,999" },
  { bg: "linear-gradient(135deg,#0e4040,#1e8a8a,#b8e2e2)", tag: "Internal Auditor", title: "ISO 14001:2015 Internal Auditor", level: "Intermediate · 16 hrs", price: "₹4,999" },
  { bg: "linear-gradient(135deg,#155d92,#1d77b8,#e08a14)", tag: "Exam Prep", title: "NEBOSH IGC, International General Certificate", level: "Foundational · 80 hrs", price: "₹39,999" },
];

const LIKE_COURSES_TO_RENDER = showComingSoon ? [
  { bg: "linear-gradient(135deg,#155d92,#1d77b8,#8cc6ee)", tag: "Coming Soon", title: "More recommended courses coming soon", level: "Stay tuned!", price: "Coming Soon" }
] : LIKE_COURSES;

const SERVICES = [
  { ic: icons_02, h: "ISO Standards Training", p: "ISO 9001, 14001, 45001 and 50001, covering awareness, internal auditor and lead implementer programmes mapped to certification bodies." },
  { ic: "🏭", h: "Onsite Training", p: "Programmes built around your sector, your processes and your team, delivered at your site or online." },
  { ic: "🦺", h: "Health & Safety", p: "NEBOSH IGC preparation, work at height, confined space, permit to work, and ready-to-run toolbox talks." },
  { ic: "◆", h: "Quality & Six Sigma", p: "Quality management, root cause analysis, FMEA, APQP and PPAP, plus Six Sigma Green Belt with a real plant project." },
  { ic: "🌱", h: "Environment, Energy & ESG", p: "Waste management, energy reviews under ISO 50001, and GRI, ESRS and BRSR reporting for sustainability teams." },
  { ic: "📄", h: "Implementation Support", p: "Manuals, procedures, audit checklists and gap assessments, with 4,200+ free community templates to start from." },
];

const SERVICES_TO_RENDER = showComingSoon ? [
  { ic: "⏳", h: "Coming Soon", p: "Exciting new services are coming soon. Stay tuned for updates!" }
] : SERVICES;

const SERVICE_IMAGES = [icons_02, icons_03, icons_04, icons_13, icons_12, icons_15];
const WHY_IMAGES = [icons_10, icons_11, icons_01, icons_06, icons_07, icons_08];

function CourseCarousel({ id, items }) {
  const ref = useRef(null);
  const nav = useNavigate();
  return (
    <div className="crow" id={id} ref={ref}>
      {items.map(c => (
        <div key={c.title} className="course" onClick={() => nav("/courses")}>
          <a className="thumb" style={{ background: c.bg }}><span className="tag">{c.tag}</span></a>
          <div className="body">
            <h3>{c.title}</h3>
            <div className="meta">{c.level}</div>
            <div className="foot">
              <span className={`price${c.free ? " free" : ""}`}>{c.price}</span>
              <a className="btn btn-outline" style={{ padding: "7px 14px", fontSize: 13 }}>{c.free ? "Start free " : "Enrol "}</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const TESTIS = [
  {
    q: "The trainer used strong real-world examples that made difficult situations easy to understand.",
    rate: "★★★★★",
    sub: "Score: 30/30",
    av: "KK",
    name: "Kaushal Kishore Sharma",
    role: "Sr Engineer, Mines Operation · UltraTech Cement Limited",
    bg: "#0096FF"
  },
  {
    q: "Gained clarity on the difference between correction and corrective action, and how weak root cause analysis leads to repeat issues.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "SU",
    name: "Shivam Kumar Upadhyay",
    role: "Section Head-ER · UltraTech Cement (Maihar)",
    bg: "#FF9300"
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
    bg: "#0096FF"
  },
  {
    q: "Appreciated the clear explanation of ISO 9001, 14001, 45001, 19011, and the newer clause changes.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "MN",
    name: "Monika Nishad",
    role: "Junior Engineer · Maihar Cement Works",
    bg: "#FF9300"
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
    bg: "#0096FF"
  },
  {
    q: "Real plant scenarios in the audit examples made ISO concepts click.",
    rate: "★★★★★",
    sub: "Score: 28/30",
    av: "SV",
    name: "Simant Raj Vishwakarma",
    role: "Assistant Manager · Indorama India Pvt Ltd",
    bg: "#FF9300"
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
    bg: "#0096FF"
  },
  {
    q: "Found the ISO-based examples helpful.",
    rate: "★★★★☆",
    sub: "Score: 26/30",
    av: "RM",
    name: "Rajnish Mishra",
    role: "Assistant Manager · Ultratech Cement, Shahjahanpur",
    bg: "#FF9300"
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
    bg: "#0096FF"
  },
  {
    q: "Understood how ISO 9001, 14001, and 45001 come together into one integrated system.",
    rate: "★★★★☆",
    sub: "Score: 26/30",
    av: "KK",
    name: "Kishor Kunal",
    role: "AGM, GE & Inspection · Indorama India Pvt Ltd",
    bg: "#FF9300"
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

const LOGOS = Array.from({ length: 22 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    src: `/assets/eGrowth_Web_logo/eGrowth_Web_logo-${num}.webp`,
    alt: `Partner organisation ${i + 1}`,
  };
});

const CATEGORY_DETAILS = {
  "Energy Management": {
    image: courseWorkshop,
    title: "Energy Management & Efficiency",
    desc: "Optimize energy consumption, implement ISO 50001 standards, and learn to perform energy reviews and audits to achieve sustainability goals.",
    count: "12+ Courses Available"
  },
  "Quality Management": {
    image: courseMeeting,
    title: "Quality Management & Six Sigma",
    desc: "Drive process excellence, reduce defects, and implement key QMS frameworks using industry-standard tools like RCA, FMEA, and APQP.",
    count: "18+ Courses Available"
  },
  "ISO Systems": {
    image: isoDashboard,
    title: "Leading ISO Categories for Professionals",
    desc: "Explore our most in-demand ISO course categories chosen by professionals to support compliance, skill development, and career growth.",
    count: "60+ Courses Available"
  },
  "Environmental Management": {
    image: courseLecture,
    title: "Environmental & Sustainability",
    desc: "Master waste management, circular economy practices, and environmental compliance audits under the globally recognized ISO 14001 standard.",
    count: "24+ Courses Available"
  }
};

const getCourseImage = (title) => {
  const t = title.toLowerCase();
  if (t.includes("six sigma")) return courseMeeting;
  if (t.includes("energy review")) return courseLecture;
  if (t.includes("awareness")) return courseWorkshop;
  if (t.includes("14001")) return coursePresentation;
  if (t.includes("nebosh")) return courseWorkshop;
  return courseMeeting;
};

export default function HomePage() {
  const nav = useNavigate();
  const progRef = useRef(null);
  const likeRef = useRef(null);
  const testiRef = useRef(null);
  const [nlDone, setNlDone] = useState(false);
  const [activeTab, setActiveTab] = useState("ISO Systems");

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleTestiScroll = () => {
    const el = testiRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = testiRef.current;
    if (!el) return;

    // Initialize state
    handleTestiScroll();

    const interval = setInterval(() => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScrollLeft - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 364, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* <NavBar /> */}

      {/* HERO */}
      {/* <div className="max-sm:px-4"> */}


      <section className="hero max-lg:px-3 overflow-hidden" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} id="top">
        <div className="wrap hero-in hero-grid min-w-0 max-w-full overflow-hidden">
          <div className="min-w-0">
            <div className="eyebrow eyebrow-white break-words">Advancing Learning, Skills &amp; Excellence</div>
            <h1 className="break-words">Build a <span className="hl">QHSE &amp; ESG</span> career that gets recognised<span className="text-[#f18032]">.</span></h1>
            <p className="sub break-words">Practical, industry-focused ISO certification courses that turn knowledge into real workplace skills, backed by a free global community of more than 48,000 practitioners<span className="text-[#f18032]">.</span></p>
            <div className="cta relative z-20 pointer-events-auto">
              <button type="button" className="btn btn-energy hover-btn hover:bg-[#005391] borderhover !px-4 !py-2 !text-[13px] md:!text-[14px] md:!px-5 md:!py-2.5 max-w-[160px] md:max-w-none cursor-pointer relative z-20" onClick={() => nav("/courses")}>Explore Courses</button>
              {/* <button className="btn btn-outline hover-btn text-white" onClick={() => nav("/portal")}>Join Community </button> */}
              <button type="button" className="btn btn-outline hover-btn text-white !px-4 !py-2 !text-[13px] md:!text-[14px] md:!px-5 md:!py-2.5 max-w-[160px] md:max-w-none cursor-pointer relative z-20" onClick={() => nav("/coming-soon")}>Join Community</button>
            </div>
            <div className="stats" id="heroStats">
              <div><div className="n">48K+</div><div className="l">Members</div></div>
              <div><div className="n">108</div><div className="l">Courses</div></div>
              <div><div className="n">4,219</div><div className="l">Free resources</div></div>
              <div><div className="n">18</div><div className="l">States</div></div>
            </div>
          </div>
          <HeroCarousel />
        </div>
      </section>

      {/* TRAINING PROGRAMS CAROUSEL */}
      {/* <section className="pad  wrap">
        <div className="crow-head">
          <div><div className="eyebrow">Explore our training programs</div><h2>Trainings for every stage</h2></div>
          <div className="crow-nav">
            <button onClick={() => progRef.current?.scrollBy({ left: -340, behavior: "smooth" })}>←</button>
            <button onClick={() => progRef.current?.scrollBy({ left: 340, behavior: "smooth" })}></button>
          </div>
        </div>
        <div className="crow" id="prog" ref={progRef}>
          {COURSES_TO_RENDER.map(c => (
            <div key={c.title} className={`course ${c.tag === "Coming Soon" ? "pointer-events-none" : ""}`} onClick={() => c.tag !== "Coming Soon" && nav(c.href)}>
              <a className="thumb" style={{ background: c.bg }}><span className="tag">{c.tag}</span></a>
              <div className="body">
                <h3>{c.title}</h3>
                <div className="meta">{c.level}</div>
                <div className="foot">
                  <span className={`price${c.free && c.tag !== "Coming Soon" ? " free" : ""}`}>{c.price}</span>
                  <a className="btn btn-outline" style={{ padding: "7px 14px", fontSize: 13 }}>
                    {c.tag === "Coming Soon" ? "Coming Soon" : c.free ? "Start free " : "Enrol "}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* <section className="pad wrap py-16 bg-white">
        <div className="mb-10">
          <h2 className="text-[32px] font-bold text-slate-800 mb-4">
            Explore Our Training Programs
          </h2>

          <div className="rec-nav-btns">
            <button
              onClick={() =>
                progRef.current?.scrollBy({ left: -344, behavior: "smooth" })
              }
              className="circle-nav-btn prev"
            >
              ‹
            </button>

            <button
              onClick={() =>
                progRef.current?.scrollBy({ left: 344, behavior: "smooth" })
              }
              className="circle-nav-btn next"
            >
              ›
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center py-24 text-center">
        <span className="text-3xl font-bold text-slate-800 tracking-tight">
          Coming Soon
        </span>
        <div className="w-12 h-1 bg-[#0096FF] rounded-full mt-3 opacity-60"></div>
      </div> */}

      {/* Cards */}
      {/* <div
          className="crow flex gap-6 overflow-x-auto scrollbar-hide pb-2"
          id="prog"
          ref={progRef}
        >
          {PROG_COURSES.map((c) => (
            <div
              key={c.title}
              className="course bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 duration-300 cursor-pointer shrink-0 w-[320px]"
              onClick={() => nav(c.href)}
            >
              <a
                className=" block h-42 overflow-hidden relative"
              >
                {c.image && (
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </a>

              <div className="body p-5">
                <div className="flex items-center gap-1.5 text-[11px] mb-2 font-medium">
                  <span className="text-[#0096FF] font-bold">★ 0</span>
                  <span className="text-gray-400">{c.tag}</span>
                </div>

                <h3 className="text-[17px] font-bold text-slate-800 leading-snug line-clamp-2 min-h-[48px] mb-2">
                  {c.title}
                </h3>

                <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed min-h-[36px] mb-4">
                  {c.desc}
                </p>

                <div className="foot flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-sm">
                    <span className="text-gray-400 line-through text-xs">
                      {c.free ? "₹2900" : (c.price === "₹4,999" ? "₹9999" : c.price === "₹17,999" ? "₹24999" : c.price === "₹12,999" ? "₹19999" : c.price === "₹6,499" ? "₹9999" : "₹2900")}
                    </span>
                    <span className="text-[#0096FF] font-bold text-[15px]">
                      {c.free ? "Free" : c.price}
                    </span>
                  </div>

                  <a className="bg-[#0096FF] text-white rounded-lg px-4 py-2 text-[11px] font-bold tracking-wider hover:bg-[#005391] hover:text-white transition duration-150  capitalize">
                    
                    coming soon
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      {/* </section> */}


      {/* TRUSTED BY */}
      {/* <section className="wrap " style={{ padding: "10px 28px 30px" }}>
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700, marginBottom: 8 }}>Trusted by professionals at leading organisations</p>
        <div className="logos">
          <div className="logos-track">
            {[...LOGOS, ...LOGOS].map((l, i) => <img className="" key={i} src={l.src} alt={l.alt} />)}
          </div>
        </div>
      </section> */}

      {/* <section className="trusted-logo-section w-full bg-white overflow-hidden">
          <div className="w-full">

            <Swiper
              className="logos trusted-logos-swiper"
              modules={[Autoplay]}
              slidesPerView="auto"
              spaceBetween={64}
              loop
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              allowTouchMove={false}
            >
              {LOGOS.map((logo) => (
                <SwiperSlide key={logo.alt}>
                  <img src={logo.src} alt={logo.alt} loading="lazy" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section> */}

      <section className="trusted-logo-section">
        <div className="trusted-logos">
          <div className="trusted-logos-track">
            {[...LOGOS, ...LOGOS].map((logo, index) => (
              <div className="trusted-logo-item" key={`${logo.alt}-${index}`}>
                <img src={logo.src} alt={logo.alt} loading="eager" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="pad  wrap" id="services">
        <div className="sec-head" style={{ textAlign: "center", margin: "0 auto 36px" }}>
          <div className="eyebrow">What we do</div>
          <h2>Training, Certification and Documentation for QHSE &amp; ESG</h2>
          <p>We help individuals and organisations build real competence and stay compliant across the world's major management-system standards, through public courses, in-house programmes, and ready-to-use documentation.</p>
        </div>
        <div className="cards-3">
          {SERVICES.map((service, index) => (
            <div key={service.h} className="tile service-tile">
              <div className="ic" aria-hidden="true">
                <img src={SERVICE_IMAGES[index]} alt="" />
              </div>
              <div className="service-tile-content">
                <h3>{service.h}</h3>
                <p>{service.p}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="service-cta-row" style={{ textAlign: "center", marginTop: 30 }}>
          <button className="btn btn-energy" onClick={() => nav("/courses")}>Browse All Courses </button>{" "}
          <button className="btn btn-outline  service-request-btn" onClick={() => nav("/contact")}>Request in-house training </button>
        </div>
      </section>

      {/* POPULAR CATEGORIES (dark) */}
      <section className="pad wrap">
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
            {/* Image container */}
            <div className="vis">
              <img
                src={CATEGORY_DETAILS[activeTab].image}
                alt={CATEGORY_DETAILS[activeTab].title}
              />
            </div>
            {/* Details container */}
            <div className="details">
              <h3>{CATEGORY_DETAILS[activeTab].title}</h3>
              <p>{CATEGORY_DETAILS[activeTab].desc}</p>
              <div className="count">{CATEGORY_DETAILS[activeTab].count}</div>
              <button className="btn borderhover  btn-energy" onClick={() => nav("/courses")}>
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* POWERED BY BEXEX */}
      <section className="pad" style={{ background: "#eaf2fa" }}>
        <div className="wrap">
          <div className="sec-head-redesign">
            <div className="eyebrow">A Bexex Global company</div>
            <h2 className="nowrap-h2">Training powered by <span>BexexGlobal.com</span></h2>
            <p>eGrowth India is the flagship QHSE &amp; ESG learning venture of <strong>Bexex Global</strong>, a New Delhi technology &amp; consulting company building digital platforms that make professional growth accessible across emerging markets.</p>
          </div>

          <div className="bexex-grid">
            <div className="bexex-card">
              <div className="bexex-ic"><img src={icons_05} alt="" /></div>
              <div className="bexex-card-content">
                <h3>Certified instructors</h3>
                <p>Every program is built and delivered by practising QHSE &amp; ESG professionals.</p>
              </div>
            </div>

            <div className="bexex-card">
              <div className="bexex-ic"><img src={icons_14} alt="" /></div>
              <div className="bexex-card-content">
                <h3>Recognised certificates</h3>
                <p>Aligned to NEBOSH, CQI/IRCA and BEE, accepted by 200+ employers.</p>
              </div>
            </div>

            <div className="bexex-card">
              <div className="bexex-ic"><img src={icons_09} alt="" /></div>
              <div className="bexex-card-content">
                <h3>One identity</h3>
                <p>Courses sync with your community profile, progress and Merit.</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a className="btn btn-energy" href="https://www.bexexglobal.com" target="_blank" rel="noopener">Learn about Bexex Global </a>
          </div>
        </div>
      </section>

      {/* RECOMMENDED COURSES */}
      {/* <section className="pad wrap py-10" > */}
      {/* <div className="rec-header">
          <div>
            <div className="eyebrow">Recommended</div>
            <h2>Courses you may like</h2>
          </div>
          <div className="rec-nav-btns">
            <button
              onClick={() => likeRef.current?.scrollBy({ left: -344, behavior: "smooth" })}
              className="circle-nav-btn prev"
            >
              ‹
            </button>
            <button
              onClick={() => likeRef.current?.scrollBy({ left: 344, behavior: "smooth" })}
              className="circle-nav-btn next"
            >
              ›
            </button>
          </div>
        </div> */}
      {/* <div className="flex flex-col justify-center items-center py-24 text-center">
        <span className="text-3xl font-bold text-slate-800 tracking-tight">
          Coming Soon
        </span>
        <div className="w-12 h-1 bg-[#0096FF] rounded-full mt-3 opacity-60"></div>
      </div> */}

      {/* <div className="rec-courses-row " id="like" ref={likeRef}>
          {LIKE_COURSES.map(c => {
            const imgUrl = getCourseImage(c.title);
            return (
              <div
                key={c.title}
                className="course-card-redesign "
                onClick={() => nav("/courses")}
              >
                <a className="course-thumb-redesign">
                  <img className="rounded-lg-course" src={imgUrl} alt={c.title} />
                </a>
                <div className="course-body-redesign">
                  <div className="course-rating-line">
                    <span className="rating-star">★ 0</span>
                    <span className="rating-tag">{c.tag}</span>
                  </div>

                  <h3 className="course-title-redesign">
                    {c.title}
                  </h3>

                  <div className="course-level-redesign">
                    {c.level}
                  </div>

                  <div className="course-foot-redesign">
                    <div className="course-price-box">
                      <span className="course-price-original">
                        {c.price === "₹7,999" ? "₹12,999" : c.price === "₹8,999" ? "₹14,999" : c.price === "₹1,999" ? "₹3,999" : c.price === "₹4,999" ? "₹9,999" : c.price === "₹39,999" ? "₹49,999" : "₹9,999"}
                      </span>
                      <span className="course-price-final">
                        {c.price}
                      </span>
                    </div>
                    <button className="course-enrol-btn">
                      coming soon
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}
      {/* </section> */}

      {/* WHY CHOOSE US */}
      <section className="pad" >
        <div className="wrap">
          <div className="sec-head-redesign ">
            <div className="eyebrow">Discover the difference</div>
            <h2 className="">Why choosing us is the best option for your learning</h2>
          </div>

          <div className="why-grid-redesign">
            {[
              { ic: "🎯", h: "Expertise & experience", p: "Years of industry experience and a proven track record of helping professionals grow." },
              { ic: "🧩", h: "Tailored solutions", p: "Courses mapped to real roles, from awareness inductions to lead-auditor exam prep." },
              { ic: "🛠️", h: "Comprehensive service", p: "Training, certification, community and resources, everything in one ecosystem." },
              { ic: "🚀", h: "Proactive approach", p: "Up-to-date content reflecting the latest standards, revisions and best practice." },
              { ic: "🤝", h: "Continuous support", p: "A 48K-strong community answers your questions long after the course ends." },
              { ic: "📈", h: "Results-driven", p: "94% first-attempt pass rates and certificates employers actually recognise." },
            ].map((f, index) => (
              <div key={f.h} className="why-card-redesign">
                <div className="why-ic-redesign">
                  <img src={WHY_IMAGES[index]} alt="" />
                </div>
                <div className="why-card-content">
                  <h4>{f.h}</h4>
                  <p>{f.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="pad wrap">
        <div className="rec-header">
          <div>
            <div className="eyebrow">What learners say</div>
            <h2>Trusted Opinions from Industry Professionals</h2>
          </div>
          <div className="rec-nav-btns">
            <button
              onClick={() => testiRef.current?.scrollBy({ left: -364, behavior: "smooth" })}
              className={`circle-nav-btn prev ${canScrollLeft ? "active" : "inactive"}`}
              disabled={!canScrollLeft}
            >
              ‹
            </button>
            <button
              onClick={() => testiRef.current?.scrollBy({ left: 364, behavior: "smooth" })}
              className={`circle-nav-btn next ${canScrollRight ? "active" : "inactive"}`}
              disabled={!canScrollRight}
            >
              ›
            </button>
          </div>
        </div>

        <div className="testi-row-redesign" id="testiRow" ref={testiRef} onScroll={handleTestiScroll}>
          {TESTIS.map(t => (
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

        <div className="rstrip-redesign">
          <div className="ritem-redesign">
            <span className="n">96%</span>
            <span className="l">average final score, ISO 9001 cohort</span>
          </div>
          <div className="ritem-redesign">
            <span className="n">94%</span>
            <span className="l">first attempt pass, Lead Auditor</span>
          </div>
          <div className="ritem-redesign">
            <span className="n">4.8/5</span>
            <span className="l">average learner rating</span>
          </div>
          <div className="ritem-redesign">
            <span className="n">12,800+</span>
            <span className="l">certificates issued</span>
          </div>
        </div>
      </section>

      {/* RESOURCE LIBRARY STATS */}
      <section className="pad" >
        <div className="wrap reslib-grid">
          <div>
            <div className="eyebrow eyebrow-white">Free resource library</div>
            <h2 className="reslib-h2">Explore our resource library</h2>
            <p style={{ fontSize: 16, color: "var(--muted)", marginTop: 12, lineHeight: 1.6 }}>A superb collection of free templates, checklists, audit kits and documents across QHSE &amp; ESG, all designed to enhance your learning experience.</p>

            <div className="reslib-stats py-9">
              <div className="reslib-stat-item">
                <div className="n">4,219</div>
                <div className="l">Free resources</div>
              </div>
              <div className="reslib-stat-item">
                <div className="n">9/10</div>
                <div className="l">Would recommend</div>
              </div>
              <div className="reslib-stat-item">
                <div className="n">95%</div>
                <div className="l">Found it useful</div>
              </div>
              <div className="reslib-stat-item">
                <div className="n font-mono">40K</div>
                <div className="l">Monthly downloads</div>
              </div>
            </div>

            {/* <button className="btn btn-energy" onClick={() => nav("/portal/library")}>Explore library </button> */}
            <button className="btn btn-energy" >Explore library </button>
          </div>

          <div className="reslib-image-box">
            <img src={library} alt="Library stock photo" />
          </div>
        </div>
      </section>

      {/* 2026 REPORT */}
      <section className="pad wrap px-4 sm:px-6 py-10 md:py-16">
        <div className="report-grid grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="flex flex-col items-start text-left">
            {/* <div className="eyebrow">Coming soon</div> */}
            <h2 className="text-[24px] sm:text-3xl md:text-[32px] font-extrabold leading-tight tracking-tight mt-0" style={{ fontFamily: "'Trebuchet MS', system-ui, sans-serif" }}>
              What we&apos;re building for you <span className="inline-block text-[#0096FF]">in 2026</span>
            </h2>
            <p className="max-w-[500px] w-full text-sm sm:text-base text-gray-600 mt-3.5 leading-relaxed">
              eGrowth India is expanding, digital learning, AI-assisted course recommendations, and new tools to track your professional growth, smarter and more personalised.
            </p>
            <button className="btn btn-energy mt-5 py-2.5 px-6 rounded-xl font-semibold cursor-pointer shadow-xs" onClick={() => nav("/courses")}>
              Explore Courses
            </button>
          </div>

          <div className="w-full flex justify-center items-center">
            <img src={commmingsoon} alt="Global Learning & Skills Trends Report 2026 Mockup" className="w-full max-w-md md:max-w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section-minimal">
        <div className="wrap newsletter-inner-minimal">
          <div className="newsletter-left-minimal">
            <h2>Get Expert Tips Straight to Your Inbox</h2>
          </div>
          <div className="newsletter-right-minimal">
            <span className="newsletter-label-minimal">Subscribe to the newsletter</span>
            {nlDone ? (
              <span className="subscribed-msg-minimal">✓ Subscribed, thank you!</span>
            ) : (
              <form className="newsletter-form-minimal" onSubmit={e => { e.preventDefault(); setNlDone(true); }}>
                <div className="input-group-minimal">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="minimal-input"
                  />
                  <button type="submit" className="newsletter-btn-blue">
                    Subscribe
                  </button>
                </div>
                <p className="terms-text-minimal">By clicking 'Subscribe' you're confirming that you agree with our <span className="font-bold cursor-pointer hover:underline" onClick={() => nav("/terms")}>Terms and Conditions</span>.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
}

