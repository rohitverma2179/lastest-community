'use client';

import { useNavigate } from "react-router-dom";
// import NavBar from "../components/shared/NavBar";
// import Footer from "../components/shared/Footer";

const LOGOS2 = ["NEBOSH", "CQI/IRCA", "BEE", "ISO 9001", "ISO 14001", "ISO 45001", "ISO 50001", "GRI"];

export default function AboutPage() {
  const nav = useNavigate();
  return (
    <>
      {/* <NavBar /> */}

      <section className="hero">
        <div className="wrap hero-in">
          <div className="eyebrow">About us</div>
          <h1>Built by practitioners, for <span className="hl">practitioners.</span></h1>
          <p>eGrowth India exists to make professional growth in Quality, Health, Safety, Environment, Energy &amp; ESG open to everyone, through recognised training and a free, global community.</p>
        </div>
      </section>

      <section className="pad wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr .9fr", gap: 48, alignItems: "start" }}>
          <div className="prose">
            <h3>Our mission</h3>
            <p>QHSE and ESG knowledge saves lives, protects the planet, and builds better businesses, yet too much of it sits behind paywalls or inside a handful of companies. We&apos;re changing that.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, margin: "8px 0 18px" }}>
              <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: 16 }}>
                <div style={{ fontWeight: 700, color: "var(--teal-d)", marginBottom: 4 }}>Our vision</div>
                <div style={{ fontSize: "13.5px", color: "var(--muted)", lineHeight: 1.55 }}>A world where every safety, quality and sustainability professional can learn, prove their skills and grow, regardless of budget.</div>
              </div>
              <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: 16 }}>
                <div style={{ fontWeight: 700, color: "var(--teal-d)", marginBottom: 4 }}>Our mission</div>
                <div style={{ fontSize: "13.5px", color: "var(--muted)", lineHeight: 1.55 }}>Pair recognised, practitioner-led training with a free, global community that keeps knowledge moving.</div>
              </div>
            </div>
            <p>We combine <strong>recognised, practitioner-led training</strong> on eGrowthIndia.com with a <strong>free community</strong> where 48,000+ professionals across 92 countries ask questions, share resources, and grow their reputation together. The courses fund the community, so the community stays free.</p>
            <h3>What we believe</h3>
            <p><strong>Knowledge should be shared.</strong> Every member can both learn and teach, and earn recognition for it through our Merit system.</p>
            <p><strong>Reputation is earned, not bought.</strong> Your standing reflects what you&apos;ve genuinely contributed, validated by peers.</p>
            <p><strong>Local context matters.</strong> Country chapters keep guidance relevant to the regulations you actually work under.</p>
            <h3>By the numbers</h3>
            <div className="cards-3" style={{ marginTop: 16 }}>
              <div className="tile" style={{ textAlign: "center" }}><div className="mono" style={{ fontSize: 30, fontWeight: 800, color: "var(--teal-d)" }}>48K+</div><div style={{ fontSize: 13, color: "var(--muted)" }}>Members</div></div>
              <div className="tile" style={{ textAlign: "center" }}><div className="mono" style={{ fontSize: 30, fontWeight: 800, color: "var(--teal-d)" }}>92</div><div style={{ fontSize: 13, color: "var(--muted)" }}>Countries</div></div>
              <div className="tile" style={{ textAlign: "center" }}><div className="mono" style={{ fontSize: 30, fontWeight: 800, color: "var(--teal-d)" }}>4.2K</div><div style={{ fontSize: 13, color: "var(--muted)" }}>Free resources</div></div>
            </div>
          </div>

          <aside>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Leadership</div>
            <div className="tile" style={{ marginBottom: 14, display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#155d92", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>PS</div>
              <div>
                <div style={{ fontWeight: 700 }}>Pushpender Sharma</div>
                <div style={{ fontSize: 12, color: "var(--energy)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>Founder</div>
                <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>QHSE trainer &amp; author. Leads the Learning Hub.</p>
              </div>
            </div>
            <div className="tile" style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#c2700a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>AS</div>
              <div>
                <div style={{ fontWeight: 700 }}>Amit Singh</div>
                <div style={{ fontSize: 12, color: "var(--energy)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>Co-Founder &amp; CEO</div>
                <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Drives platform, partnerships &amp; growth.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Parent company */}
      <section className="wrap" style={{ paddingBottom: 40 }}>
        <div className="sec-head"><div className="eyebrow">Part of something bigger</div><h2 style={{ fontSize: 26 }}>Our parent company</h2></div>
        <div className="parent">
          <div className="mark">BX</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 20 }}>Bexex Global</h3>
            <p style={{ fontSize: "14.5px", color: "var(--muted)", marginTop: 6, lineHeight: 1.6, maxWidth: 640 }}>eGrowth India is a Bexex Global company. <strong>Bexex Global</strong> is a New Delhi-based technology &amp; consulting company building digital platforms that make professional knowledge, training and services accessible across emerging markets, with eGrowth India as its flagship QHSE &amp; ESG learning ecosystem. Both share a home at Shiv Ram Park, Nangloi, New Delhi.</p>
            <a className="btn btn-outline" style={{ marginTop: 14, display: "inline-flex" }} href="https://www.bexexglobal.com" target="_blank" rel="noopener">Visit bexexglobal.com →</a>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="pad" style={{ background: "#eef4f8" }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: "center", margin: "0 auto 28px" }}>
            <div className="eyebrow">Aligned with</div>
            <h2 style={{ fontSize: 26 }}>Recognised standards &amp; bodies</h2>
          </div>
          <div className="logos">
            <div className="logos-track">
              {[...LOGOS2, ...LOGOS2].map((o, i) => <span key={i}>{o}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pad wrap">
        <div className="sec-head" style={{ textAlign: "center", margin: "0 auto 36px" }}>
          <div className="eyebrow">Our journey</div>
          <h2>Milestones so far</h2>
        </div>
        <div className="cards-3">
          <div className="tile"><div className="mono" style={{ fontSize: 20, fontWeight: 800, color: "var(--energy-d)" }}>2023</div><h3 style={{ fontSize: 16, margin: "6px 0" }}>Community founded</h3><p>Started as a small group of QHSE practitioners sharing audit templates and answers.</p></div>
          <div className="tile"><div className="mono" style={{ fontSize: 20, fontWeight: 800, color: "var(--energy-d)" }}>2024</div><h3 style={{ fontSize: 16, margin: "6px 0" }}>Learn Hub launched</h3><p>Recognised certificate programmes added, with the community kept free for everyone.</p></div>
          <div className="tile"><div className="mono" style={{ fontSize: 20, fontWeight: 800, color: "var(--energy-d)" }}>2026</div><h3 style={{ fontSize: 16, margin: "6px 0" }}>48,000+ members, 92 countries</h3><p>Now a Bexex Global company, scaling QHSE and ESG learning across emerging markets.</p></div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 60 }}>
        <div className="band">
          <h2>Join 48,000+ professionals growing together.</h2>
          <p>Browse courses freely, then join the community to ask, share, and build your reputation.</p>
          <div className="cta">
            <button className="btn btn-energy" onClick={() => nav("/portal")}>Enter the community</button>
            <button className="btn btn-light" onClick={() => nav("/courses")}>Explore Courses</button>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
}

