import '../index.css';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://egrowthindia.com'),
  title: 'eGrowthIndia',
  description: 'eGrowthIndia - Global Community for QHSE & ESG Professionals',
  icons: {
    icon: '/favicon.svg',
  },
  verification: {
    google: '0yUexI2_ryDolb2RyerE6xDXIbPUl-1cTy25r8CV3LY',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TKFF333D"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <Script id="delayed-analytics" strategy="afterInteractive">
          {`
            (function() {
              if (window.__egAnalyticsLoaded) return;
              var loaded = false;
              function loadAnalytics() {
                if (loaded) return;
                loaded = true;
                window.__egAnalyticsLoaded = true;
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
                function gtag(){window.dataLayer.push(arguments);}
                window.gtag = window.gtag || gtag;
                gtag('js', new Date());
                gtag('config', 'G-PZKX5ZT8S8');
                var gtm = document.createElement('script');
                gtm.async = true;
                gtm.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-TKFF333D';
                document.head.appendChild(gtm);
                var ga = document.createElement('script');
                ga.async = true;
                ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-PZKX5ZT8S8';
                document.head.appendChild(ga);
              }
              var events = ['pointerdown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
              events.forEach(function(evt) {
                window.addEventListener(evt, loadAnalytics, { once: true, passive: true });
              });
              setTimeout(loadAnalytics, 15000);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
