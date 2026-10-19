import { useNavigate } from "react-router-dom";

const CHAPTERS = ["🇮🇳 India","🇦🇪 UAE","🇸🇦 Saudi Arabia","🇶🇦 Qatar","🇻🇳 Vietnam","🇸🇬 Singapore","🇬🇧 United Kingdom","🇿🇦 South Africa","🇧🇼 Botswana","🇩🇪 Germany","🇮🇪 Ireland","+ 81 more"];

export default function CountryChapters() {
  const nav = useNavigate();
  return (
    <section className="pad " style={{ background:"#eef4f8" }}>
      <div className="wrap">
        <div className="sec-head" style={{ textAlign:"center", margin:"0 auto 32px" }}>
          <div className="eyebrow">Country chapters</div>
          <h2>Local communities, global movement</h2>
          <p>Join your country&apos;s chapter for region-specific regulations, jobs, events and people. Active in 92 countries.</p>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center", maxWidth:820, margin:"0 auto" }}>
          {CHAPTERS.map((c) => <span key={c} className="track">{c}</span>)}
        </div>
        <div style={{ textAlign:"center", marginTop:24 }}>
          <button className="btn  btn-energy" onClick={() => nav("/portal/chapters")}>Find your chapter →</button>
        </div>
      </div>
    </section>
  );
}
