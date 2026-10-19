// ==============================================================================
// MOCK EVENTS DATA (Matching Production Design & Image Visuals)
// ==============================================================================

export const INITIAL_EVENTS = [
  {
    id: "evt-1",
    title: "Mastering Six Sigma Fundamentals in 2024",
    description: "Join this interactive clinic to demystify the core concepts of Six Sigma and how to apply.",
    category: "Quality",
    headerColor: "from-[#0052D4] via-[#4364F7] to-[#6FB1FC]", // Ocean Blue Gradient
    badges: ["LIVE WEBINAR", "UPCOMING"],
    author: {
      name: "Priya Sharma",
      title: "LEAD QUALITY ASSESSOR",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      badge: "CREATOR"
    },
    tags: ["HESG", "ISO 9001"],
    eventDate: "Mon, Aug 10 · 11:00 IST",
    attendeeInfo: "211 registered · Free",
    buttonType: "REGISTER_FREE", // "REGISTER_FREE" | "WATCH_RECORDING" | "NOT_AVAILABLE" | "JOIN_NOW"
    buttonText: "Register Free",
    stats: {
      upvotes: 1500,
      comments: 24,
      applied: 10
    },
    isBookmarked: false,
    hasUpvoted: false
  },
  {
    id: "evt-2",
    title: "Mastering Six Sigma Fundamentals in 2024",
    description: "Join this interactive clinic to demystify the core concepts of Six Sigma and how to apply.",
    category: "ESG",
    headerColor: "from-[#1F2937] to-[#374151]", // Dark Slate Gray
    badges: ["AMA", "COMPLETED"],
    author: {
      name: "Global ESG Coalition",
      title: "LEAD QUALITY ASSESSOR",
      avatar: null, // Shows initial icon fallback
      badge: "CREATOR"
    },
    tags: ["HESG", "ISO 9001"],
    eventDate: "Mon, Aug 10 · 11:00 IST",
    attendeeInfo: "211 registered · Free",
    buttonType: "WATCH_RECORDING",
    buttonText: "Watch Recording",
    stats: {
      upvotes: 1500,
      comments: 24,
      applied: 10
    },
    isBookmarked: false,
    hasUpvoted: false
  },
  {
    id: "evt-3",
    title: "Mastering Six Sigma Fundamentals in 2024",
    description: "Join this interactive clinic to demystify the core concepts of Six Sigma and how to apply.",
    category: "Safety",
    headerColor: "from-[#E55D57] to-[#FF8C87]", // Coral Red Gradient
    badges: ["LIVE CLINIC", "FINISHED"],
    author: {
      name: "Rahul Sharma",
      title: "LEAD QUALITY ASSESSOR",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      badge: "CREATOR"
    },
    tags: ["HESG", "ISO 9001"],
    eventDate: "Mon, Aug 10 · 11:00 IST",
    attendeeInfo: "211 registered · Free",
    buttonType: "NOT_AVAILABLE",
    buttonText: "Not Available",
    stats: {
      upvotes: 1500,
      comments: 24,
      applied: 10
    },
    isBookmarked: false,
    hasUpvoted: false
  },
  {
    id: "evt-4",
    title: "Mastering Six Sigma Fundamentals in 2024",
    description: "Join this interactive clinic to demystify the core concepts of Six Sigma and how to apply.",
    category: "Health",
    headerColor: "from-[#D9534F] to-[#E74C3C]", // Deep Red
    badges: ["LIVE CLINIC", "LIVE NOW"],
    author: {
      name: "Rahul Sharma",
      title: "LEAD QUALITY ASSESSOR",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      badge: "CREATOR"
    },
    tags: ["HESG", "ISO 9001"],
    eventDate: "Mon, Aug 10 · 11:00 IST",
    attendeeInfo: "211 registered · Free",
    buttonType: "JOIN_NOW",
    buttonText: "Join Now",
    stats: {
      upvotes: 1500,
      comments: 24,
      applied: 10
    },
    isBookmarked: false,
    hasUpvoted: false
  },
  {
    id: "evt-5",
    title: "Mastering Six Sigma Fundamentals in 2024",
    description: "Join this interactive clinic to demystify the core concepts of Six Sigma and how to apply.",
    category: "Quality",
    headerColor: "from-[#0052D4] via-[#4364F7] to-[#6FB1FC]", // Blue
    badges: ["LIVE WEBINAR", "UPCOMING"],
    author: {
      name: "Priya Sharma",
      title: "LEAD QUALITY ASSESSOR",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      badge: "CREATOR"
    },
    tags: ["HESG", "ISO 9001"],
    eventDate: "Mon, Aug 10 · 11:00 IST",
    attendeeInfo: "211 registered · Free",
    buttonType: "REGISTER_FREE",
    buttonText: "Register Free",
    stats: {
      upvotes: 1500,
      comments: 24,
      applied: 10
    },
    isBookmarked: false,
    hasUpvoted: false
  },
  {
    id: "evt-6",
    title: "Mastering Six Sigma Fundamentals in 2024",
    description: "Join this interactive clinic to demystify the core concepts of Six Sigma and how to apply.",
    category: "Welfare",
    headerColor: "from-[#1F2937] to-[#374151]", // Dark
    badges: ["LIVE CLINIC", "UPCOMING"],
    author: {
      name: "Global ESG Coalition",
      title: "LEAD QUALITY ASSESSOR",
      avatar: null,
      badge: "CREATOR"
    },
    tags: ["HESG", "ISO 9001"],
    eventDate: "Mon, Aug 10 · 11:00 IST",
    attendeeInfo: "211 registered · Free",
    buttonType: "JOIN_NOW",
    buttonText: "Join Now",
    stats: {
      upvotes: 1500,
      comments: 24,
      applied: 10
    },
    isBookmarked: false,
    hasUpvoted: false
  },
  {
    id: "evt-7",
    title: "Mastering Six Sigma Fundamentals in 2024",
    description: "Join this interactive clinic to demystify the core concepts of Six Sigma and how to apply.",
    category: "Environment",
    headerColor: "from-[#1F2937] to-[#374151]", // Dark
    badges: ["LIVE CLINIC", "UPCOMING"],
    author: {
      name: "Global ESG Coalition",
      title: "LEAD QUALITY ASSESSOR",
      avatar: null,
      badge: "CREATOR"
    },
    tags: ["HESG", "ISO 9001"],
    eventDate: "Mon, Aug 10 · 11:00 IST",
    attendeeInfo: "211 registered · Free",
    buttonType: "JOIN_NOW",
    buttonText: "Join Now",
    stats: {
      upvotes: 1500,
      comments: 24,
      applied: 10
    },
    isBookmarked: false,
    hasUpvoted: false
  },
  {
    id: "evt-8",
    title: "Mastering Six Sigma Fundamentals in 2024",
    description: "Join this interactive clinic to demystify the core concepts of Six Sigma and how to apply.",
    category: "Energy",
    headerColor: "from-[#E55D57] to-[#FF8C87]", // Red
    badges: ["LIVE CLINIC", "FINISHED"],
    author: {
      name: "Rahul Sharma",
      title: "LEAD QUALITY ASSESSOR",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      badge: "CREATOR"
    },
    tags: ["HESG", "ISO 9001"],
    eventDate: "Mon, Aug 10 · 11:00 IST",
    attendeeInfo: "211 registered · Free",
    buttonType: "NOT_AVAILABLE",
    buttonText: "Not Available",
    stats: {
      upvotes: 1500,
      comments: 24,
      applied: 10
    },
    isBookmarked: false,
    hasUpvoted: false
  },
  {
    id: "evt-9",
    title: "Mastering Six Sigma Fundamentals in 2024",
    description: "Join this interactive clinic to demystify the core concepts of Six Sigma and how to apply.",
    category: "ESG",
    headerColor: "from-[#0052D4] via-[#4364F7] to-[#6FB1FC]", // Blue
    badges: ["LIVE CLINIC", "UPCOMING"],
    author: {
      name: "Priya Sharma",
      title: "LEAD QUALITY ASSESSOR",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      badge: "CREATOR"
    },
    tags: ["HESG", "ISO 9001"],
    eventDate: "Mon, Aug 10 · 11:00 IST",
    attendeeInfo: "211 registered · Free",
    buttonType: "REGISTER_FREE",
    buttonText: "Register Free",
    stats: {
      upvotes: 1500,
      comments: 24,
      applied: 10
    },
    isBookmarked: false,
    hasUpvoted: false
  }
];
