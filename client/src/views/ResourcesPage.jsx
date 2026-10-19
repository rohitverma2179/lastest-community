'use client';

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import NavBar from "../components/shared/NavBar";
// import Footer from "../components/shared/Footer";
import api from "../utils/axios";
const adsimag = "/assets/bghero.png";

const resourseBg = "/assets/bghero.png";

const TYPECOL = { PDF: "#CC2200", XLSX: "#1f8a5b", PPTX: "#FF9300", DOCX: "#0096FF", ZIP: "#4A4A4A" };

function ResModal({ r, onClose }) {
  const nav = useNavigate();
  if (!r) return null;

  const handleAction = () => {
    const token = localStorage.getItem("eg_token");
    if (token) {
      nav("/portal/library");
    } else {
      nav("/portal/library?auth=login");
    }
  };

  return (
    <div className="resmodal" style={{ display: "flex" }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="resmodal-card">
        <button className="resmodal-x" onClick={onClose}>✕</button>
        <div className="resm-head">
          <div className="resicon lg" style={{ background: TYPECOL[r.type] || "#4A4A4A" }}>{r.type}</div>
          <div>
            <div className="restag">{r.tag}</div>
            <h2>{r.t}</h2>
            <div className="mono" style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>{r.type} · {r.pages} pages · {r.dl.toLocaleString()} downloads</div>
          </div>
        </div>
        <p className="resm-desc">{r.d}</p>
        <div className="resm-prev">
          <div className="resm-pglines">
            <span></span><span></span><span className="s"></span><span></span><span className="s"></span><span></span>
          </div>
          <div className="resm-lock">🔒 Sign in to view the full document and download</div>
        </div>
        <div className="resm-cta">
          <button className="btn btn-energy" onClick={handleAction}>Sign in to download free</button>
          <button className="btn btn-outline" onClick={handleAction}>Browse full library</button>
        </div>
        <div className="resm-note">Free forever. Uploaded by a community member. eGrowth does not pre-review uploads, so review before use in your workplace.</div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");
  const [modal, setModal] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const nav = useNavigate();

  const SORT_OPTIONS = [
    { value: "popular", label: "Most downloaded" },
    { value: "newest", label: "Newest" },
    { value: "az", label: "A to Z" }
  ];

  const selectedOption = SORT_OPTIONS.find(opt => opt.value === sort) || SORT_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAuthAction = () => {
    const token = localStorage.getItem("eg_token");
    if (token) {
      nav("/portal/library");
    } else {
      nav("/portal/library?auth=login");
    }
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.get("/resources");
        if (res.data && res.data.resources) {
          setResources(res.data.resources);
        }
      } catch (err) {
        console.error("Error fetching resources:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const list = resources
    .map(r => ({
      id: r.id || r._id,
      t: r.title || "",
      type: (r.type || "DOCX").toUpperCase(),
      dom: r.domain || (r.tags && r.tags[0]) || "all",
      dl: r.downloads || 0,
      tag: r.tag || (r.tags && r.tags.join(" · ")) || "",
      d: r.summary || "",
      pages: r.pages || 0,
      externalUrl: r.externalUrl || "",
      createdAt: r.createdAt
    }))
    .filter(r => {
      if (filter !== "all" && r.dom.toLowerCase() !== filter.toLowerCase()) return false;
      if (q && !(r.t + " " + r.tag + " " + r.d).toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "az") return a.t.localeCompare(b.t);
      if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      return b.dl - a.dl;
    });

  return (
    <>
      {/* <NavBar active="resources" /> */}

      <section className="hero page-hero" style={{  backgroundImage: `url(${resourseBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="wrap hero-in">
          <div className="eyebrow eyebrow-white">Free resource library</div>
          <h1>Free <span className="hl">QHSE &amp; ESG</span> <br /> templates, checklists <br /> and audit kits<span className="text-[#f18032]">.</span></h1>
          <p>Thousands of practical, ready-to-use documents shared by the community. Preview any resource here, then sign in to download. Always free.</p>
          <div className="login-note">🔒 Previews are public · Sign in to download and save to your library</div>
        </div>
      </section>

      {/* <section className="pad wrap" id="reslist">
        <div className="coming-soon-card">
          <div className="coming-icon">🚀</div>

          <span className="coming-badge">Coming Soon</span>

          <h2>Resource Library is Coming Soon</h2>


          <button className="coming-btn" disabled>
            Launching Soon
          </button>
        </div>
      </section> */}


      <section className="pad wrap" id="reslist">
        <div className="lh-toolbar">
          {/* <div className="lh-search">
            <span>⌕</span>
            <input id="resSearch" placeholder="Search templates, checklists, standards…" value={q} onChange={e => setQ(e.target.value)} />
          </div> */}
          <div className="lh-sort" ref={dropdownRef}>
            <span>Sort</span>
            <div className="custom-select-container">
              <button 
                type="button" 
                className="custom-select-trigger" 
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{selectedOption.label}</span>
                <span className={`custom-select-arrow ${isOpen ? 'open' : ''}`}>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2' style={{ width: '100%', height: '100%' }}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div className="custom-select-options">
                  {SORT_OPTIONS.map(opt => (
                    <div 
                      key={opt.value} 
                      className={`custom-select-option ${sort === opt.value ? 'selected' : ''}`}
                      onClick={() => {
                        setSort(opt.value);
                        setIsOpen(false);
                      }}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="filters" id="resFilters">
          {[{ f: "all", l: "All" }, { f: "quality", l: "Quality" }, { f: "safety", l: "Safety" }, { f: "health", l: "Health" }, { f: "environment", l: "Environment" }, { f: "energy", l: "Energy" }, { f: "esg", l: "ESG" }].map(({ f, l }) => (
            <span key={f} className={`chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{l}</span>
          ))}
        </div>

         <div className="flex flex-col justify-center items-center py-24 text-center">
        <span className="text-3xl font-bold text-slate-800 tracking-tight">
          Coming Soon
        </span>
        <div className="w-12 h-1 bg-[#0096FF] rounded-full mt-3 opacity-60"></div>
      </div>


        {/* <div className="resgrid" id="resGrid" style={{ marginTop: 18 }}>
          {loading ? (
            <div style={{ gridColumn: "1/-1", color: "var(--muted)", padding: "40px 0", textAlign: "center" }}>
              <div className="animate-spin w-8 h-8 border-4 border-t-transparent border-[var(--teal)] rounded-full" style={{ margin: "0 auto 10px auto", borderRightColor: "transparent" }}></div>
              Loading resources from library...
            </div>
          ) : list.length === 0 ? (
            <div style={{ gridColumn: "1/-1", color: "var(--muted)", padding: "20px 0" }}>No resources match. <a onClick={() => { setFilter("all"); setQ(""); }} style={{ color: "var(--teal)", cursor: "pointer" }}>Reset</a></div>
          ) : (
            list.map((r, i) => (
              <div key={i} className="rescard" onClick={() => setModal(r)}>
                <div className="resicon" style={{ background: TYPECOL[r.type] || "#4A4A4A" }}>{r.type}</div>
                <div className="resbody">
                  <div className="restag">{r.tag}</div>
                  <h3>{r.t}</h3>
                  <p>{r.d}</p>
                  <div className="resfoot">
                    <span className="mono">↓ {r.dl.toLocaleString()}</span>
                    <span className="reslink">Preview &amp; download →</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div> */}
      </section>

      <section className="wrap" style={{ paddingBottom: 60 }}>
        <div className="band" style={{  backgroundImage: `url(${adsimag})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="band-grid">
            <div>
              <div className="eyebrow" style={{ color: "var(--energy-l)" }}>Share &amp; earn</div>
              <h2>Got a template worth sharing?</h2>
              <p>Upload your own checklists and audit kits to the community. Every download earns you Merit, and the best resources get featured.</p>
              <div className="cta">
                {/* <button className="btn btn-energy" onClick={handleAuthAction}>Upload a resource</button> */}
                {/* <button className="btn btn-light" onClick={handleAuthAction}>Open full library</button> */}
                <button className="btn btn-light" >Open full library</button>
              </div>
            </div>
            <div className="panel">
              <div className="big mono">4,219</div>
              <div className="sm">free resources and counting</div>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><span className="sm">Total downloads</span><b className="mono">1.1M</b></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span className="sm">Contributors</span><b className="mono">2,840</b></div>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}

      {modal && <ResModal r={modal} onClose={() => setModal(null)} />}
    </>
  );
}
