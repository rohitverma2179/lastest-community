import { Link } from "react-router-dom";
import HeroCarousel from "./home/HeroCarousel";
import CategoryShowcase from "./home/CategoryShowcase";
import TestimonialsSection from "./home/TestimonialsSection";
import NewsletterForm from "./home/NewsletterForm";

const heroBg = "/assets/bghero.webp";
const heroBgMobile = "/assets/bghero-mobile.webp";
const commmingsoon = "/assets/Tab.webp";
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

const library = "/assets/labrary.webp";

const SERVICES = [
  { ic: icons_02, h: "ISO Standards Training", p: "ISO 9001, 14001, 45001 and 50001, covering awareness, internal auditor and lead implementer programmes mapped to certification bodies." },
  { ic: "🏭", h: "Onsite Training", p: "Programmes built around your sector, your processes and your team, delivered at your site or online." },
  { ic: "🦺", h: "Health & Safety", p: "NEBOSH IGC preparation, work at height, confined space, permit to work, and ready-to-run toolbox talks." },
  { ic: "◆", h: "Quality & Six Sigma", p: "Quality management, root cause analysis, FMEA, APQP and PPAP, plus Six Sigma Green Belt with a real plant project." },
  { ic: "🌱", h: "Environment, Energy & ESG", p: "Waste management, energy reviews under ISO 50001, and GRI, ESRS and BRSR reporting for sustainability teams." },
  { ic: "📄", h: "Implementation Support", p: "Manuals, procedures, audit checklists and gap assessments, with 4,200+ free community templates to start from." },
];

const SERVICE_IMAGES = [
  { src: icons_02, src64: "/assets/homeIcons/icons-02-64.webp", w: 97, h: 120 },
  { src: icons_03, src64: "/assets/homeIcons/icons-03-64.webp", w: 120, h: 103 },
  { src: icons_04, src64: "/assets/homeIcons/icons-04-64.webp", w: 120, h: 111 },
  { src: icons_13, src64: "/assets/homeIcons/icons-13-64.webp", w: 120, h: 112 },
  { src: icons_12, src64: "/assets/homeIcons/icons-12-64.webp", w: 120, h: 110 },
  { src: icons_15, src64: "/assets/homeIcons/icons-15-64.webp", w: 113, h: 120 },
];

const WHY_IMAGES = [
  { src: icons_10, src64: "/assets/homeIcons/icons-10-64.webp", w: 120, h: 101 },
  { src: icons_11, src64: "/assets/homeIcons/icons-11-64.webp", w: 120, h: 82 },
  { src: icons_01, src64: "/assets/homeIcons/icons-01-64.webp", w: 97, h: 120 },
  { src: icons_06, src64: "/assets/homeIcons/icons-06-64.webp", w: 120, h: 115 },
  { src: icons_07, src64: "/assets/homeIcons/icons-07-64.webp", w: 120, h: 94 },
  { src: icons_08, src64: "/assets/homeIcons/icons-08-64.webp", w: 120, h: 82 },
];

const LOGO_DIMS = [
  [149, 64], [200, 31], [66, 64], [197, 64], [97, 64], [200, 59],
  [200, 55], [99, 64], [156, 64], [121, 64], [78, 64], [64, 64],
  [54, 64], [200, 53], [200, 51], [177, 64], [200, 61], [191, 64],
  [168, 64], [143, 64], [114, 64], [72, 64],
];

const LOGOS = Array.from({ length: 22 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  const [w, h] = LOGO_DIMS[i];
  return {
    src: `/assets/eGrowth_Web_logo/eGrowth_Web_logo-${num}.webp`,
    alt: `Partner organisation ${i + 1}`,
    w,
    h,
  };
});

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero max-lg:px-3 overflow-hidden isolate" id="top">
        <img
          src={heroBg}
          srcSet={`${heroBgMobile} 762w, ${heroBg} 1525w`}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          width={1525}
          height={581}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none -z-[1]"
        />
        <div className="wrap hero-in hero-grid min-w-0 max-w-full overflow-hidden relative z-[1]">
          <div className="min-w-0">
            <div className="eyebrow eyebrow-white break-words">Advancing Learning, Skills &amp; Excellence</div>
            <h1 className="break-words">Build a <span className="hl">QHSE &amp; ESG</span> career that gets recognised<span className="text-[#f18032]">.</span></h1>
            <p className="sub break-words">Practical, industry-focused ISO certification courses that turn knowledge into real workplace skills, backed by a free global community of more than 48,000 practitioners<span className="text-[#f18032]">.</span></p>
            <div className="cta relative z-20 pointer-events-auto">
              <Link to="/courses" className="btn btn-energy hover-btn hover:bg-[#005391] borderhover !px-4 !py-2 !text-[13px] md:!text-[14px] md:!px-5 md:!py-2.5 max-w-[160px] md:max-w-none cursor-pointer relative z-20">Explore Courses</Link>
              <Link to="/coming-soon" className="btn btn-outline hover-btn text-white !px-4 !py-2 !text-[13px] md:!text-[14px] md:!px-5 md:!py-2.5 max-w-[160px] md:max-w-none cursor-pointer relative z-20">Join Community</Link>
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

      <section className="trusted-logo-section">
        <div className="trusted-logos">
          <div className="trusted-logos-track">
            {[...LOGOS, ...LOGOS].map((logo, index) => (
              <div className="trusted-logo-item" key={`${logo.alt}-${index}`}>
                <img src={logo.src} alt={logo.alt} width={logo.w} height={logo.h} loading="lazy" decoding="async" />
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
          <p>We help individuals and organisations build real competence and stay compliant across the world&apos;s major management-system standards, through public courses, in-house programmes, and ready-to-use documentation.</p>
        </div>
        <div className="cards-3">
          {SERVICES.map((service, index) => (
            <div key={service.h} className="tile service-tile">
              <div className="ic" aria-hidden="true">
                <img src={SERVICE_IMAGES[index].src64} srcSet={`${SERVICE_IMAGES[index].src64} 64w, ${SERVICE_IMAGES[index].src} 120w`} sizes="(max-width: 767px) 46px, 60px" alt="" width={SERVICE_IMAGES[index].w} height={SERVICE_IMAGES[index].h} loading="lazy" decoding="async" />
              </div>
              <div className="service-tile-content">
                <h3>{service.h}</h3>
                <p>{service.p}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="service-cta-row" style={{ textAlign: "center", marginTop: 30 }}>
          <Link to="/courses" className="btn btn-energy">Browse All Courses </Link>{" "}
          <Link to="/contact" className="btn btn-outline  service-request-btn">Request in-house training </Link>
        </div>
      </section>

      {/* POPULAR CATEGORIES (dark) */}
      <section className="pad wrap">
        <CategoryShowcase />
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
              <div className="bexex-ic"><img src="/assets/homeIcons/icons-05-64.webp" srcSet="/assets/homeIcons/icons-05-64.webp 64w, /assets/homeIcons/icons-05.webp 120w" sizes="(max-width: 767px) 46px, 60px" alt="" width={110} height={120} loading="lazy" decoding="async" /></div>
              <div className="bexex-card-content">
                <h3>Certified instructors</h3>
                <p>Every program is built and delivered by practising QHSE &amp; ESG professionals.</p>
              </div>
            </div>

            <div className="bexex-card">
              <div className="bexex-ic"><img src="/assets/homeIcons/icons-14-64.webp" srcSet="/assets/homeIcons/icons-14-64.webp 64w, /assets/homeIcons/icons-14.webp 120w" sizes="(max-width: 767px) 46px, 60px" alt="" width={120} height={95} loading="lazy" decoding="async" /></div>
              <div className="bexex-card-content">
                <h3>Recognised certificates</h3>
                <p>Aligned to NEBOSH, CQI/IRCA and BEE, accepted by 200+ employers.</p>
              </div>
            </div>

            <div className="bexex-card">
              <div className="bexex-ic"><img src="/assets/homeIcons/icons-09-64.webp" srcSet="/assets/homeIcons/icons-09-64.webp 64w, /assets/homeIcons/icons-09.webp 120w" sizes="(max-width: 767px) 46px, 60px" alt="" width={120} height={92} loading="lazy" decoding="async" /></div>
              <div className="bexex-card-content">
                <h3>One identity</h3>
                <p>Courses sync with your community profile, progress and Merit.</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a className="btn btn-energy" href="https://www.bexexglobal.com" target="_blank" rel="noopener noreferrer">Learn about Bexex Global </a>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="pad cv-auto" >
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
                  <img src={WHY_IMAGES[index].src64} srcSet={`${WHY_IMAGES[index].src64} 64w, ${WHY_IMAGES[index].src} 120w`} sizes="(max-width: 767px) 46px, 60px" alt="" width={WHY_IMAGES[index].w} height={WHY_IMAGES[index].h} loading="lazy" decoding="async" />
                </div>
                <div className="why-card-content">
                  <h3>{f.h}</h3>
                  <p>{f.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="pad wrap cv-auto">
        <TestimonialsSection />

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
      <section className="pad cv-auto" >
        <div className="wrap reslib-grid">
          <div>
            <div className="eyebrow">Free resource library</div>
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

            <Link to="/resources" className="btn btn-energy">Explore library </Link>
          </div>

          <div className="reslib-image-box">
            <img src={library} alt="Library stock photo" width={800} height={436} loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {/* 2026 REPORT */}
      <section className="pad wrap px-4 sm:px-6 py-10 md:py-16 cv-auto">
        <div className="report-grid grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="flex flex-col items-start text-left">
            <h2 className="text-[24px] sm:text-3xl md:text-[32px] font-extrabold leading-tight tracking-tight mt-0" style={{ fontFamily: "'Trebuchet MS', system-ui, sans-serif" }}>
              What we&apos;re building for you <span className="inline-block text-[#0069B8]">in 2026</span>
            </h2>
            <p className="max-w-[500px] w-full text-sm sm:text-base text-gray-600 mt-3.5 leading-relaxed">
              eGrowth India is expanding, digital learning, AI-assisted course recommendations, and new tools to track your professional growth, smarter and more personalised.
            </p>
            <Link to="/courses" className="btn btn-energy mt-5 py-2.5 px-6 rounded-xl font-semibold cursor-pointer shadow-xs">
              Explore Courses
            </Link>
          </div>

          <div className="w-full flex justify-center items-center">
            <img src={commmingsoon} alt="Global Learning & Skills Trends Report 2026 Mockup" width={900} height={621} loading="lazy" decoding="async" className="w-full max-w-md md:max-w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section-minimal cv-auto">
        <div className="wrap newsletter-inner-minimal">
          <div className="newsletter-left-minimal">
            <h2>Get Expert Tips Straight to Your Inbox</h2>
          </div>
          <div className="newsletter-right-minimal">
            <span className="newsletter-label-minimal">Subscribe to the newsletter</span>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
