import React from "react";
import BlogCard from "./BlogCard";
import BlogSkeleton from "./BlogSkeleton";

export default function BlogGrid({ blogs, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <BlogSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id || blog.slug} blog={blog} />
      ))}
    </div>
  );
}
