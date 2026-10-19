const comm1 = "/assets/communityicons/comm1.png";
const comm2 = "/assets/communityicons/comm2.png";
const comm3 = "/assets/communityicons/comm3.png";
const comm4 = "/assets/communityicons/comm4.png";
const comm5 = "/assets/communityicons/comm5.png";
const comm6 = "/assets/communityicons/comm6.png";

const FEATURES = [
  { ic: comm1, h: "Ask & answer", p: "Get practical answers from real practitioners across quality, safety, environment, energy and ESG." },
  { ic: comm2, h: "4,200+ free resources", p: "Templates, checklists, audit kits and posters, shared by members, free to download." },
  { ic: comm3, h: "Earn Merit", p: "Every contribution earns Merit you can spend on resources and courses, and that builds your reputation." },
  { ic: comm4, h: "A living resume", p: "A verifiable profile that grows with your activity, skills endorsed by peers, not self-claimed." },
  { ic: comm5, h: "Quizzes & Scenario Lab", p: "Practice real-world decisions, take quizzes, earn badges and climb the leaderboard." },
  { ic: comm6, h: "Chapters & mentorship", p: "Country chapters for local regulations, plus free 1:1 mentorship from senior practitioners." },
];

export default function CommunityFeatures() {
  return (
    // <section className="pad wrap">
    //   <div className="sec-head"><div className="eyebrow">Why join</div><h2>Everything you need to grow, in one place</h2><p>The community is where the learning continues after a course ends, and where careers are built.</p></div>
    //   <div className="cards-3">
    //     {FEATURES.map((f) => (
    //       <div key={f.h} className="tile">
    //         <div className="ic">
    //           <img src={f.ic} alt={f.h} style={{ width: 42, height: 42, objectFit: "contain" }} />
    //         </div>
    //         <h3>{f.h}</h3>
    //         <p>{f.p}</p>
    //       </div>
    //     ))}
    //   </div>
    // </section>

     <section className="pad wrap">
      <div className="sec-head" style={{ textAlign: "center", margin: "0 auto 36px" }}>
        <div className="eyebrow">Why join</div>

        <h2>Everything you need to grow, <br className="hidden sm:inline" /> in one place</h2>

        <p>
          The community is where the learning continues after a course ends, <br className="hidden sm:inline" />
          and where careers are built.
        </p>
      </div>

    <div className="cards-3">
      {FEATURES.map((service) => (
        <div key={service.h} className="tile service-tile">
          <div className="ic" aria-hidden="true">
            <img src={service.ic} alt={service.h} />
          </div>

          <div className="service-tile-content">
            <h3>{service.h}</h3>
            <p>{service.p}</p>
          </div>
        </div>
      ))}
    </div>
    </section >
  );
}