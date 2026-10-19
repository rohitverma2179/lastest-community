import React from "react";
import { Clock, BookOpen, Calendar, User } from "lucide-react";

export default function BlogHero({ hero }) {
  if (!hero) return null;

  return (
    <header className="flex flex-col gap-6 md:gap-8 mb-10">
      {/* Category & Read Time Tag */}
     

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
        {hero.metaTitle || hero.title}
      </h1>

      {/* Description */}
      {hero.description && (
        <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl">
          {hero.description}
        </p>
      )}

      {/* Author Bar */}
      {/* <div className="flex items-center gap-3 py-3 border-y border-gray-100 text-xs sm:text-sm text-gray-600">
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
          eG
        </div>
        <div>
          <span className="font-bold text-gray-900 block">eGrowth India Editorial Team</span>
          <span className="text-gray-500 text-xs">Quality & Compliance Insights · Updated 2026</span>
        </div>
      </div> */}

      {/* Hero Image */}
      {hero.image && (
        <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl border border-gray-200/80 shadow-md">
          <img
            src={hero.image}
            alt={hero.title || "Blog cover"}
            className="w-full h-auto min-h-[280px] max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-103"
          />
        </div>
      )}
    </header>
  );
}
