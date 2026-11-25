import { Link } from "react-router-dom";
const logo = "/assets/egrowth-logo-white.webp";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src={logo} alt="eGrowth India" width={338} height={48} loading="lazy" decoding="async" className="h-6 w-auto object-contain block mb-3.5" />
            <p>Training &amp; a free community for Quality, Health, Safety, Environment, Energy &amp; ESG professionals worldwide.</p>
            <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="pill-domain">eGrowthIndia.com</span>
              <span className="pill-domain">BexexGlobal.com</span>
            </div>
          </div>
          <div>
            <h3>Learn</h3>
            <div className="relative group flex items-center w-fit">
              <Link to="/coming-soon" style={{ cursor: "pointer" }}>Learn Hub</Link>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
            <div className="relative group flex items-center w-fit">
              <Link to="/coming-soon" style={{ cursor: "pointer" }}>Quiz Arena</Link>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
            <div className="relative group flex items-center w-fit">
              <Link to="/coming-soon" style={{ cursor: "pointer" }}>Scenario Lab</Link>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
            <div className="relative group flex items-center w-fit">
              <Link to="/coming-soon" style={{ cursor: "pointer" }}>Flashcards</Link>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
          </div>
          <div>
            <h3>Community</h3>
            <div className="relative group flex items-center w-fit">
              <Link to="/coming-soon" style={{ cursor: "pointer" }}>Home feed</Link>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
            <div className="relative group flex items-center w-fit">
              <Link to="/coming-soon" style={{ cursor: "pointer" }}>Resource Library</Link>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
            <div className="relative group flex items-center w-fit">
              <Link to="/coming-soon" style={{ cursor: "pointer" }}>Jobs</Link>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full ml-2.5 px-2 py-0.5 text-[10px] font-bold bg-[#005391] text-white rounded-md whitespace-nowrap pointer-events-none shadow-md z-30">
                Coming soon
              </span>
            </div>
          </div>
          <div>
            <h3>Company</h3>
            <a href="mailto:eGrowthindai@BexexGlobal.com"> eGrowthindai@BexexGlobal.com</a>
            <Link to="/contact" style={{ cursor: "pointer" }}>Help &amp; support</Link>
            <Link to="/verify" style={{ cursor: "pointer" }}>Certificates</Link>
            <a href="https://www.bexexglobal.com" target="_blank" rel="noopener noreferrer">Bexex Global</a>
          </div>
        </div>
        
        <div className="foot-bottom">
          <span>© 2026 eGrowth India · A Bexex Global company</span>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link to="/" style={{ cursor: "pointer" }}>Home</Link>
            <Link to="/terms-and-conditions" style={{ cursor: "pointer" }}>Terms</Link>
            <Link to="/privacy-policy" style={{ cursor: "pointer" }}>Privacy</Link>
            <Link to="/contact" style={{ cursor: "pointer" }}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
