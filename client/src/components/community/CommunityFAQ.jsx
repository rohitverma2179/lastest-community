import { useState } from "react";

const FAQS = [
  { q:"Is the community really free?", a:"Yes, joining, asking, answering, sharing and downloading community resources, and earning Merit are all free forever. Paid courses on the Learn Hub fund the community." },
  { q:"What is Merit?", a:"Merit is the community's single point system. You earn it by contributing and spend it on downloads and course unlocks. Earned Merit also raises your reputation level. Buying Merit never changes your level." },
  { q:"How is my data handled?", a:"Your profile shows only what you choose to share. Skills and endorsements reflect your real activity. We never sell personal data." },
  { q:"Do I need to buy a course to join?", a:"No. Anyone can join the community free. Buying a course simply adds it to the same dashboard." },
];

export default function CommunityFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="pad wrap ">
      <div className="sec-head" style={{ textAlign:"center", margin:"0 auto 32px" }}>
        <div className="eyebrow">Good to know</div>
        <h2>Community questions, answered</h2>
      </div>
      <div className="faq" style={{ maxWidth:820, margin:"0 auto" }}>
        {FAQS.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={f.q} className={`faq-item ${isOpen ? "open" : ""}`}>
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
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
  );
}
