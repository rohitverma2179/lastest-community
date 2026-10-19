'use client';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, CheckCircle2, Shield, Award, Users, BookOpen, Leaf, Lock } from "lucide-react";
import { FiUsers, FiSettings, FiMonitor, FiSearch, FiGrid, FiDatabase } from "react-icons/fi";
import { HiOutlineAcademicCap, HiOutlineOfficeBuilding, HiOutlineClipboardList, HiOutlineFolder } from "react-icons/hi";
import { BsShieldCheck, BsPersonBadge, BsTree } from "react-icons/bs";
const landinghero = "/assets/bghero.png";
const adsbg = "/assets/bghero.png";

/* ─── Course / Standard data ─────────────────────────────────────── */
const STANDARDS = [
  {
    id: "iso27001",
    icon: <Lock size={22} />,
    tag: "Information Security",
    title: "ISO 27001 training India: information security management",
    subtitle: "Information Security Management",
    color: "bg-[#0073c4]",
    gradient: "linear-gradient(135deg,#0a3556,#155d92,#1d77b8)",
    desc: "ISO 27001 is the international standard for information security management systems (ISMS). ISO 27001 training India teams look for covers information risk, control selection and audit readiness. To discuss ISO 27001 requirements, contact Egrowth India.",
  },
  {
    id: "iso9001",
    icon: <Award size={22} />,
    tag: "Quality",
    title: "ISO 9001 training India: quality management",
    subtitle: "Quality Management",
    color: "bg-[#1e8a8a]",
    gradient: "linear-gradient(135deg,#0e4040,#1e8a8a,#b8e2e2)",
    desc: "ISO 9001 is the international standard for quality management systems (QMS). ISO 9001 training India quality teams take runs from awareness to internal auditor and lead implementer levels, covering process control, risk-based thinking and corrective action.",
  },
  {
    id: "iso14001",
    icon: <Leaf size={22} />,
    tag: "Environment",
    title: "ISO 14001 training India: environmental management",
    subtitle: "Environmental Management",
    color: "bg-[#2d5a3d]",
    gradient: "linear-gradient(135deg,#2d5a3d,#4a8a5e,#dcefe2)",
    desc: "ISO 14001 is the international standard for environmental management systems (EMS). ISO 14001 training India sites choose explains environmental aspects, legal compliance, operational control and emergency preparedness, which suits plants and facilities managing waste, emissions and resources.",
  },
  {
    id: "iso45001",
    icon: <Shield size={22} />,
    tag: "Safety",
    title: "ISO 45001 training India: occupational health and safety",
    subtitle: "Occupational Health & Safety",
    color: "bg-[#c2700a]",
    gradient: "linear-gradient(135deg,#c2700a,#e08a14,#fdeccb)",
    desc: "ISO 45001 is the international standard for occupational health and safety (OH&S) management systems. ISO 45001 training India safety teams attend focuses on hazard identification, risk assessment and incident investigation, helping employers protect workers and meet safety obligations.",
  },
  {
    id: "ehs",
    icon: <BookOpen size={22} />,
    tag: "EHS",
    title: "EHS training India: environment, health and safety",
    subtitle: "Environment, Health & Safety",
    color: "bg-[#155d92]",
    gradient: "linear-gradient(135deg,#155d92,#1d77b8,#e08a14)",
    desc: "EHS training covers the practical controls that protect people and the environment at work. EHS training India programmes from Egrowth India include work at height, confined space, permit to work, toolbox talks, NEBOSH IGC preparation, waste management and energy reviews under ISO 50001.",
  },
];

const WHO_ATTENDS = [
  { icon: FiUsers,  desc: "HR and compliance heads who need audit-ready policies and evidence" },
  { icon: FiSettings,  desc: "Quality managers and process owners seeking ISO 9001 training India for stronger QMS performance" },
  { icon: BsTree,  desc: "Plant and site managers who plan ISO 14001 training India for waste, emissions and resource control" },
  { icon: BsShieldCheck,  desc: "Safety officers and supervisors who need ISO 45001 training India to control workplace hazards" },
  { icon: FiSettings,  desc: "EHS managers who need EHS training India for day-to-day workplace controls" },
  { icon: FiMonitor,  desc: "IT security teams and risk managers who need ISO 27001 training India for ISMS work" },
  { icon: FiSearch,  desc: "Internal auditors, aspiring lead auditors and working professionals in manufacturing, cement, power, mining, construction and services" },
];

const LEARN_ITEMS = [
  "Read clauses and requirements in plain workplace terms",
  "Plan, conduct and report internal audits and raise corrective actions",
  "Apply risk management to daily operations",
  "Build manuals, procedures and checklists that auditors can follow",
  "Prepare for certification audits and lead auditor exams",
];

const WHY_CHOOSE = [
  { icon: HiOutlineAcademicCap, title: "Practising QHSE and ESG Professionals", desc: "Practising QHSE and ESG professionals build and deliver every programme" },
  { icon: HiOutlineOfficeBuilding, title: "Onsite & Online Training", desc: "Onsite training is built around your sector, processes and team" },
  { icon: HiOutlineClipboardList, title: "Implementation Support", desc: "Implementation support includes manuals, procedures, audit checklists and gap assessments" },
  { icon: HiOutlineFolder, title: "Free Resource Library", desc: "A free library of templates and checklists supports learning after the course" },
];

const STEPS = [
  { n: "01", title: "Decide Your Goal", desc: "Awareness, internal auditor, lead implementer or EHS skills." },
  { n: "02", title: "Choose Your Format", desc: "A public course, or in-house training at your site or online." },
  { n: "03", title: "Browse Courses", desc: "Browse the course list on the Egrowth India website." },
  { n: "04", title: "Contact Egrowth India", desc: "Contact Egrowth India with your requirements and enquire about dates and options." },
];

const FAQS = [
  {
    q: "What is ISO certification training?",
    a: "ISO certification training is structured learning that teaches you to implement, audit and maintain an ISO management system standard such as ISO 9001 or ISO 14001. Courses range from awareness sessions to internal auditor and lead implementer programmes. ISO certification training India professionals attend helps them apply a standard correctly in daily work.",
  },
  {
    q: "Who should attend ISO and EHS training?",
    a: "Managers, auditors, engineers and officers who implement or oversee a management system should attend. That includes HR and compliance heads, quality and EHS managers, IT security teams, plant supervisors, internal auditors and working professionals who want to move into quality, safety, environmental or information security roles.",
  },
  {
    q: "What is the difference between ISO training and ISO certification of an organisation?",
    a: "ISO training builds the skills of individuals, while ISO certification confirms that an organisation's management system meets a standard. Training prepares your people to implement and audit the system. Certification is awarded after an independent certification body audits the organisation. ISO certification training India courses support the first step, not the audit itself.",
  },
  {
    q: "What are the benefits of ISO 27001 training India?",
    a: "ISO 27001 training helps teams build and maintain an information security management system. Participants learn to assess information risks, choose controls and prepare for audits. ISO 27001 training India teams complete strengthens data protection, supports customer confidence and gives IT security staff a shared compliance framework.",
  },
  {
    q: "What are the benefits of ISO 9001 training India?",
    a: "ISO 9001 training helps you run a quality management system that delivers consistent products and services. Participants learn process control, risk-based thinking, internal audits and corrective action. ISO 9001 training India quality teams attend helps reduce repeat errors and supports continual improvement.",
  },
  {
    q: "What are the benefits of ISO 14001 training India?",
    a: "ISO 14001 training helps organisations manage environmental responsibilities in a structured way. Participants learn to identify environmental aspects, meet legal requirements and control waste, emissions and resource use. ISO 14001 training India sites invest in also builds readiness for environmental incidents and audits.",
  },
  {
    q: "What are the benefits of ISO 45001 training India?",
    a: "ISO 45001 training helps employers prevent workplace injury and ill health through a structured occupational health and safety system. Participants learn hazard identification, risk assessment, incident investigation and worker participation. ISO 45001 training India safety teams complete supports legal compliance and a stronger safety culture.",
  },
  {
    q: "What does EHS training cover?",
    a: "EHS training covers environment, health and safety controls at work. Topics include work at height, confined space, permit to work, toolbox talks, waste management and energy reviews. EHS training India employers arrange can also include NEBOSH IGC preparation for safety professionals working towards a formal qualification.",
  },
  {
    q: "How does ISO training help careers or compliance?",
    a: "ISO training builds the auditing, implementation and risk management skills that quality, EHS and IT roles rely on. Trained staff keep documentation, controls and internal audits ready for certification and surveillance audits, which supports both career progression and long-term organisational compliance.",
  },
  {
    q: "How can I enquire or enrol with Egrowth India?",
    a: "Visit the Egrowth India website, browse the course list and use the Contact page to share your requirements. You can ask about public courses or request in-house training for your team, at your site or online. Egrowth India can help you identify the programme that fits your role.",
  },
];

/* ─── Main Component ─────────────────────────────────────────────── */
export default function Landingpage() {
  const nav = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <div className="legacy-styles-wrapper bg-[#f5f6f7] font-['Hanken_Grotesk',system-ui,sans-serif]">

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        className="hero relative overflow-hidden"
        style={{
          backgroundImage: `url(${landinghero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* decorative blobs already handled by .hero::before/after in globals.css */}
        <div className="wrap hero-in relative z-10 py-20 md:py-28">
          <div className="max-w-[760px]">
            <div className="eyebrow-white mb-4">ISO Certification Training India</div>
            <h1 className="font-['Newsreader',Georgia,serif] text-[clamp(28px,5vw,52px)] font-extrabold text-white leading-[1.12] mb-5">
              Practical Courses for{" "}
              <span className="text-[#33acff]">Compliance</span> and Careers
            </h1>
            <p className="text-[rgba(255,255,255,.84)] text-[clamp(15px,2vw,18.5px)] leading-relaxed max-w-[600px] mb-8">


              ISO certification training India professionals can use at work teaches them to implement, audit and improve management systems built on international standards. Egrowth India, the flagship QHSE and ESG learning venture of Bexex Global, delivers ISO and EHS courses through public programmes and in-house training.
              Learn alongside a free community of more than <strong className="text-white">48,000 practitioners</strong>. Enquire now to find the right course for your role or team.

            </p>
            <div className="flex flex-wrap gap-3">
              <button
                id="lp-enquire-hero"
                onClick={() => nav("/contact")}
                className="btn btn-energy"
              >
                Enquire Now <ArrowRight size={16} />
              </button>
              <button
                id="lp-courses-hero"
                onClick={() => nav("/courses")}
                className="btn btn-outline hover-btn text-white !px-4 !py-2 !text-[13px] md:!text-[14px] md:!px-5 md:!py-2.5 max-w-[160px] md:max-w-none cursor-pointer relative z-20"
              >
                Browse Courses
              </button>
            </div>

            {/* Stats */}
            <div className="stats mt-10">
              <div><div className="n">48K+</div><div className="l">Community Members</div></div>
              <div><div className="n">108</div><div className="l">Courses</div></div>
              <div><div className="n">5</div><div className="l">ISO Standards</div></div>
              <div><div className="n">18</div><div className="l">States</div></div>
            </div>
          </div>
        </div>
      </section>


      <section className="relative overflow-hidden bg-[#fbfcfe]    py-16 md:py-24" id="lp-what-is">
        <div className="wrap">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

            {/* Left — Content */}
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#f3dfb9] bg-[#fff2d9] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0096ff]" />
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#08283f]">
                  About ISO Training
                </span>
              </div>

              <h2 className="mb-6 font-['Newsreader',Georgia,serif] text-[clamp(30px,3.2vw,44px)] font-bold leading-[1.13] tracking-[-0.025em] text-[#08283f]">
                What is ISO certification training, and why do Indian organisations need it?
              </h2>

              <div className="space-y-3 text-[15.5px] leading-[1.9] text-[#526170] sm:text-base">
                <p>
                  ISO certification training teaches professionals how an ISO management system standard works and how to apply, audit or maintain it inside an organisation. Programmes range from awareness sessions to internal auditor, lead implementer and lead auditor exam preparation.
                </p>

                <p>
                 Indian organisations need this skill because customers, regulators and supply-chain partners often expect proof of controlled quality, safety, environmental and information security practices. Trained staff help a business prepare for certification and keep its systems effective afterwards.

                </p>
              </div>


            </div>

            {/* Right — Feature Cards */}
            <div className="relative">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#e3f3ff]/70 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#eaf5ff]/80 blur-3xl" />

              <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">

                {[
                  {
                    Icon: HiOutlineClipboardList,
                    label: "Implement",
                    desc: "Build the management system",
                    number: "01",
                  },
                  {
                    Icon: FiSearch,
                    label: "Audit",
                    desc: "Verify and document compliance",
                    number: "02",
                  },
                  {
                    Icon: BsShieldCheck,
                    label: "Maintain",
                    desc: "Keep systems effective",
                    number: "03",
                  },
                  {
                    Icon: HiOutlineAcademicCap,
                    label: "Improve",
                    desc: "Drive continual improvement",
                    number: "04",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-2xl border border-[#e4ebf2] bg-white p-5 shadow-[0_4px_20px_rgba(8,40,63,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#a9dfff] hover:shadow-[0_14px_35px_rgba(0,150,255,0.10)] sm:p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e5f4ff] text-[#0096ff] transition-all duration-300 group-hover:bg-[#0096ff] group-hover:text-white">
                        <item.Icon size={25} />
                      </div>

                      <span className="text-xs font-semibold tracking-widest text-[#c4d1de]">
                        {item.number}
                      </span>
                    </div>

                    <div className="mt-8">
                      <h3 className="mb-2 text-lg font-bold tracking-tight text-[#08283f]">
                        {item.label}
                      </h3>
                      <p className="text-sm leading-6 text-[#657484]">
                        {item.desc}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#0096ff] transition-all duration-300 group-hover:w-full" />
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ══════════════════════ OUR PROGRAMMES ══════════════════════ */}
      <section className="pad" style={{ background: "#fff" }} id="lp-programmes">
        <div className="wrap">
          <div className="sec-head text-center mx-auto mb-10">
            <div className="eyebrow mb-2">Our Programmes</div>
            <h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12]">
              Our ISO certification training India programmes
            </h2>
            <p className="text-[#4A4A4A] text-[15.5px] mt-3 leading-relaxed">
              Egrowth India builds its standards training around the roles people actually hold, from awareness inductions to internal auditor and lead implementer levels. Courses are mapped to certification bodies and can run at your site or online.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STANDARDS.map((s) => (
              <div
                key={s.id}
                className="tile flex flex-col gap-4 p-6 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(8,40,63,.14)] transition-all duration-200"
              >
                {/* colour thumb */}

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white flex-shrink-0"
                      style={{ background: "#0096FF" }}
                    >
                      {s.icon}
                    </span>
                    <span className="font-extrabold text-[#08283f] text-[18px] font-['Newsreader',Georgia,serif]">
                      {s.title}
                    </span>
                  </div>
                  <div className="text-[#0073c4] font-semibold text-[13.5px] mb-2">{s.subtitle}</div>
                  <p className="text-[#4A4A4A] text-[13.5px] leading-relaxed">{s.desc}</p>
                </div>
                <button
                  id={`lp-enquire-${s.id}`}
                  onClick={() => nav("/contact")}
                  className="btn btn-outline mt-auto self-start hover:text-white btn btn-outline btn-light"
                  style={{ padding: "8px 16px", fontSize: 13 }}
                >
                  Enquire <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHO SHOULD ATTEND ══════════════════════ */}
      <section className="pad" style={{ background: "#eef4f8" }} id="lp-who">
        <div className="wrap">
          <div className="sec-head text-center mx-auto mb-10">
            <div className="eyebrow mb-2">Who Should Attend</div>
            <h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12]">
              Who should attend ISO and EHS training?
            </h2>
            <p className="text-[#4A4A4A] text-[15.5px] mt-3 max-w-[720px] mx-auto leading-relaxed">
             ISO and EHS training suits anyone who implements, audits or is accountable for a management system or workplace controls. Typical participants include:
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHO_ATTENDS.map((w) => (
              <div
                key={w.label}
                className="tile flex gap-4 items-start p-5 hover:-translate-y-1 transition-transform duration-200"
              >
                <div
                  className="ic flex-shrink-0"
                  style={{ background: "#e3f3ff", color: "#0096FF" }}
                >
                  <w.icon size={22} />
                </div>
                <div>
                  {/* <div className="font-bold text-[#08283f] text-[15px] mb-1">{w.label}</div> */}
                  <div className="text-[#4A4A4A] text-[13.5px]">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ISO 27001 specific callout */}
          <div className="mt-8 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4 bg-white border border-[#e4e7ea]">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
              style={{ background: "#0096FF" }}
            >
              <Lock size={20} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-[#08283f] text-[15px] mb-1">Who should attend ISO 27001 training?</div>
              <p className="text-[#4A4A4A] text-[13.5px] leading-relaxed">
                IT security teams, ISMS coordinators, compliance managers and risk owners gain the most. Anyone supporting customer security reviews also benefits.
              </p>
            </div>
            <button
              id="lp-enquire-27001"
              onClick={() => nav("/contact")}
              className="btn btn-energy flex-shrink-0"
              style={{ fontSize: 13, padding: "9px 18px" }}
            >
              Enquire
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHAT YOU LEARN ══════════════════════ */}
      <section className="pad" style={{ background: "#fff" }} id="lp-learn">
        <div className="wrap">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow mb-3">What You Learn</div>
              <h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12] mb-4">
                What will you learn, and how does it help careers and compliance?
              </h2>
              <p className="text-[#4A4A4A] text-[15.5px] leading-relaxed mb-4">
                ISO training gives you the skills to interpret a standard, assess risk, audit a system and drive continual improvement. You learn to:
              </p>
              <p className="text-[#4A4A4A] text-[15.5px] leading-relaxed mb-6">
                For careers, our ISO certification training India courses build the skills behind roles such as internal auditor, quality manager, EHS officer and ISMS coordinator. For compliance, trained teams keep documentation, controls and audits ready year after year.
              </p>
              <button
                id="lp-courses-learn"
                onClick={() => nav("/courses")}
                className="btn btn-energy"
              >
                Browse Courses <ArrowRight size={16} />
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              {LEARN_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 bg-[#f5f6f7] border border-[#e4e7ea] rounded-2xl px-5 py-4"
                >
                  <CheckCircle2 size={18} className="text-[#0096FF] flex-shrink-0 mt-0.5" />
                  <span className="text-[#08283f] text-[14.5px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHY EGROWTH ══════════════════════ */}
      <section
        className=" pad band" style={{ paddingBottom: 60, backgroundImage: `url(${adsbg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        id="lp-why"
      >
        <div className="wrap">
          <div className="sec-head text-center mx-auto mb-10">
            <div className="eyebrow-white mb-2">Why Egrowth India</div>
            <h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-white leading-[1.12]">
              Why choose Egrowth India?
            </h2>
            <p className="text-[rgba(255,255,255,.85)] text-[15.5px] mt-3 max-w-[620px] mx-auto leading-relaxed">
              Egrowth India combines practical ISO and EHS training with a free community and ready-to-use resources. The benefits are straightforward:
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CHOOSE.map((w) => (
              <div
                key={w.title}
                className="hcard flex flex-col gap-3 p-6 hover:bg-[rgba(255,255,255,.12)] transition-colors duration-200 rounded-[22px]"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.14)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}
                >
                  <w.icon size={22} />
                </div>
                <div className="font-bold text-white text-[15px]">{w.title}</div>
                <div className="text-[rgba(255,255,255,.65)] text-[13.5px] leading-relaxed">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ HOW TO GET STARTED ══════════════════════ */}
      <section className="pad" style={{ background: "#eef4f8" }} id="lp-steps">
        <div className="wrap">
          <div className="sec-head text-center mx-auto mb-10">
            <div className="eyebrow mb-2">Get Started</div>
            <h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12]">
              How to get started with ISO certification training India
            </h2>
            <p className="text-[#4A4A4A] text-[15.5px] mt-3 leading-relaxed">
              You can start ISO certification training India in four simple steps:
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s) => (
              <div key={s.n} className="tile p-6 flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-200">
                <div className="font-['Space_Grotesk',system-ui] font-extrabold text-[32px] text-[#0096FF] leading-none">
                  {s.n}
                </div>
                <div className="font-bold text-[#08283f] text-[16px]">{s.title}</div>
                <p className="text-[#4A4A4A] text-[13.5px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 flex flex-wrap gap-3 justify-center">
            <button
              id="lp-enquire-steps"
              onClick={() => nav("/contact")}
              className="btn btn-energy"
            >
              Enquire Now <ArrowRight size={16} />
            </button>
            <button
              id="lp-courses-steps"
              onClick={() => nav("/courses")}
              className="btn btn-outline btn-light"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════ CTA BAND ══════════════════════ */}
      <section
        className=" pad band rounded-none"
        style={{ paddingBottom: 60, backgroundImage: `url(${adsbg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        id="lp-cta"
      >
        <div className="wrap">
          <div className="eyebrow-white mb-3" style={{ color: "rgba(255,255,255,.8)" }}>
            Ready to Start?
          </div>
          <h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-white leading-[1.12] mb-4 max-w-[680px]">
            Ready to start ISO certification training India?
          </h2>
          <p className="text-[rgba(255,255,255,.85)] text-[15.5px] mb-8 max-w-[620px] leading-relaxed">
            Egrowth India helps you build ISO and EHS skills that hold up in audits and in daily operations. Choose ISO 9001, ISO 14001, ISO 45001 or EHS training, or ask about ISO 27001 for your team.
          </p>
          <div className="flex flex-wrap gap-3 justify-start">
            <button
              id="lp-enquire-cta"
              onClick={() => nav("/contact")}
              className="btn btn-light"
              style={{ color: "#08283f" }}
            >
              Enquire Now <ArrowRight size={16} />
            </button>
            <button
              id="lp-courses-cta"
              onClick={() => nav("/courses")}
              className="btn btn-ghost transition-colors hover:!text-black"
              style={{ color: "#ffffff", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#000000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              Browse Courses
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════ FAQ ══════════════════════ */}
      <section className="pad" style={{ background: "#fff" }} id="lp-faq">
        <div className="wrap">
          <div className="sec-head text-center mx-auto mb-10">
            <div className="eyebrow mb-2">FAQs</div>
            <h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="faq" style={{ maxWidth: 820, margin: "0 auto" }}>
            {FAQS.map((f, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={f.q} className={`faq-item ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    id={`faq-${f.q.slice(0, 20).replace(/\s/g, "-").toLowerCase()}`}
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
        </div>
      </section>

      {/* ══════════════════════ FINAL ENQUIRE ══════════════════════ */}
      {/* <section className="pad" style={{ background: "#eef4f8" }} id="lp-final">
        <div className="wrap text-center">
          <div className="eyebrow mb-3">Contact Egrowth India</div>
          <h2 className="font-['Newsreader',Georgia,serif] text-[clamp(22px,3vw,36px)] font-extrabold text-[#08283f] leading-[1.12] mb-4">
            Enquire now or contact Egrowth India today to take the next step
          </h2>
          <p className="text-[#4A4A4A] text-[15.5px] max-w-[560px] mx-auto leading-relaxed mb-8">
            Enquire now or contact Egrowth India today. We help you identify the programme that fits your
            role and arrange public or in-house training for your team.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              id="lp-enquire-final"
              onClick={() => nav("/contact")}
              className="btn btn-energy"
            >
              Enquire Now <ArrowRight size={16} />
            </button>
            <button
              id="lp-courses-final"
              onClick={() => nav("/courses")}
              className="btn btn-outline hover:!text-white transition-colors"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
              }}
            >
              Browse All Courses
            </button>
          </div>
        </div>
      </section> */}

       {/* NEWSLETTER */}
      
    </div>
  );
}
