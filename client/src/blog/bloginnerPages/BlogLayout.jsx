import React, { useState } from "react";
import BlogHero from "./BlogHero";
import BlogContent from "./BlogContent";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function BlogLayout({ blog }) {
  const [openFaq, setOpenFaq] = useState(0); // 1st FAQ open by default

  if (!blog) return null;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <article className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-14">
      <div className="max-w-[880px] mx-auto">
        {/* Hero Section */}
        {blog.hero && <BlogHero hero={blog.hero} />}

        {/* Article Body Content */}
        {blog.content && (
          <div className="mt-8 md:mt-12">
            <BlogContent content={blog.content} />
          </div>
        )}

        {/* Collapsible FAQ Accordion Section */}
        {blog.faq && blog.faq.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-200">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0096FF] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {blog.faq.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-blue-300 bg-blue-50/20 shadow-xs"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-base sm:text-lg text-gray-900 leading-snug">
                        {item.question}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 bg-blue-100 text-[#0096FF]" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100/80 animate-fadeIn">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
