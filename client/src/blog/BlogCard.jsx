import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";

export default function BlogCard({ blog }) {
  if (!blog) return null;

  const imageUrl = blog.image || blog.hero?.image;
  const title =
    blog.hero?.metaTitle || blog.hero?.title || blog.hero?.subtitle || blog.title;
  const description = blog.hero?.description || blog.excerpt;
  const category = blog.category || "ISO Standards";
  const readTime = blog.readTime || "8 min read";

  return (
    <article
      data-aos="fade-up"
      className="group relative bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
    >
      {/* Top Image Container */}
      <Link
        to={`/blog/${blog.slug}`}
        className="block relative overflow-hidden aspect-[16/10] bg-gray-100"
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

       
      </Link>

      {/* Content Area */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          <Link to={`/blog/${blog.slug}`}>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#0096FF] transition-colors leading-snug line-clamp-2 mb-3 cursor-pointer">
              {title}
            </h3>
          </Link>
          {description && (
            <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-3 mb-5">
              {description}
            </p>
          )}
        </div>

        {/* Card Footer */}
        <div className="pt-0 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0096FF] font-bold text-xs flex items-center justify-center border border-blue-100">
              eG
            </div>
            <span className="text-xs font-medium text-gray-500">
              eGrowth Knowledge
            </span> */}
          </div>

          <Link
            to={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0096FF] group-hover:text-[#0096FF] transition-colors"
          >
            <span>Read Article</span>
            <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0096FF] group-hover:bg-[#0096FF] group-hover:text-white flex items-center justify-center transition-colors duration-200">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
