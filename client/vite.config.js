import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const routeMeta = {
  '/': {
    title: 'eGrowthIndia - Global Community for QHSE & ESG Professionals',
    desc: 'eGrowthIndia - Global Community for QHSE & ESG Professionals. Access free resources, webinars, courses, and connect with global industry leaders.'
  },
  '/resources': {
    title: 'Free QHSE & ESG Resources, Templates & Guidelines | eGrowthIndia',
    desc: 'Download free QHSE checklists, SOP templates, ISO audit documents, and ESG toolkits created and reviewed by industry experts.'
  },
  '/courses': {
    title: 'Professional QHSE & ESG Certification Courses | eGrowthIndia',
    desc: 'Explore industry-leading certification courses in ISO 9001, 14001, 45001, Safety Auditing, and ESG management.'
  },
  '/contact': {
    title: 'Contact Us | eGrowthIndia',
    desc: 'Get in touch with the eGrowthIndia team for questions, partnerships, support, and community inquiries.'
  },
  '/blog': {
    title: 'Blogs, Industry Insights & News | eGrowthIndia',
    desc: 'Read the latest blogs, trends, and articles on Quality, Health, Safety, Environment, and ESG sustainability.'
  },
  '/blog/iso-certification-training-india': {
    title: 'ISO Certification Training India | eGrowth India',
    desc: 'Explore ISO certification training in India covering ISO 9001, ISO 14001 and ISO 27001. Learn what these programs cover and how to choose the right one.'
  },
  '/community': {
    title: 'Global Community & Chapters | eGrowthIndia',
    desc: 'Join 10,000+ QHSE and ESG professionals worldwide. Network, share knowledge, and grow your career.'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | eGrowthIndia',
    desc: 'Read the eGrowthIndia Privacy Policy regarding how we protect and handle your personal data.'
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions | eGrowthIndia',
    desc: 'Review terms and conditions for using the eGrowthIndia platform and community services.'
  },
  '/community-guidelines': {
    title: 'Community Guidelines | eGrowthIndia',
    desc: 'Learn about the standards and expectations for participating in the eGrowthIndia professional network.'
  },
  '/iso-certification-training-india': {
    title: 'ISO Certification Training India | ISO & EHS | Egrowth India',
    desc: 'Build practical ISO and EHS skills with ISO certification training India teams can apply at work. Explore ISO 9001, 14001 and 45001 courses. Enquire now.',
    headExtra: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is ISO certification training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ISO certification training is structured learning that teaches you to implement, audit and maintain an ISO management system standard such as ISO 9001 or ISO 14001. Courses range from awareness sessions to internal auditor and lead implementer programmes. ISO certification training India professionals attend helps them apply a standard correctly in daily work."
      }
    },
    {
      "@type": "Question",
      "name": "Who should attend ISO and EHS training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Managers, auditors, engineers and officers who implement or oversee a management system should attend. That includes HR and compliance heads, quality and EHS managers, IT security teams, plant supervisors, internal auditors and working professionals who want to move into quality, safety, environmental or information security roles."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between ISO training and ISO certification of an organisation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ISO training builds the skills of individuals, while ISO certification confirms that an organisation's management system meets a standard. Training prepares your people to implement and audit the system. Certification is awarded after an independent certification body audits the organisation. ISO certification training India courses support the first step, not the audit itself."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of ISO 27001 training India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ISO 27001 training helps teams build and maintain an information security management system. Participants learn to assess information risks, choose controls and prepare for audits. ISO 27001 training India teams complete strengthens data protection, supports customer confidence and gives IT security staff a shared compliance framework."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of ISO 9001 training India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ISO 9001 training helps you run a quality management system that delivers consistent products and services. Participants learn process control, risk-based thinking, internal audits and corrective action. ISO 9001 training India quality teams attend helps reduce repeat errors and supports continual improvement."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of ISO 14001 training India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ISO 14001 training helps organisations manage environmental responsibilities in a structured way. Participants learn to identify environmental aspects, meet legal requirements and control waste, emissions and resource use. ISO 14001 training India sites invest in also builds readiness for environmental incidents and audits."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of ISO 45001 training India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ISO 45001 training helps employers prevent workplace injury and ill health through a structured occupational health and safety system. Participants learn hazard identification, risk assessment, incident investigation and worker participation. ISO 45001 training India safety teams complete supports legal compliance and a stronger safety culture."
      }
    },
    {
      "@type": "Question",
      "name": "What does EHS training cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "EHS training covers environment, health and safety controls at work. Topics include work at height, confined space, permit to work, toolbox talks, waste management and energy reviews. EHS training India employers arrange can also include NEBOSH IGC preparation for safety professionals working towards a formal qualification."
      }
    },
    {
      "@type": "Question",
      "name": "How does ISO training help careers or compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ISO training builds the auditing, implementation and risk management skills that quality, EHS and IT roles rely on. Trained staff keep documentation, controls and internal audits ready for certification and surveillance audits, which supports both career progression and long-term organisational compliance."
      }
    },
    {
      "@type": "Question",
      "name": "How can I enquire or enrol with Egrowth India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visit the Egrowth India website, browse the course list and use the Contact page to share your requirements. You can ask about public courses or request in-house training for your team, at your site or online. Egrowth India can help you identify the programme that fits your role."
      }
    }
  ]
}
</script>`
  }
};

function devSsrPlugin() {
  if (!globalThis.localStorage) {
    globalThis.localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {}
    };
  }
  if (!globalThis.window) {
    globalThis.window = {
      location: { href: 'http://localhost:5173', pathname: '/', origin: 'http://localhost:5173' },
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
      scrollTo: () => {}
    };
  }
  if (!globalThis.document) {
    const fakeEl = {
      setAttribute: () => {},
      appendChild: () => {},
      style: {},
      innerHTML: '',
      firstChild: { data: '' }
    };
    globalThis.document = {
      createElement: () => fakeEl,
      head: { appendChild: () => {} },
      querySelector: () => null,
      addEventListener: () => {},
      removeEventListener: () => {}
    };
  }

  return {
    name: 'dev-ssr-html',
    apply: 'serve',
    async transformIndexHtml(html, ctx) {
      if (!ctx || !ctx.server) return html;
      const rawUrl = ctx.originalUrl || ctx.path || '/';
      const cleanPath = rawUrl.split('?')[0].replace(/\/+$/, '') || '/';

      try {
        const { render } = await ctx.server.ssrLoadModule('/src/entry-server.jsx');
        const renderedHtml = render(cleanPath);

        let updated = html;

        if (!updated.includes('/src/index.css')) {
          updated = updated.replace('</head>', '  <link rel="stylesheet" href="/src/index.css">\n</head>');
        }

        if (renderedHtml) {
          updated = updated.replace('<div id="root"></div>', `<div id="root">${renderedHtml}</div>`);
        }

        const meta = routeMeta[cleanPath];
        if (meta) {
          if (meta.title) {
            updated = updated.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);
          }
          if (meta.desc) {
            updated = updated.replace(
              /<meta\s+name=["']description["'][^>]*>/i,
              `<meta name="description" content="${meta.desc}" />`
            );
          }
          if (meta.headExtra) {
            updated = updated.replace('</head>', `${meta.headExtra}\n</head>`);
          }
        }

        return updated;
      } catch (err) {
        console.error('[dev-ssr] Error rendering:', cleanPath, err);
        return html;
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), devSsrPlugin()],
})



//To redesign the  card UI and analyze the reference image to replace the existing code. Convert my current code to match the exact design and layout shown in the image. 














        // <div className="grid" id="courseGrid" style={{ marginTop: 18 }}>
        //   {list.length === 0 ? (
        //     <div style={{ gridColumn: "2/-1", color: "var(--muted)", fontSize: 14, padding: "20px 0" }}>
        //       No courses match your filters.{" "}
        //       <a
        //         onClick={() => {
        //           setFilter("all");
        //           setQ("");
        //         }}
        //         style={{ color: "var(--teal)", cursor: "pointer" }}
        //       >
        //         Reset
        //       </a>
        //     </div>
        //   ) : (
        //     list.map((c) => (
        //       <div
        //         key={c.id}
        //         className="course bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 duration-300 cursor-pointer flex flex-col"
        //         onClick={() => setDetail(c)}
        //       >
        //         <a
        //           className="block h-42 overflow-hidden relative"
        //           style={{ background: c.g }}
        //         >
        //           {c.image ? (
        //             <img
        //               src={c.image}
        //               alt={c.t}
        //               className="w-full h-full object-cover"
        //             />
        //           ) : (
        //             <div className="w-full h-full opacity-30 bg-gradient-to-br from-transparent to-black/30" > <span className="text-black absolute bottom-2 left-2 text-2xl font-bold">
        //               Coming soon  </span> </div>
        //           )}
        //         </a>

        //         {/* Body */}
        //         <div className="body p-5 flex flex-col flex-1" style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
        //           {/* Rating & Tag */}
        //           <div className="flex items-center gap-1.5 text-[11px] mb-2 font-medium" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", marginBottom: "8px", fontWeight: 500 }}>
        //             {/* <span className="text-[#0096FF] font-bold">★{c.rat.toFixed(1)}</span> */}
        //             <span className="text-[#0096FF] font-bold">★ 0</span>
        //             <span className="text-gray-400">{c.tag}</span>
        //           </div>

        //           {/* Title */}
        //           <h3 className="text-[17px] font-bold text-slate-800 leading-snug line-clamp-2 min-h-[48px] mb-2" style={{ fontFamily: "inherit", fontSize: "17px", fontWeight: "bold", color: "#1e293b", lineHeight: "1.35", minHeight: "48px", marginBottom: "8px" }}>
        //             {c.t}
        //           </h3>

        //           {/* Description */}
        //           <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed min-h-[36px] mb-4" style={{ color: "#6b7280", fontSize: "12px", marginTop: "8px", lineHeight: "1.6", minHeight: "36px", marginBottom: "16px" }}>
        //             {c.d}
        //           </p>

        //           {/* Footer */}
        //           <div className="foot flex items-center justify-between pt-3 border-t border-gray-100 mt-auto" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid #f1f5f9", marginTop: "auto" }}>
        //             <div className="flex items-center gap-1.5 text-sm" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
        //               {c.orig && (
        //                 <span className="text-gray-400 line-through text-xs" style={{ textDecoration: "line-through", color: "#94a3b8", fontSize: "12px" }}>
        //                   {c.orig}
        //                 </span>
        //               )}
        //               <span className="text-[#0096FF] font-bold text-[15px]" style={{ color: "#0096FF", fontWeight: "800", fontSize: "15px" }}>
        //                 {c.price}
        //               </span>
        //             </div>

        //             <a
        //               className="bg-[#0096FF] text-white rounded-lg px-4 py-2 text-[11px] font-bold tracking-wider hover:bg-[#005391] hover:text-white transition duration-150 "
        //               style={{ backgroundColor: "#0096FF", color: "#fff", borderRadius: "8px", padding: "8px 16px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.05em", textTransform: "capitalize" }}
        //               onClick={(e) => {
        //                 e.stopPropagation();
        //                 setDetail(c);
        //               }}
        //             >
        //               {/* VIEW COURSE */}
        //               coming soon
        //             </a>
        //           </div>
        //         </div>
        //       </div>
        //     ))
        //   )}
        // </div>