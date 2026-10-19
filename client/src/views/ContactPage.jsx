'use client';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import NavBar from "../components/shared/NavBar";
// import Footer from "../components/shared/Footer";
const ContactHero = "/assets/bghero.png";
const FaqImage = "/assets/FAQ.png";
const YouTubeIcon = "/assets/socialMediaIcons/Group (1).png";
const InstagramIcon = "/assets/socialMediaIcons/Group (2).png";
const LinkedInIcon = "/assets/socialMediaIcons/Group (3).png";
const FacebookIcon = "/assets/socialMediaIcons/Group (4).png";
const XIcon = "/assets/socialMediaIcons/Group (5).png";
const WhatsAppIcon = "/assets/socialMediaIcons/Group (6).png";



const SOCIAL_ICONS = [YouTubeIcon, InstagramIcon, LinkedInIcon, FacebookIcon, XIcon, WhatsAppIcon];

const QR_CARDS = [
  { href: "https://www.youtube.com/@eGrowthIndiaOfficial", ic: "▶", icBg: "#CC2200", label: "YouTube", sub: "@egrowthindia", qr: "https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&color=2D2D2D&data=https%3A%2F%2Fyoutube.com%2F%40egrowthindia" },
  { href: "https://instagram.com/egrowthindia", ic: "◎", icBg: "#FF9300", label: "Instagram", sub: "@egrowthindia", qr: "https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&color=2D2D2D&data=https%3A%2F%2Finstagram.com%2Fegrowthindia" },
  { href: "https://linkedin.com/company/egrowthindia", ic: "in", icBg: "#0073c4", label: "LinkedIn", sub: "/company/egrowthindia", qr: "https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&color=2D2D2D&data=https%3A%2F%2Flinkedin.com%2Fcompany%2Fegrowthindia" },
  { href: "https://www.facebook.com/profile.php?id=61583777668080", ic: "f", icBg: "#0866FF", label: "Facebook", sub: "/egrowthindia", qr: "https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&color=2D2D2D&data=https%3A%2F%2Ffacebook.com%2Fegrowthindia" },
  { href: "https://x.com/egrowthindia", ic: "X", icBg: "#000", label: "X (Twitter)", sub: "@egrowthindia", qr: "https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&color=2D2D2D&data=https%3A%2F%2Fx.com%2Fegrowthindia" },
  { href: "https://wa.me/919582390987", ic: "✆", icBg: "#1f8a5b", label: "WhatsApp", sub: "+91 9582390987", qr: "https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&color=2D2D2D&data=https%3A%2F%2Fwa.me%2F919582390987" },
];

const FAQS = [
  { q: "Is the community really free?", a: "Yes. Joining the eGrowth community, asking questions, sharing and downloading community resources, and earning Merit are all free, forever. Paid courses on the Learning Hub fund the community." },
  { q: "How do I enrol in a course?", a: "Browse the full catalogue on the Courses page without signing in. When you enrol, you'll create a free account (or log in) and the course opens inside your community dashboard, with progress and certificates synced to your profile." },
  { q: "What is Merit?", a: "Merit is the community's single point system. You earn it by contributing, answering, sharing, passing quizzes, and spend it on downloads and course unlocks. Earned Merit also raises your reputation level. Buying Merit never changes your level." },
  { q: "Are the certificates recognised?", a: "Our certificate programs are aligned to bodies like NEBOSH, CQI/IRCA and BEE, and accepted by 200+ employers across India and the GCC. Free community quizzes are practice, not formal certification." },
  { q: "Do you offer corporate / group training?", a: "Yes, we run tailored QHSE & ESG programs for teams, on-site or live online. Use the enquiry form above and select \"Corporate / group training\"." },
  { q: "Who is eGrowth India?", a: "eGrowth India is a Bexex Global company, founded and run by working QHSE professionals." },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [cbTime, setCbTime] = useState(false);
  const nav = useNavigate();

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <>
      {/* <NavBar active="contact" /> */}

      <section className="hero page-hero" style={{ background: `url(${ContactHero}) right center/cover no-repeat` }} >
        <div className="wrap hero-in">
          <div className="eyebrow eyebrow-white">Get in touch</div>
          <h1>We&apos;d love to <br /> <span className="hl">hear from you<span className="text-[#f18032]">.</span></span></h1>
          <p>Questions about courses, partnerships, corporate training, or the community? Send us a note and the team will get back within one business day.</p>
        </div>
      </section>

      <section className="pad wrap">
        <div className="contact-grid">
          {/* Enquiry form */}
          <div>
            <div className="sec-head" style={{ marginBottom: 22 }}><h2 style={{ fontSize: 24 }}>Send an enquiry</h2></div>
            {sent ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 18, background: "#e2effb", border: "1px solid var(--teal)", borderRadius: 12, color: "var(--teal-d)", fontWeight: 600 }}>
                ✓ Thanks, your enquiry has been sent. We&apos;ll reply within one business day.
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
                <div className="contact-form-row">
                  <div className="field"><label>Full name</label><input required placeholder="Your name" /></div>
                  <div className="field"><label>Email</label><input type="email" required placeholder="you@example.com" /></div>
                </div>
                <div className="contact-form-row">
                  <div className="field"><label>Designation</label><input placeholder="e.g. HSE Manager" /></div>
                  <div className="field"><label>Company / Organisation</label><input placeholder="Your company" /></div>
                </div>
                <div className="contact-form-row">
                  <div className="field">
                    <label>Category</label>
                    <select defaultValue=""><option value="" disabled>Select a Category</option>{["Quality", "Environment", "Health", "Safety", "Welfare", "Energy", "ESG", "Sustainability",].map(d => <option key={d}>{d}</option>)}</select>
                  </div>
                  <div className="field"><label>Phone No.  </label><input placeholder="+91" /></div>
                </div>
                <div className="field">
                  <label>Enquiry type</label>
                  <select>{["Course enquiry", "Corporate / group training", "Partnership", "Community support", "Other"].map(t => <option key={t}>{t}</option>)}</select>
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "13.5px", color: "var(--ink-2)", marginBottom: 12, cursor: "pointer" }}>
                  <input type="checkbox" onChange={e => setCbTime(e.target.checked)} /> Request a callback instead
                </label>
                {cbTime && (
                  <div className="field">
                    <label>Preferred time</label>
                    <select><option>Morning (09:00–12:00 IST)</option><option>Afternoon (12:00–15:00 IST)</option><option>Evening (15:00–17:30 IST)</option></select>
                  </div>
                )}
                <div className="field"><label>Message</label><textarea rows={5} required placeholder="How can we help?"></textarea></div>
                <button className="btn btn-energy" type="submit">Send enquiry →</button>
              </form>
            )}
          </div>

          {/* Contact details */}
          <aside>
            <div className="sec-head" style={{ marginBottom: 14 }}><h2 style={{ fontSize: 24 }}>Reach us</h2></div>
            <div className="info-row"><div className="ic">✉️</div><div><div style={{ fontWeight: 600, fontSize: 14 }}>Email</div><a href="mailto:eGrowthIndia@BexexGlobal.com" style={{ color: "var(--teal)", fontSize: 14, wordBreak: "break-all" }}>eGrowthIndia@BexexGlobal.com</a></div></div>
            <div className="info-row"><div className="ic">📞</div><div><div style={{ fontWeight: 600, fontSize: 14 }}>Phone</div><a href="tel:+919582390987" style={{ color: "var(--teal)", fontSize: 14 }}>+91 9582390987</a></div></div>
            <div className="info-row"><div className="ic">📍</div><div><div style={{ fontWeight: 600, fontSize: 14 }}>Head Office</div><span style={{ color: "var(--muted)", fontSize: 14, wordBreak: "break-word" }}> Plot No. 2-A,

              Ground Floor, Jai Vihar,

              New Delhi - 110043<br /> </span></div></div>
            <div className="info-row"><div className="ic">📍</div><div><div style={{ fontWeight: 600, fontSize: 14 }}>Registered Office</div><span style={{ color: "var(--muted)", fontSize: 14, wordBreak: "break-word" }}>

              Plot No. J04A, Street 12,

              Shiv Ram Park,

              New Delhi - 110041<br /> </span></div></div>
            <div className="contact-action-btns">
              <a className="btn btn-energy" style={{ flex: 1, justifyContent: "center" }} href="https://wa.me/919582390987" target="_blank" rel="noopener">💬 Chat on WhatsApp</a>
              <a className="btn btn-outline btn-light" style={{ flex: 1, justifyContent: "center" }} href="https://maps.app.goo.gl/g4RxxBXibXUs5gC36" target="_blank" rel="noopener">📍 Get directions</a>
            </div>
            <iframe className="map" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3697.8786665699927!2d77.00215931115876!3d28.635348683851063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x597991a7d26f45d%3A0xb5cbced8c1ea2bf5!2sSwastixa%20Digital!5e1!3m2!1sen!2sin!4v1784100139181!5m2!1sen!2sin"
              style={{ width: "100%", height: 240, border: 0, borderRadius: "var(--r)", marginTop: 18, maxWidth: "100%" }} />
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="pad wrap" style={{ paddingTop: 0 }}>
        <div className="contact-faq-grid">
          <div className="width-left">
            <div className="sec-head">
              <div className="eyebrow">FAQ</div>
              <h2 style={{ fontSize: 28 }}>Frequently asked questions</h2>
            </div>

            <div className="faq">
              {FAQS.map((f, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={f.q} className={`faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => toggleFaq(i)}
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
          </div>

          <div className="contact-faq-image">
            <img
              src={FaqImage}
              alt="Frequently asked questions illustration"
            />
          </div>
        </div>
      </section>

      {/* QR codes */}
      <section className="pad" style={{ background: "#eef4f8" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", margin: "0 auto 32px" }}>
            <div className="eyebrow">Follow us</div>
            <h2>Scan to connect</h2>
            <p>Point your phone camera at any code, or tap it, to follow eGrowth India on that platform.</p>
          </div>
          <div className="qr-grid">
            {QR_CARDS.map((c, index) => (
              <a key={c.label} className="qr-card" href={c.href} target="_blank" rel="noopener">
                <img src={c.qr} alt={`${c.label} QR`} loading="lazy" style={{ width: 130, height: 130, borderRadius: 10, display: "block" }} />
                <img className="qr-social-icon" src={SOCIAL_ICONS[index]} alt="" aria-hidden="true" />
                <b>{c.label}</b>
                <small>{c.sub}</small>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
}
