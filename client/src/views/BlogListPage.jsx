'use client';

import React, { useEffect } from "react";
import { getBlogs } from "../data/blog";
import BlogGrid from "../blog/BlogGrid";
const resourseBg = "/assets/bghero.png";

export default function BlogListPage() {
  const blogs = getBlogs();

  useEffect(() => {
    document.title = "Insights & ISO Standards Blog | eGrowth India";
    return () => {
      document.title = "eGrowthIndia";
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black pb-20">
      {/* Header Hero Banner matching project design */}
      <section
        className="hero page-hero"
        style={{
          backgroundImage: `url(${resourseBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="wrap hero-in">
          <div className="eyebrow eyebrow-white">
            Knowledge Hub · <span style={{ textTransform: "none" }}>eGrowthIndia</span>
          </div>
          <h1>
            Insights &amp; <span className="hl">ISO Standards</span> <br /> Blog
            &amp; Articles<span className="text-[#f18032]">.</span>
          </h1>
          <p className="sub">
            Explore complete guides on ISO 9001, ISO 14001, ISO 27001, ESG
            compliance, quality management, and professional growth in India.
          </p>
        </div>
      </section>

      {/* Main Static Blog Grid Section */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mt-12 md:mt-16">
        <BlogGrid blogs={blogs} loading={false} />
      </div>
    </div>
  );
}
