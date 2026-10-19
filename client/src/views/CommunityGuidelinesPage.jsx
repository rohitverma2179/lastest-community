'use client';

import React, { useEffect } from "react";

export default function CommunityGuidelinesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen text-[#1e293b] py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header Title & Date */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#053a5e] tracking-tight mb-2">
            Community Guidelines
          </h1>
          {/* <p className="text-sm font-medium text-slate-500">
            Last Updated: 01.01.2026
          </p> */}
        </div>

        {/* Document Body */}
        <div className="space-y-6 text-slate-700 leading-relaxed text-base">
          <p>
            Bexex Global Pvt. Ltd. (“Bexex Global”, “we”, “us”, or “our”) operates multiples websites and digital platforms and related offerings under its own brand and through associated platforms, including eGrowthIndia.com. Bexex Global Pvt. Ltd. is the parent company of eGrowthIndia.com, and this policy applies to all current and future services, features, products, and digital properties operated by Bexex Global Pvt. Ltd.
          </p>

          <p>
            These Community Guidelines apply to all users participating in community features such as discussion forums, question and answer sections, chat groups, comments, profile interactions, and any other user-to-user communication enabled on the platform. By participating in the community, users agree to follow these Community Guidelines in addition to the Terms and Conditions and other applicable policies.
          </p>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Purpose of the Community
            </h2>
            <p>
              The eGrowth community exists to encourage constructive discussions, practical knowledge exchange, peer learning, and professional growth across areas such as quality, safety, environment, sustainability, energy, leadership, and compliance. All interactions should be respectful, relevant, and aligned with the purpose of learning and professional development.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Expected Conduct
            </h2>
            <p>
              Users are expected to communicate respectfully and professionally at all times. Discussions should remain focused on learning, problem-solving, and experience sharing. Differences in opinions are welcome, but they must be expressed politely and without personal attacks. Users should avoid language or behavior that may be offensive, intimidating, misleading, or disruptive to others.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Prohibited Behavior
            </h2>
            <p className="mb-4">
              The following behaviors are not permitted on the platform. This includes abusive, harassing, threatening, or discriminatory language; personal attacks or insults; hate speech; sexually explicit or inappropriate content; spamming; repeated self-promotion; misleading professional claims; impersonation of others; solicitation without permission; and any activity that violates applicable laws or regulations.
            </p>
            <p>
              Users must not post or share content that is defamatory, false, or intended to harm the reputation of individuals, organizations, or communities.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Content Responsibility
            </h2>
            <p className="mb-4">
              Users are solely responsible for the content they post, comment on, upload, or share within the community. This includes text, documents, images, links, and any other materials. Users must ensure that their content does not violate intellectual property rights, confidentiality obligations, or privacy rights of any third party.
            </p>
            <p>
              Sharing proprietary company documents, confidential client information, paid training materials, internal audit reports, or copyrighted resources without authorization is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Professional Profiles and Representation
            </h2>
            <p>
              Users are responsible for ensuring that information shared in their profiles, resumes, or professional descriptions is accurate and truthful. Misrepresentation of qualifications, certifications, experience, or affiliations is not permitted. Bexex Global does not verify user-provided profile information unless explicitly stated.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Safety and Protection of Minors
            </h2>
            <p className="mb-4">
              The platform may be accessed by users under the age of 18 for general learning purposes. Any form of inappropriate communication, grooming, solicitation, or exploitation involving minors is strictly prohibited and will result in immediate action, including account suspension and reporting where required by law.
            </p>
            <p>
              Professional features such as job postings, freelance opportunities, and resume visibility are intended only for users aged 18 years and above.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Moderation and Enforcement
            </h2>
            <p className="mb-4">
              Bexex Global reserves the right to monitor, review, moderate, edit, restrict, or remove any content or user activity that violates these Community Guidelines, the Terms and Conditions, or applicable laws. Moderation may occur proactively or in response to user reports.
            </p>
            <p>
              Actions may include content removal, warnings, temporary suspension, permanent account termination, or restriction of specific features, depending on the severity and frequency of violations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              Reporting Violations
            </h2>
            <p>
              Users are encouraged to report content or behavior that violates these Community Guidelines. Reports will be reviewed in a reasonable timeframe. Bexex Global does not guarantee immediate action but will take appropriate steps based on the nature of the issue.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#053a5e] mb-3 mt-8">
              No Endorsement
            </h2>
            <p>
              Opinions, advice, and information shared by users within the community reflect the views of the individual users and do not represent the views of Bexex Global Pvt. Ltd. or eGrowthIndia.com. Participation in discussions does not constitute professional, legal, or regulatory advice.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 mt-10">
            <h2 className="text-xl font-bold text-[#053a5e] mb-3">
              Changes to These Guidelines
            </h2>
            <p>
              Bexex Global may update these Community Guidelines from time to time to reflect platform growth, legal requirements, or community needs. Updated versions will be posted on the platform, and continued participation in the community constitutes acceptance of the revised guidelines.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
