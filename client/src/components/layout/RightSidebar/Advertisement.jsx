import React from "react";
import Card from "../../common/Card";

export default function Advertisement() {
  return (
    <div className="space-y-4 select-none">
      {/* Ad Card */}
      <Card noPadding className="overflow-hidden border border-gray-200/60 shadow-xs relative group cursor-pointer">
        <span className="absolute top-2 right-2 bg-black/40 backdrop-blur-xs text-white text-[8px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded z-10">
          Ad
        </span>

        {/* Ad Image / Graphic content */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-950 flex flex-col justify-end p-4">
          {/* Decorative mesh */}
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

          {/* Ad Content */}
          <div className="relative z-10 text-center space-y-2.5">
            <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none">
              Services Partner
            </h5>
            <h4 className="text-[17px] font-black text-white leading-tight">
              DIGITAL MARKETING
            </h4>
            
            {/* Badges container */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1.5">
              <span className="text-[9px] font-bold text-gray-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                Branding
              </span>
              <span className="text-[9px] font-bold text-gray-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                Logo Design
              </span>
              <span className="text-[9px] font-bold text-gray-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                Social Media
              </span>
              <span className="text-[9px] font-bold text-gray-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                Video Editing
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Footer Links */}
      <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center text-[10px] text-gray-400 font-medium px-4 select-none">
        <a href="#" className="hover:text-[#0096FF]">Privacy</a>
        <span>•</span>
        <a href="#" className="hover:text-[#0096FF]">Terms</a>
        <span>•</span>
        <a href="#" className="hover:text-[#0096FF]">Contact</a>
        <span className="w-full text-center mt-1">© 2026 eGrowth India</span>
      </div>
    </div>
  );
}
