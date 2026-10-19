import { useNavigate } from "react-router-dom";
const resourseBg = "/assets/bghero.png";

export default function CommunityHero() {
  const nav = useNavigate();
  return (
    <section className="hero page-hero" style={{  backgroundImage: `url(${resourseBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="wrap hero-in">
        <div className="eyebrow eyebrow-white ">Free forever · <span style={{ textTransform: "none" }}>eGrowthIndia</span></div>
        <h1>A free global <br /> community  for <span className="hl">QHSE <br /> &amp; ESG</span> professionals<span className="text-[#f18032]">.</span></h1>
        <p className="sub">48,000+ practitioners across 92 countries, learning out loud. Ask questions, share resources, earn Merit, and build a verifiable reputation.</p>
        {/* <div className="cta">
          <button className="btn btn-energy" onClick={() => nav("/login")}>Join Community   </button>
          <button className="btn btn-outline text-white" onClick={() => nav("/courses")}>Browse courses</button>
        </div> */}
      </div>
    </section>
  );
}
