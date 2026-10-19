'use client';

import React, { useEffect } from "react";

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen text-[#1e293b] py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Title & Date */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#053a5e] tracking-tight mb-2">
            Privacy Policy
          </h1>
          {/* <p className="text-sm font-medium text-slate-500">
            Last Updated: 01.01.2026
          </p> */}
        </div>

        {/* Document Body */}
        <div className="space-y-6 text-slate-700 leading-relaxed text-base">
          <p>
            Bexex Global Pvt. Ltd. (“Bexex Global”, “we”, “us”, or “our”) operates multiple websites and digital platforms and related offerings under its own brand and through associated platforms, including eGrowthIndia.com. Bexex Global Pvt. Ltd. is the parent company of eGrowthIndia.com, and this policy applies to all current and future services, features, products, and digital properties operated by Bexex Global Pvt. Ltd., whether provided online, offline, or through any digital or physical medium.
          </p>

          <p>
            This Privacy Policy explains how personal information is collected, used, stored, and disclosed when users access or use our services. By using our websites or platforms, you agree to the practices described in this Privacy Policy.
          </p>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Information Collection and Use
            </h2>
            <p className="mb-4">
              To provide an effective learning and professional development experience, Bexex Global may collect personal information such as name, email address, phone number, location details, professional background, login credentials, profile information, resume data, course enrollment records, certificate information, and user-generated content submitted through community features. This information is collected to enable access to training programs, manage user accounts, issue certificates, provide learning resources, facilitate community participation, share career or freelance opportunities, send newsletters, and improve overall platform functionality.
            </p>
            <p>
              Personal information is used solely for legitimate business and service-related purposes. Bexex Global does not sell, rent, or trade personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Log Data
            </h2>
            <p>
              Whenever users visit our websites or platforms, certain information is automatically collected through standard technology. This log data may include the Internet Protocol address of the device, browser type and version, operating system, pages visited, date and time of access, duration of visits, and other usage statistics. This data is used for system administration, security monitoring, analytics, and continuous improvement of our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Cookies
            </h2>
            <p>
              Bexex Global uses cookies and similar technologies to enhance user experience and improve service performance. Cookies help us maintain login sessions, remember user preferences, understand usage patterns, and analyze platform traffic. Users may choose to disable cookies through their browser settings; however, doing so may limit access to certain features or functionality of the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Service Providers
            </h2>
            <p>
              Bexex Global may engage third-party service providers to support platform operations, including hosting services, learning management systems, email communication tools, analytics services, and security solutions. These service providers are granted access to personal information only to the extent necessary to perform their assigned tasks on our behalf and are contractually obligated to maintain confidentiality and use the information solely for authorized purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              User-Generated Content
            </h2>
            <p>
              Users may voluntarily create profiles, post content, participate in discussions, and upload documents or resources on the platform. Users are solely responsible for the content they submit and confirm that they own or have legal rights to share such content. Bexex Global does not claim ownership of user-generated content but reserves the right to review, moderate, remove, or restrict access to any content that violates applicable laws, intellectual property rights, confidentiality obligations, or community guidelines.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Security
            </h2>
            <p>
              We value the trust users place in us when sharing personal information and take reasonable administrative, technical, and organizational measures to protect such data. Despite these efforts, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect personal information, Bexex Global cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Links to Other Websites
            </h2>
            <p>
              Our services may contain links to third-party websites or platforms that are not operated by Bexex Global. We have no control over the content, privacy practices, or policies of such external sites and assume no responsibility for them. Users are encouraged to review the privacy policies of any third-party websites they choose to visit.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Children’s Privacy
            </h2>
            <p>
              Bexex Global platforms are designed to support learning for users of all age groups, including students and minors. We do not knowingly collect personal information from children under the age of 13 without appropriate parental or guardian consent. If we become aware that personal information has been collected from a child under 13 without consent, we will take steps to remove such information from our records. Certain professional features, including job listings, freelance opportunities, and resume visibility, are restricted to users aged 18 years and above.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Data Retention
            </h2>
            <p>
              Personal information is retained only for as long as necessary to fulfill the purposes for which it was collected, comply with legal and regulatory obligations, resolve disputes, and enforce agreements. Users may request correction or deletion of personal data, subject to applicable legal and operational requirements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Changes to This Privacy Policy
            </h2>
            <p>
              Bexex Global reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated effective date. Continued use of the platform after changes are published constitutes acceptance of the revised Privacy Policy.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 mt-10">
            <h2 className="text-xl font-bold text-[#053a5e] mb-3">
              Contact Information
            </h2>
            <p className="mb-4">
              If you have any questions regarding this Privacy Policy or how your information is handled, please contact:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2 font-medium">
              <p className="text-[#053a5e] font-bold">Bexex Global Pvt. Ltd.</p>
              <p>Email: <a href="mailto:info@bexexglobal.com" className="text-[#0096FF] hover:underline">info@bexexglobal.com</a></p>
              <p>Websites: <a href="https://www.bexexglobal.com" target="_blank" rel="noopener noreferrer" className="text-[#0096FF] hover:underline">www.bexexglobal.com</a> | <a href="https://www.egrowthindia.com" target="_blank" rel="noopener noreferrer" className="text-[#0096FF] hover:underline">www.egrowthindia.com</a></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
