import { useNavigate } from "react-router-dom";
const logo = "/assets/egrowth-logo-white.png";

export default function Footer() {
  const nav = useNavigate();
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src={logo} alt="eGrowth India" className="h-6 w-auto object-contain block mb-3.5" />
            <p>Training &amp; a free community for Quality, Health, Safety, Environment, Energy &amp; ESG professionals worldwide.</p>
            <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="pill-domain">eGrowthIndia.com</span>
              <span className="pill-domain">BexexGlobal.com</span>
            </div>
          </div>
          <div>
            <h5>Learn</h5>
            <div className="relative group flex items-center w-fit">
              <a onClick={() => nav("/coming-soon")} style={{ cursor: "pointer" }}>Learn Hub</a>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
            <div className="relative group flex items-center w-fit">
              <a onClick={() => nav("/coming-soon")} style={{ cursor: "pointer" }}>Quiz Arena</a>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
            <div className="relative group flex items-center w-fit">
              <a onClick={() => nav("/coming-soon")} style={{ cursor: "pointer" }}>Scenario Lab</a>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
            <div className="relative group flex items-center w-fit">
              <a onClick={() => nav("/coming-soon")} style={{ cursor: "pointer" }}>Flashcards</a>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
          </div>
          <div>
            <h5>Community</h5>
            <div className="relative group flex items-center w-fit">
              <a onClick={() => nav("/coming-soon")} style={{ cursor: "pointer" }}>Home feed</a>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
            <div className="relative group flex items-center w-fit">
              <a onClick={() => nav("/coming-soon")} style={{ cursor: "pointer" }}>Resource Library</a>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
            <div className="relative group flex items-center w-fit">
              <a onClick={() => nav("/coming-soon")} style={{ cursor: "pointer" }}>Jobs</a>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
          </div>
          <div>
            <h5>Company</h5>
            <a href="mailto:eGrowthindai@BexexGlobal.com"> eGrowthindai@BexexGlobal.com</a>
            <a onClick={() => nav("/contact")} style={{ cursor: "pointer" }}>Help &amp; support</a>
            <a href="https://www.bexexglobal.com" target="_blank" rel="noopener">Bexex Global</a>
          </div>
        </div>
        
        <div className="foot-bottom">
          <span>© 2026 eGrowth India · A Bexex Global company</span>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <a onClick={() => { nav("/"); window.scrollTo(0, 0); }} style={{ cursor: "pointer" }}>Home</a>
            <a onClick={() => { nav("/terms-and-conditions"); window.scrollTo(0, 0); }} style={{ cursor: "pointer" }}>Terms</a>
            <a onClick={() => { nav("/privacy-policy"); window.scrollTo(0, 0); }} style={{ cursor: "pointer" }}>Privacy</a>
            <a onClick={() => { nav("/contact"); window.scrollTo(0, 0); }} style={{ cursor: "pointer" }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
