import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  {
    path: '/',
    title: 'eGrowthIndia - Global Community for QHSE & ESG Professionals',
    description: 'eGrowthIndia - Global Community for QHSE & ESG Professionals. Access free resources, webinars, courses, and connect with global industry leaders.'
  },
  {
    path: '/resources',
    title: 'Free QHSE & ESG Resources, Templates & Guidelines | eGrowthIndia',
    description: 'Download free QHSE checklists, SOP templates, ISO audit documents, and ESG toolkits created and reviewed by industry experts.'
  },
  {
    path: '/courses',
    title: 'Professional QHSE & ESG Certification Courses | eGrowthIndia',
    description: 'Explore industry-leading certification courses in ISO 9001, 14001, 45001, Safety Auditing, and ESG management.'
  },
  {
    path: '/contact',
    title: 'Contact Us | eGrowthIndia',
    description: 'Get in touch with the eGrowthIndia team for questions, partnerships, support, and community inquiries.'
  },
  {
    path: '/blog',
    title: 'Blogs, Industry Insights & News | eGrowthIndia',
    description: 'Read the latest blogs, trends, and articles on Quality, Health, Safety, Environment, and ESG sustainability.'
  },
  {
    path: '/blog/iso-certification-training-india',
    title: 'ISO Certification Training India | eGrowth India',
    description: 'Explore ISO certification training in India covering ISO 9001, ISO 14001 and ISO 27001. Learn what these programs cover and how to choose the right one.'
  },
  {
    path: '/community',
    title: 'Global Community & Chapters | eGrowthIndia',
    description: 'Join 10,000+ QHSE and ESG professionals worldwide. Network, share knowledge, and grow your career.'
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | eGrowthIndia',
    description: 'Read the eGrowthIndia Privacy Policy regarding how we protect and handle your personal data.'
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | eGrowthIndia',
    description: 'Review terms and conditions for using the eGrowthIndia platform and community services.'
  },
  {
    path: '/community-guidelines',
    title: 'Community Guidelines | eGrowthIndia',
    description: 'Learn about the standards and expectations for participating in the eGrowthIndia professional network.'
  },
  {
    path: '/iso-certification-training-india',
    title: 'ISO Certification Training India | ISO & EHS | Egrowth India',
    description: 'Build practical ISO and EHS skills with ISO certification training India teams can apply at work. Explore ISO 9001, 14001 and 45001 courses. Enquire now.',
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
];

async function prerender() {
  console.log('\n🚀 [Pre-render] Starting SSR build for pre-rendering...');

  // 1. Build SSR bundle
  execSync('npx vite build --ssr src/entry-server.jsx --outDir dist-ssr', {
    cwd: __dirname,
    stdio: 'inherit'
  });

  // 2. Setup browser polyfills for Node.js SSR
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
  };

  globalThis.window = {
    location: { href: 'https://egrowthindia.com', pathname: '/', origin: 'https://egrowthindia.com' },
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
    scrollTo: () => {}
  };

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

  // 3. Load SSR module
  const ssrPath = path.resolve(__dirname, 'dist-ssr/entry-server.js');
  const { render } = await import(`file://${ssrPath.replace(/\\/g, '/')}`);

  const templatePath = path.resolve(__dirname, 'dist/index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found! Please run "vite build" first.');
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  console.log('⚡ [Pre-render] Generating static HTML for routes...');

  for (const route of routes) {
    try {
      const appHtml = render(route.path);

      let html = template;

      // Replace root content
      html = html.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      // Replace Title
      if (route.title) {
        html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
      }

      // Replace or add Meta Description
      if (route.description) {
        if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
          html = html.replace(
            /<meta\s+name=["']description["'][^>]*>/i,
            `<meta name="description" content="${route.description}" />`
          );
        } else {
          html = html.replace(
            '</head>',
            `  <meta name="description" content="${route.description}" />\n</head>`
          );
        }
      }

      // Add OpenGraph Tags for Social Media & Bots
      const ogTags = `
  <meta property="og:title" content="${route.title}" />
  <meta property="og:description" content="${route.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://egrowthindia.com${route.path === '/' ? '' : route.path}" />
`;
      html = html.replace('</head>', `${ogTags}</head>`);

      // Inject headExtra (e.g. JSON-LD structured data)
      if (route.headExtra) {
        html = html.replace('</head>', `${route.headExtra}\n</head>`);
      }

      // Determine output directory
      let outDir;
      let outFile;
      if (route.path === '/') {
        outFile = path.resolve(__dirname, 'dist/index.html');
      } else {
        outDir = path.resolve(__dirname, `dist${route.path}`);
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }
        outFile = path.resolve(outDir, 'index.html');
      }

      fs.writeFileSync(outFile, html, 'utf-8');

      if (route.path !== '/') {
        const flatHtmlFile = path.resolve(__dirname, `dist${route.path}.html`);
        fs.writeFileSync(flatHtmlFile, html, 'utf-8');
      }

      console.log(`  ✓ Pre-rendered: ${route.path} -> ${path.relative(__dirname, outFile)} (${Math.round(html.length / 1024)} KB)`);
    } catch (err) {
      console.error(`  ✕ Error pre-rendering ${route.path}:`, err);
    }
  }

  // 4. Cleanup dist-ssr
  const distSsrDir = path.resolve(__dirname, 'dist-ssr');
  if (fs.existsSync(distSsrDir)) {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
  }

  console.log('\n🎉 [Pre-render] Successfully generated all static HTML pages with full content for Ctrl+U & SEO!\n');
}

prerender().catch(err => {
  console.error('[Pre-render] Failed:', err);
  process.exit(1);
});
