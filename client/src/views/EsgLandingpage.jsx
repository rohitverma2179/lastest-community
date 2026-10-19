'use client';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Factory,
  GraduationCap,
  Leaf,
  Monitor,
  Recycle,
  Scale,
  Users,
  Zap,
} from "lucide-react";

const landinghero = "/assets/bghero.png";
const adsbg = "/assets/bghero.png";

const COURSE_AREAS = [
  {
    icon: Recycle,
    title: "Waste Management",
    subtitle: "Environmental Performance",
    desc: "Understand how waste management supports environmental performance and responsible operations.",
  },
  {
    icon: Zap,
    title: "ISO 50001 Energy Reviews",
    subtitle: "Energy Management",
    desc: "Learn the role of energy reviews under ISO 50001, the international energy management standard.",
  },
  {
    icon: BarChart3,
    title: "Sustainability Reporting",
    subtitle: "Structured Disclosures",
    desc: "Learn to disclose environmental, social and governance performance in a structured, comparable format.",
  },
  {
    icon: ClipboardCheck,
    title: "GRI, ESRS & BRSR",
    subtitle: "Reporting Frameworks",
    desc: "Build familiarity with global reporting frameworks and India's Business Responsibility and Sustainability Reporting format.",
  },
];

const CAREER_BENEFITS = [
  "Stronger credibility in EHS, sustainability, quality and compliance roles",
  "The ability to support sustainability reports, audits and management reviews",
  "A clearer path from operational roles into ESG reporting teams",
  "Skills that carry across manufacturing, cement, power, mining and services",
];

const ISO_OUTCOMES = [
  "Identify environmental aspects and impacts in your operations",
  "Understand legal and other compliance obligations",
  "Apply operational controls and emergency preparedness",
  "Plan and conduct internal audits and raise corrective actions",
  "Support continual improvement of environmental performance",
];

const LEARNERS = [
  { icon: Factory, desc: "Working professionals in EHS, sustainability, quality and operations roles" },
  { icon: BarChart3, desc: "Managers who oversee environmental performance, audits or reporting" },
  { icon: Scale, desc: "Compliance officers and internal auditors" },
  { icon: Users, desc: "Members of sustainability and ESG reporting teams" },
  { icon: GraduationCap, desc: "Students and graduates planning a career in ESG, sustainability or ISO standards" },
  { icon: Monitor, desc: "Organisations that want to train teams through in-house programmes" },
];

const WHY_CHOOSE = [
  { icon: GraduationCap, title: "Role-mapped Learning", desc: "Progress from awareness to internal auditor, lead implementer and exam preparation levels." },
  { icon: Leaf, title: "ESG + ISO Pathways", desc: "Pair ESG learning with environmental, safety, quality or energy management training." },
  { icon: Users, title: "Public & In-house", desc: "Choose public courses or team programmes shaped around your sector and processes." },
  { icon: BookOpen, title: "Community & Resources", desc: "Join 48,000+ practitioners and use free templates, checklists and audit kits." },
];

const STEPS = [
  { n: "01", title: "Decide Your Goal", desc: "Choose ESG reporting skills, an ISO 14001 environmental management course, or both." },
  { n: "02", title: "Explore Courses", desc: "Browse the course list and select a level that fits your role and experience." },
  { n: "03", title: "Confirm the Details", desc: "Enquire with Egrowth India about current dates, duration and delivery format." },
  { n: "04", title: "Start Learning", desc: "Complete your course and join the free community for continued support." },
];

const FAQS = [
  {
    q: "What is an ESG certification course?",
    a: "An ESG certification course is structured training on how organisations measure, manage and report environmental, social and governance factors. A good ESG certification course India learners choose combines core concepts with frameworks such as GRI, ESRS and BRSR, so skills apply at work.",
  },
  {
    q: "Who is an ESG sustainability course for?",
    a: "An ESG sustainability course suits professionals who gather, review or report environmental, social or governance data, including EHS managers and compliance officers. An ESG sustainability course India professionals take also helps students entering sustainability careers who want practical, role-relevant knowledge.",
  },
  {
    q: "Who can enrol?",
    a: "Eligibility depends on the programme level. Awareness courses suit newcomers, while internal auditor and lead implementer programmes suit people who already work with management systems. Enquire with Egrowth India for the entry requirements of a specific course.",
  },
  {
    q: "How long are the courses?",
    a: "Duration depends on the specific course and format. Check the course page or enquire with Egrowth India for current details on how long your chosen programme runs and how it is delivered, so you can plan around work.",
  },
  {
    q: "Can I learn online?",
    a: "Yes, Egrowth India delivers its training online, so professionals across India can learn from their workplace or home without travelling. Professional certification courses India online suit busy work schedules, and in-house programmes can also run at a company's site.",
  },
  {
    q: "Is the certificate valuable?",
    a: "A certificate from an ESG certification course India learners complete is valuable when it matches your role and reflects structured, practical learning. Employers look for relevant skills too, so choose a programme that fits your goals. Egrowth India maps courses to real roles.",
  },
  {
    q: "What is the career scope after ESG training?",
    a: "ESG skills are relevant across industries because organisations need people who measure, manage and report environmental and social impact. Training can support roles in EHS, sustainability, quality and compliance, and helps with sustainability reports and audits.",
  },
  {
    q: "How is ISO 14001 different from ESG?",
    a: "ISO 14001 is a standard for environmental management systems, while ESG is a broader framework covering environmental, social and governance factors. ISO 14001 builds the controls that manage environmental performance, and ESG reporting communicates the results.",
  },
  {
    q: "What does an ISO 14001 environmental management course cover?",
    a: "It covers environmental aspects and impacts, compliance obligations, operational control, emergency preparedness, internal audits and continual improvement. Egrowth India offers ISO 14001 training at awareness, internal auditor and lead implementer levels.",
  },
  {
    q: "How do I enrol with Egrowth India?",
    a: "Explore the professional certification courses India online, choose the programme that fits your role, and enquire now to confirm course details. Teams can also request in-house training built around their sector, processes and people.",
  },
];

export default function EsgLandingpage() {
  const nav = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="legacy-styles-wrapper bg-[#f5f6f7] font-['Hanken_Grotesk',system-ui,sans-serif]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="hero relative overflow-hidden" style={{ backgroundImage: `url(${landinghero})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="wrap hero-in relative z-10 py-20 md:py-28">
          <div className="max-w-[790px]">
            <div className="eyebrow-white mb-4">ESG Certification Course India</div>
            <h1 className="font-['Newsreader',Georgia,serif] text-[clamp(28px,5vw,52px)] font-extrabold text-white leading-[1.12] mb-5">
              Online Training for <span className="text-[#33acff]">Sustainability</span> and ISO Careers
            </h1>
            <p className="text-[rgba(255,255,255,.84)] text-[clamp(15px,2vw,18.5px)] leading-relaxed max-w-[680px] mb-8">
              Build practical skills in ESG performance, sustainability reporting and ISO-based management systems. Egrowth India offers professional certification courses online for working professionals, managers, compliance officers and students.
            </p>
            <div className="flex flex-wrap gap-3">
              <button id="esg-enquire-hero" onClick={() => nav("/contact")} className="btn btn-energy">Enquire Now <ArrowRight size={16} /></button>
              <button id="esg-courses-hero" onClick={() => nav("/courses")} className="btn btn-outline hover-btn text-white !px-4 !py-2 !text-[13px] md:!text-[14px] md:!px-5 md:!py-2.5 cursor-pointer relative z-20">Explore Courses</button>
            </div>
            <div className="stats mt-10">
              <div><div className="n">48K+</div><div className="l">Community Members</div></div>
              <div><div className="n">Online</div><div className="l">Flexible Learning</div></div>
              <div><div className="n">ESG</div><div className="l">Reporting Skills</div></div>
              <div><div className="n">ISO</div><div className="l">Management Systems</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fbfcfe] py-16 md:py-24" id="esg-about">
        <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#f3dfb9] bg-[#fff2d9] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0096ff]" />
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#08283f]">About ESG Training</span>
            </div>
            <h2 className="mb-6 font-['Newsreader',Georgia,serif] text-[clamp(30px,3.2vw,44px)] font-bold leading-[1.13] tracking-[-0.025em] text-[#08283f]">What is ESG, and what will the course help you do?</h2>
            <div className="space-y-3 text-[15.5px] leading-[1.9] text-[#526170] sm:text-base">
              <p>ESG stands for Environmental, Social and Governance: the three groups of factors organisations use to judge how responsibly they operate.</p>
              <p>A well-chosen course gives you a shared vocabulary, the ability to read and prepare sustainability disclosures, and the confidence to connect ESG goals with daily management systems.</p>
            </div>
          </div>
          <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Leaf, label: "Environmental", desc: "Impact, energy and resources", n: "E" },
              { icon: Users, label: "Social", desc: "People and communities", n: "S" },
              { icon: Scale, label: "Governance", desc: "Controls and accountability", n: "G" },
            ].map((item) => (
              <div key={item.label} className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-2xl border border-[#e4ebf2] bg-white p-5 shadow-[0_4px_20px_rgba(8,40,63,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#a9dfff] hover:shadow-[0_14px_35px_rgba(0,150,255,0.10)]">
                <div className="flex items-start justify-between"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e5f4ff] text-[#0096ff] group-hover:bg-[#0096ff] group-hover:text-white"><item.icon size={25} /></div><span className="text-xl font-bold text-[#c4d1de]">{item.n}</span></div>
                <div><h3 className="mb-2 text-lg font-bold text-[#08283f]">{item.label}</h3><p className="text-sm leading-6 text-[#657484]">{item.desc}</p></div>
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#0096ff] transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pad bg-white" id="esg-covers">
        <div className="wrap">
          <div className="sec-head text-center mx-auto mb-10"><div className="eyebrow mb-2">What It Covers</div><h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12]">ESG certification course India: practical learning areas</h2><p className="text-[#4A4A4A] text-[15.5px] mt-3 leading-relaxed">Egrowth India's Environment, Energy and ESG training focuses on topics sustainability teams handle every day.</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COURSE_AREAS.map((area) => <div key={area.title} className="tile flex flex-col gap-4 p-6 hover:-translate-y-1 transition-all duration-200"><div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#e3f3ff] text-[#0096ff]"><area.icon size={22} /></div><div><h3 className="font-extrabold text-[#08283f] text-[18px] font-['Newsreader',Georgia,serif]">{area.title}</h3><div className="text-[#0073c4] font-semibold text-[13.5px] my-2">{area.subtitle}</div><p className="text-[#4A4A4A] text-[13.5px] leading-relaxed">{area.desc}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="pad bg-[#eef4f8]" id="esg-careers">
        <div className="wrap grid md:grid-cols-2 gap-12 items-center">
          <div><div className="eyebrow mb-3">Career Benefits</div><h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12] mb-4">Build role-relevant ESG and sustainability skills</h2><p className="text-[#4A4A4A] text-[15.5px] leading-relaxed mb-6">The course suits anyone who collects, reviews or acts on ESG information at work, as well as students moving into sustainability roles. For many learners it becomes the first step towards a specialist career.</p><button onClick={() => nav("/courses")} className="btn btn-energy">Browse Courses <ArrowRight size={16} /></button></div>
          <ul className="flex flex-col gap-3">{CAREER_BENEFITS.map((item) => <li key={item} className="flex items-start gap-3 bg-white border border-[#e4e7ea] rounded-2xl px-5 py-4"><CheckCircle2 size={18} className="text-[#0096FF] flex-shrink-0 mt-0.5" /><span className="text-[#08283f] text-[14.5px] leading-relaxed">{item}</span></li>)}</ul>
        </div>
      </section>

      <section className="pad bg-white" id="esg-iso14001">
        <div className="wrap grid md:grid-cols-2 gap-12 items-center">
          <div><div className="eyebrow mb-3">ISO 14001</div><h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12] mb-4">ISO 14001 environmental management course outcomes</h2><p className="text-[#4A4A4A] text-[15.5px] leading-relaxed mb-4">ISO 14001 is the international standard for environmental management systems. Egrowth India offers training at awareness, internal auditor and lead implementer levels, helping you learn what your role actually needs.</p></div>
          <ul className="flex flex-col gap-3">{ISO_OUTCOMES.map((item) => <li key={item} className="flex items-start gap-3 bg-[#f5f6f7] border border-[#e4e7ea] rounded-2xl px-5 py-4"><CheckCircle2 size={18} className="text-[#0096FF] flex-shrink-0 mt-0.5" /><span className="text-[#08283f] text-[14.5px] leading-relaxed">{item}</span></li>)}</ul>
        </div>
        <div className="wrap mt-10"><div className="rounded-2xl border border-[#dce8f0] bg-[#eef8ff] p-6 md:p-8"><h3 className="font-['Newsreader',Georgia,serif] text-2xl font-bold text-[#08283f] mb-3">How do ISO 14001 and ESG work together?</h3><p className="text-[#526170] leading-relaxed">ISO 14001 builds the management system that controls environmental performance and produces reliable evidence. ESG reporting communicates that performance to investors, customers and regulators. Professionals who understand both run stronger systems and write more credible disclosures.</p></div></div>
      </section>

      <section className="pad band" style={{ paddingBottom: 60, backgroundImage: `url(${adsbg})`, backgroundSize: "cover", backgroundPosition: "center" }} id="esg-why">
        <div className="wrap"><div className="sec-head text-center mx-auto mb-10"><div className="eyebrow-white mb-2">Why Egrowth India</div><h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-white leading-[1.12]">Practical training built around real roles</h2><p className="text-[rgba(255,255,255,.85)] text-[15.5px] mt-3 max-w-[660px] mx-auto leading-relaxed">Programmes are built and delivered by practising QHSE and ESG professionals, so the content reflects how standards work in real workplaces.</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{WHY_CHOOSE.map((item) => <div key={item.title} className="hcard flex flex-col gap-3 p-6 rounded-[22px] hover:bg-[rgba(255,255,255,.12)]" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)" }}><div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[rgba(255,255,255,.12)] text-white"><item.icon size={22} /></div><div className="font-bold text-white text-[15px]">{item.title}</div><div className="text-[rgba(255,255,255,.65)] text-[13.5px] leading-relaxed">{item.desc}</div></div>)}</div>
        </div>
      </section>

      <section className="pad bg-[#eef4f8]" id="esg-who"><div className="wrap"><div className="sec-head text-center mx-auto mb-10"><div className="eyebrow mb-2">Who Should Enrol</div><h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12]">Who benefits from ESG and ISO 14001 training?</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{LEARNERS.map((item) => <div key={item.desc} className="tile flex gap-4 items-start p-5 hover:-translate-y-1 transition-transform"><div className="ic flex-shrink-0 bg-[#e3f3ff] text-[#0096FF]"><item.icon size={22} /></div><p className="text-[#4A4A4A] text-[13.5px] leading-relaxed">{item.desc}</p></div>)}</div></div></section>

      <section className="pad bg-white" id="esg-online"><div className="wrap grid md:grid-cols-2 gap-12 items-center"><div><div className="eyebrow mb-3">Flexible Online Learning</div><h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12] mb-4">Professional certification courses India online</h2><p className="text-[#4A4A4A] text-[15.5px] leading-relaxed">Study from your workplace or home without travelling. Teams in different locations can take the same programme, beginners and experienced professionals can start at the right level, and the free resource library supports learning after the course.</p></div><div className="rounded-3xl bg-[#08283f] p-8 text-white"><Monitor size={34} className="text-[#33acff] mb-5" /><h3 className="font-['Newsreader',Georgia,serif] text-2xl font-bold mb-3">Online or at your site</h3><p className="text-[rgba(255,255,255,.75)] leading-relaxed mb-6">Choose flexible online delivery or request an in-house programme built around your company's sector, processes and people.</p><button onClick={() => nav("/contact")} className="btn btn-energy">Discuss Your Requirements <ArrowRight size={16} /></button></div></div></section>

      <section className="pad bg-[#eef4f8]" id="esg-steps"><div className="wrap"><div className="sec-head text-center mx-auto mb-10"><div className="eyebrow mb-2">Get Started</div><h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12]">Start your ESG certification course India journey</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{STEPS.map((step) => <div key={step.n} className="tile p-6 flex flex-col gap-3 hover:-translate-y-1 transition-transform"><div className="font-['Space_Grotesk',system-ui] font-extrabold text-[32px] text-[#0096FF] leading-none">{step.n}</div><div className="font-bold text-[#08283f] text-[16px]">{step.title}</div><p className="text-[#4A4A4A] text-[13.5px] leading-relaxed">{step.desc}</p></div>)}</div><div className="text-center mt-10 flex flex-wrap gap-3 justify-center"><button onClick={() => nav("/contact")} className="btn btn-energy">Enquire Now <ArrowRight size={16} /></button><button onClick={() => nav("/courses")} className="btn btn-outline btn-light">Explore Courses</button></div></div></section>

      <section className="pad band rounded-none" style={{ paddingBottom: 60, backgroundImage: `url(${adsbg})`, backgroundSize: "cover", backgroundPosition: "center" }} id="esg-cta"><div className="wrap"><div className="eyebrow-white mb-3">Ready to Start?</div><h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-white leading-[1.12] mb-4 max-w-[720px]">Turn ESG and ISO knowledge into skills that show up in daily work</h2><p className="text-[rgba(255,255,255,.85)] text-[15.5px] mb-8 max-w-[650px] leading-relaxed">Whether you want an ESG sustainability course online or an ISO 14001 environmental management course, the right programme is a short enquiry away.</p><div className="flex flex-wrap gap-3"><button onClick={() => nav("/contact")} className="btn btn-light" style={{ color: "#08283f" }}>Enquire Now <ArrowRight size={16} /></button><button onClick={() => nav("/courses")} className="btn btn-ghost text-white">Explore Courses</button></div></div></section>

      <section className="pad bg-white" id="esg-faq"><div className="wrap"><div className="sec-head text-center mx-auto mb-10"><div className="eyebrow mb-2">FAQs</div><h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12]">Frequently Asked Questions</h2></div><div className="faq max-w-[820px] mx-auto">{FAQS.map((faq, index) => { const isOpen = openFaqIndex === index; return <div key={faq.q} className={`faq-item ${isOpen ? "open" : ""}`}><button type="button" className="faq-question" onClick={() => setOpenFaqIndex(isOpen ? -1 : index)} aria-expanded={isOpen}><span>{faq.q}</span><ChevronDown size={19} className={`faq-icon transition-transform ${isOpen ? "rotate-180" : ""}`} /></button><div className="faq-answer-wrapper"><div className="faq-answer-inner"><div className="ans">{faq.a}</div></div></div></div>; })}</div></div></section>
    </div>
  );
}
