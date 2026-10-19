'use client';

import React, { useEffect } from "react";

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen text-[#1e293b] py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header Title & Dates */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#053a5e] tracking-tight mb-2">
            Terms and Conditions
          </h1>
          {/* <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
            <span>Version: January 2026</span>
            <span>·</span>
            <span>Last Updated: 01.01.2026</span>
          </div> */}
        </div>

        {/* Document Body */}
        <div className="space-y-6 text-slate-700 leading-relaxed text-base">
          <p>
            Bexex Global Pvt. Ltd. (“Bexex Global”, “we”, “us”, or “our”) operates multiples websites and digital platforms and related offerings under its own brand and through associated platforms, including eGrowthIndia.com. Bexex Global Pvt. Ltd. is the parent company of eGrowthIndia.com, and this policy applies to all current and future services, features, products, and digital properties operated by Bexex Global Pvt. Ltd., whether provided online, offline, or through any digital or physical medium.
          </p>

          <p>
            By accessing or using any service operated by Bexex Global Pvt. Ltd., users agree to be bound by these Terms and Conditions. If a user does not agree to these terms, the services must not be accessed or used.
          </p>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Article 1. Services
            </h2>
            <p className="mb-4">
              Bexex Global Pvt. Ltd. provides professional learning, training, consulting, and digital services, including but not limited to online and offline training programs, learning management system access, community interaction features, digital resources, newsletters, certificates with online verification, and career or freelance opportunity sharing. The scope, format, and availability of services may vary depending on the specific program, subscription, or engagement. Certain services may be delivered directly by Bexex Global Pvt. Ltd. or through its learning platform eGrowthIndia.com and BexexGlobal.com.
            </p>
            <p className="mb-4">
              Bexex Global makes reasonable efforts to ensure that services are delivered in a professional manner consistent with industry standards. However, users acknowledge that learning outcomes, career progression, audit readiness, compliance results, or employment opportunities depend on multiple factors beyond the control of Bexex Global and therefore cannot be guaranteed.
            </p>
            <p>
              Bexex Global reserves the right to modify, update, suspend, or discontinue any service, feature, or content at any time, either temporarily or permanently, with or without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Article 2. Performance of Services and User Obligations
            </h2>
            <p className="mb-4">
              Users agree to provide accurate, current, and complete information during registration and while using the platform. Users are responsible for maintaining the confidentiality of their login credentials and for all activities conducted through their accounts. Any misuse, unauthorized access, or suspected breach must be reported immediately.
            </p>
            <p className="mb-4">
              The quality and effectiveness of services depend in part on user participation, timely input, and responsible conduct. Users agree to cooperate reasonably by providing required information, respecting timelines, and adhering to platform guidelines. Bexex Global shall not be responsible for delays, limitations, or reduced effectiveness of services resulting from incomplete, inaccurate, or delayed user input.
            </p>
            <p className="mb-4">
              Bexex Global may use internal teams, trainers, consultants, subcontractors, or third-party tools to deliver services efficiently. The use of such third parties does not relieve Bexex Global of its responsibility for overall service delivery.
            </p>
            <p>
              Services are provided on a non-exclusive basis, and Bexex Global may offer similar services to other individuals or organizations, including those operating in the same sector as the user.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Article 3. Term and Termination
            </h2>
            <p className="mb-4">
              These Terms and Conditions remain in effect for as long as the user accesses or uses any service operated by Bexex Global Pvt. Ltd. Users may discontinue use of the platform at any time by ceasing access or requesting account deletion, subject to applicable data retention requirements.
            </p>
            <p className="mb-4">
              Bexex Global reserves the right to suspend or terminate access to services immediately, without prior notice, in cases of misuse, violation of these Terms, breach of community guidelines, unlawful activity, non-payment of fees where applicable, or behavior that may harm the platform, other users, or Bexex Global’s reputation.
            </p>
            <p>
              Termination does not affect provisions that by their nature are intended to survive, including confidentiality, intellectual property, limitation of liability, and dispute resolution clauses.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Article 4. Fees, Payments, and Access
            </h2>
            <p className="mb-4">
              Certain services, courses, subscriptions, or programs may be offered free of charge, while others may require payment. Fees, subscription terms, access duration, and payment schedules will be communicated at the time of enrollment or purchase. Unless otherwise stated, fees are non-refundable once access has been granted.
            </p>
            <p>
              Bexex Global reserves the right to suspend access to paid services in the event of non-payment. Changes to pricing or subscription models may occur from time to time and will apply prospectively.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Article 5. Confidentiality
            </h2>
            <p className="mb-4">
              During the course of using the services, users may gain access to confidential or non-public information relating to Bexex Global, eGrowthIndia.com, other users, trainers, or partner organizations. Users agree to keep such information confidential and to use it only for legitimate purposes related to the services.
            </p>
            <p>
              Confidential information does not include information that is publicly available, independently developed, or lawfully obtained from a third party. Confidentiality obligations continue even after termination of access to the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Article 6. Liability
            </h2>
            <p className="mb-4">
              Services are provided on an “as-is” and “as-available” basis. To the maximum extent permitted by law, Bexex Global Pvt. Ltd. shall not be liable for any indirect, incidental, consequential, special, or punitive damages, including loss of profits, data, business opportunities, or reputation, arising from the use or inability to use the services.
            </p>
            <p>
              Bexex Global’s total liability, if any, shall be limited to the amount paid by the user for the specific service giving rise to the claim, during the twelve months preceding the event. This limitation does not apply in cases of proven willful misconduct or gross negligence.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Article 7. Intellectual Property Rights
            </h2>
            <p className="mb-4">
              All content provided by Bexex Global, including training materials, videos, presentations, templates, logos, designs, trademarks, and digital resources, is protected by intellectual property laws and remains the exclusive property of Bexex Global Pvt. Ltd. or its licensors. Users are granted a limited, non-transferable, non-exclusive right to access and use such content for personal or internal professional learning purposes only.
            </p>
            <p>
              Users retain ownership of content they submit, post, or upload but grant Bexex Global a non-exclusive, royalty-free, worldwide license to host, display, reproduce, and moderate such content for platform operation and service delivery. Users warrant that their content does not infringe third-party rights or violate confidentiality obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Article 8. Data Protection
            </h2>
            <p>
              Bexex Global processes personal data in accordance with applicable data protection laws, including Indian data protection regulations and, where applicable, international standards. Personal data may be processed for service delivery, administration, communication, compliance, and platform improvement purposes. Detailed information on data processing practices is provided in the Privacy Policy, which forms an integral part of these Terms and Conditions.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 mt-10">
            <h2 className="text-xl font-bold text-[#053a5e] mb-3">
              Miscellaneous
            </h2>
            <p className="mb-4">
              Bexex Global shall not be liable for failure or delay in performance caused by events beyond its reasonable control, including natural disasters, technical failures, governmental actions, or force majeure events. These Terms constitute the entire agreement between the user and Bexex Global regarding platform use and supersede any prior understandings.
            </p>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. These Terms shall be governed by and interpreted in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
