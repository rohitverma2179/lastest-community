import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/user.slice";
const logo = "/assets/egrowth-logo.png";

export default function NavBar({ active: propActive }) {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesExpanded, setCoursesExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const go = (p) => {
    setMobileMenuOpen(false);
    nav(p);
  };

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
    nav("/");
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      go("/courses?q=" + encodeURIComponent(searchValue.trim()));
    }
  };

  // Automatically determine active route if not passed via props
  let active = propActive;
  if (!active) {
    const path = location.pathname;
    if (path.includes("/courses")) active = "courses";
    else if (path.includes("/resources")) active = "resources";
    else if (path.includes("/community")) active = "community";
    // else if (path.includes("/about")) active = "about";
    else if (path.includes("/blog")) active = "blog";
    else if (path.includes("/contact")) active = "contact";
  }

  return (
    <>
      <header className="bar sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
        <div className="wrap bar-in flex items-center justify-between gap-3 px-4 py-2.5 max-w-7xl mx-auto">
          {/* Logo */}
          <a className="logo cursor-pointer shrink-0 select-none flex items-center justify-center my-auto" onClick={() => go("/")}>
            <img src={logo} alt="eGrowth India" className="h-7 sm:h-8 w-auto object-contain my-auto" />
          </a>

          {/* Desktop Nav - Mega Menu */}
          <nav className="menu hidden lg:flex items-center gap-6">
            <div className="dropdown relative group">
              <Link to="/courses" className={`dd-trigger font-medium text-[14px] text-gray-700 hover:text-blue-600 transition-colors ${active === "courses" ? "text-blue-600 font-semibold" : ""}`}>
                Courses ▾
              </Link>
              <div className="dd-mega hidden group-hover:grid grid-cols-3 gap-6 absolute top-full left-0 w-[650px] bg-white border border-gray-100 rounded-xl p-5 shadow-xl z-50">
                <div className="col flex flex-col gap-1.5">
                  <h6 className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">By Standard (ISO)</h6>
                  <a onClick={() => go("/courses?q=9001")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">ISO 9001 · Quality</a>
                  <a onClick={() => go("/courses?q=14001")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">ISO 14001 · Environment</a>
                  <a onClick={() => go("/courses?q=45001")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">ISO 45001 · Safety</a>
                  <a onClick={() => go("/courses?q=50001")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">ISO 50001 · Energy</a>
                  <a onClick={() => go("/courses?q=22000")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">ISO 22000 · Food Safety</a>
                  <a onClick={() => go("/courses?q=iatf")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">IATF 16949 · Automotive</a>
                </div>
                <div className="col flex flex-col gap-1.5">
                  <h6 className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">By Role &amp; Level</h6>
                  <a onClick={() => go("/courses?f=awareness")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">Awareness Training</a>
                  <a onClick={() => go("/courses?f=auditor")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">Internal Auditor</a>
                  <a onClick={() => go("/courses?q=lead+auditor")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">Lead Auditor</a>
                  <a onClick={() => go("/courses?f=implementer")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">Lead Implementer</a>
                  <a onClick={() => go("/courses?f=exam")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">Exam Preparation</a>
                  <a onClick={() => go("/courses")} className="text-[13px] text-blue-600 font-semibold cursor-pointer py-1 transition-colors">All Courses →</a>
                </div>
                <div className="col flex flex-col gap-1.5">
                  <h6 className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">By Domain &amp; Delivery</h6>
                  <a onClick={() => go("/courses?f=quality")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">Quality Management</a>
                  <a onClick={() => go("/courses?q=safety")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">Safety &amp; EHS</a>
                  <a onClick={() => go("/courses?f=environment")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">Environment</a>
                  <a onClick={() => go("/courses?q=esg")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">Sustainability &amp; ESG</a>
                  <a onClick={() => go("/courses?f=exam")} className="text-[13px] text-gray-700 hover:text-blue-600 cursor-pointer py-1 transition-colors">Onsite &amp; In-House</a>
                  <a onClick={() => go("/courses?f=exam")} className="text-[13px] font-medium text-emerald-600 cursor-pointer py-1 transition-colors">Free Courses</a>
                </div>
              </div>
            </div>
          </nav>

          {/* Search Box - Desktop / Tablet */}
          <div className="search hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-1.5 max-w-xs flex-1">
            <span className="text-gray-400 text-sm">⌕</span>
            <input
              type="text"
              placeholder="Search courses…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchSubmit}
              className="bg-transparent border-none outline-none text-xs w-full text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Right Links & Action - Desktop */}
          <div className="hidden lg:flex items-center gap-5">
            <a className={`text-[14px] font-medium transition-colors cursor-pointer ${active === "resources" ? "text-[#0096FF] font-semibold" : "text-gray-700 hover:text-[#0096FF]"}`} onClick={() => go("/resources")}>Resources</a>
            <a className={`text-[14px] font-medium transition-colors cursor-pointer ${active === "blog" ? "text-[#0096FF] font-semibold" : "text-gray-700 hover:text-[#0096FF]"}`} onClick={() => go("/blog")}>Blog</a>
            <a className={`text-[14px] font-medium transition-colors cursor-pointer ${active === "community" ? "text-[#0096FF] font-semibold" : "text-gray-700 hover:text-[#0096FF]"}`} onClick={() => go("/community")}>Community</a>
            <a className={`text-[14px] font-medium transition-colors cursor-pointer ${active === "contact" ? "text-[#0096FF] font-semibold" : "text-gray-700 hover:text-[#0096FF]"}`} onClick={() => go("/contact")}>Contact</a>

            <div className="bar-cta">
              {/* <button
                className="btn btn-energy py-2 px-4 rounded-xl text-[13px] font-semibold transition-all shadow-xs cursor-pointer"
                onClick={() => go(isAuthenticated ? "/portal" : "/login")}
              >
                Enter community
              </button> */}
              <button
                className="btn btn-energy py-2 px-4 rounded-xl text-[13px] font-semibold transition-all shadow-xs cursor-pointer"
                onClick={() => nav("/coming-soon")}
                // onClick={() => nav("/login")}
              >
                Enter community
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Toggle Button */}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center lg:!hidden p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >

            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 flex flex-col p-5 overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center my-auto">
                <img src={logo} alt="eGrowth India" className="h-7 sm:h-8 w-auto object-contain my-auto" />
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Search */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3.5 py-2 mb-4">
              <span className="text-gray-400 text-sm">⌕</span>
              <input
                type="text"
                placeholder="Search courses…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className="bg-transparent border-none outline-none text-sm w-full text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-1  text-[15px] font-medium text-gray-700">
              {/* Courses Accordion */}
              <div className="px-3">
                <button
                  type="button"
                  onClick={() => setCoursesExpanded(!coursesExpanded)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 text-left cursor-pointer"
                >
                  <span className={active === "courses" ? "text-blue-600 font-semibold" : ""}>Courses</span>
                  <span className="text-xs text-gray-400">{coursesExpanded ? "▲" : "▼"}</span>
                </button>

                {coursesExpanded && (
                  <div className="pl-4 pr-2 py-2 flex flex-col gap-2 bg-gray-50 rounded-xl my-1 text-[13px]">
                    <div className="font-bold text-blue-600 text-[11px] uppercase tracking-wider">ISO Standards</div>
                    <a onClick={() => go("/courses?q=9001")} className="py-1 text-gray-600 hover:text-blue-600 cursor-pointer">ISO 9001 · Quality</a>
                    <a onClick={() => go("/courses?q=14001")} className="py-1 text-gray-600 hover:text-blue-600 cursor-pointer">ISO 14001 · Environment</a>
                    <a onClick={() => go("/courses?q=45001")} className="py-1 text-gray-600 hover:text-blue-600 cursor-pointer">ISO 45001 · Safety</a>
                    <a onClick={() => go("/courses?q=50001")} className="py-1 text-gray-600 hover:text-blue-600 cursor-pointer">ISO 50001 · Energy</a>

                    <div className="font-bold text-blue-600 text-[11px] uppercase tracking-wider mt-2">By Level</div>
                    <a onClick={() => go("/courses?f=awareness")} className="py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Awareness Training</a>
                    <a onClick={() => go("/courses?f=auditor")} className="py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Internal Auditor</a>
                    <a onClick={() => go("/courses?q=lead+auditor")} className="py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Lead Auditor</a>
                    <a onClick={() => go("/courses")} className="py-1 font-semibold text-blue-600 cursor-pointer mt-1">All Courses →</a>
                  </div>
                )}
              </div>

              <a
                onClick={() => go("/resources")}
                className={`py-2.5 px-3 rounded-lg hover:bg-gray-50 cursor-pointer ${active === "resources" ? "text-blue-600 font-semibold" : ""}`}
              >
                Resources
              </a>

              <a
                onClick={() => go("/blog")}
                className={`py-2.5 px-3 rounded-lg hover:bg-gray-50 cursor-pointer ${active === "blog" ? "text-blue-600 font-semibold" : ""}`}
              >
                Blog
              </a>

              <a
                onClick={() => go("/community")}
                className={`py-2.5 px-3 rounded-lg hover:bg-gray-50 cursor-pointer ${active === "community" ? "text-blue-600 font-semibold" : ""}`}
              >
                Community
              </a>

              <a
                onClick={() => go("/contact")}
                className={`py-2.5 px-3 rounded-lg hover:bg-gray-50 cursor-pointer ${active === "contact" ? "text-blue-600 font-semibold" : ""}`}
              >
                Contact
              </a>
            </div>

            {/* Mobile Actions Footer */}
            <div className="mt-auto pt-5 border-t  border-gray-100 flex flex-col gap-3">
              <button
                className="btn btn-energy w-1/2  py-3 rounded-xl font-semibold text-[14px] text-center cursor-pointer"
                onClick={() => go("/coming-soon")}
              // onClick={() => go("/coming-soon")}
              >
                Enter community
              </button>

              {/* {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-[13px] font-medium cursor-pointer"
                >
                  Sign Out
                </button>
              )} */}
            </div>
          </div>
        </div>
      )}

      {/* Responsive Category Sub-Bar */}
      <div className="catbar bg-gray-50 border-b border-gray-100 py-1.5">
        <div className="wrap catbar-in flex items-center gap-2 overflow-x-auto scrollbar-none max-w-7xl mx-auto px-4">
          <a onClick={() => go("/courses")} className="cursor-pointer shrink-0">All courses</a>
          <a onClick={() => go("/courses?f=awareness")} className="cursor-pointer shrink-0">Awareness</a>
          <a onClick={() => go("/courses?f=auditor")} className="cursor-pointer shrink-0">Internal Auditor</a>
          <a onClick={() => go("/courses?f=implementer")} className="cursor-pointer shrink-0">Lead Implementer</a>
          <a onClick={() => go("/courses?f=environment")} className="cursor-pointer shrink-0">Environmental</a>
          <a onClick={() => go("/courses?f=exam")} className="cursor-pointer shrink-0">Exam Prep</a>
          <a onClick={() => go("/courses?f=quality")} className="cursor-pointer shrink-0">Quality</a>
        </div>
      </div>
    </>
  );
}