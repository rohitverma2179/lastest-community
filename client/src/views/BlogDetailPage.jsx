'use client';

import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogBySlug } from "../data/blog";
import BlogLayout from "../blog/bloginnerPages/BlogLayout";
import { ArrowLeft, BookOpen, Share2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (blog) {
      // 1. Browser tab title
      const tabTitle =
        blog.metaTitle ||
        blog.hero?.subtitle ||
        blog.hero?.metaTitle ||
        "ISO Certification Training India | eGrowth India";
      document.title = tabTitle;

      // 2. Meta description in <head>
      const desc = blog.metaDescription || blog.hero?.description;
      if (desc) {
        let metaDescTag = document.querySelector('meta[name="description"]');
        if (!metaDescTag) {
          metaDescTag = document.createElement("meta");
          metaDescTag.setAttribute("name", "description");
          document.head.appendChild(metaDescTag);
        }
        metaDescTag.setAttribute("content", desc);
      }
    }

    return () => {
      document.title = "eGrowthIndia";
    };
  }, [slug, blog]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!blog) {
    return (
      <div className="min-h-[70vh] bg-white text-gray-900 flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Blog Post Not Found</h2>
        <p className="text-gray-500 max-w-md mb-6">
          The requested blog article could not be located.
        </p>
        <Link
          to="/blog"
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-sm"
        >
          ← Back to Blog Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-16">
      {/* Top Breadcrumb & Share Bar */}
    

      {/* Main Blog Article Rendered via BlogLayout */}
      <BlogLayout blog={blog} />
    </div>
  );
}
