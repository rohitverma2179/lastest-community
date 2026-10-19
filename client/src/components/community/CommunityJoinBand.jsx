import { useNavigate } from "react-router-dom";
const adsimag = "/assets/bghero.png";


export default function CommunityJoinBand() {
  const nav = useNavigate();
  return (
    <section className="wrap" style={{ paddingBottom:40 }}>
      <div className="band" style={{  backgroundImage: `url(${adsimag})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <h2>Buy a course or join free — either way, you land here.</h2>
        <p>The moment you enter, you&apos;re in the community and your Learning Hub dashboard. Your progress, certificates and Merit all live in one identity.</p>
        <div className="cta">
          {/* <button className="btn btn-energy" onClick={() => nav("/login")}>Create a free account</button> */}
          {/* <button className="btn btn-energy" onClick={() => nav("#")}>Create a free account</button> */}
          {/* <button className="btn btn-light" onClick={() => nav("/portal")}>Enter community</button> */}
          <button className="btn btn-light" onClick={() => nav("/coming-soon")}>Enter community</button>
        </div>
      </div>
    </section>
  );
}
