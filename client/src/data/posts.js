export const FEED_POSTS = [
  {
    id: "p1",
    type: "RESOURCE",
    author: {
      name: "Ram Kashyap",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&h=500&q=80",
      badge: "CREATOR",
      badgeColor: "bg-red-50 text-red-600 border-red-200",
      title: "ISO 14001 Lead • Hindustan Unilever",
      isFollowing: false
    },
    time: "2 hrs ago",
    tags: ["fire safety", "ISO 9001"],
    title: "ISO 14001:2005 New Act ?",
    content: "Cleaned up our version so it is generic. Use it, improve it, share it back. Critical for Use it, improve it, share it back. Critical for tracking long-term deviations across multiple facilities.",
    attachment: {
      type: "EXCEL",
      name: "CAPA-Tracker-with-Ageing.xls",
      size: "420 KB",
      license: "CC-BY-SA",
      actionLabel: "Get +1200",
      actionPoints: 1200
    },
    likes: 1500,
    comments: 4,
    downloads: 400,
    isBookmarked: false
  },
  {
    id: "p2",
    type: "QUESTION",
    author: {
      name: "Rohit Sharma",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&h=500&q=80",
      badge: "PIONEER",
      badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
      title: "ISO 9001 Lead • Hindustan Unilever",
      isFollowing: false
    },
    time: "2 hrs ago",
    tags: ["ISO 9001", "Food Safety", "Safety work"],
    title: "ISO 14001:2005 New Act ?",
    content: "Cleaned up our version so it is generic. Use it, improve it, share it back. Critical for Use it, improve it, share it back. Critical for tracking long-term deviations across multiple facilities.",
    actionLabel: "Request",
    likes: 1500,
    comments: 4,
    isBookmarked: false
  },
  {
    id: "p3",
    type: "POLL",
    author: {
      name: "Sunil Kumar",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&h=500&q=80",
      badge: "LEGEND",
      badgeColor: "bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]",
      title: "ISO 50001 Lead • Hindustan Unilever",
      isFollowing: true
    },
    time: "2 hrs ago",
    tags: ["ESG", "ISO 9001"],
    title: "For your next 45001 internal Audit, what do you find HARDEST to evidence well?",
    content: "",
    poll: {
      options: [
        { id: "o1", text: "hazard identification (process and behavioural)", percentage: 20, isWinner: true },
        { id: "o2", text: "hazard identification (process and behavioural)", percentage: 8, isWinner: false },
        { id: "o3", text: "hazard identification (process and behavioural)", percentage: 14, isWinner: false },
        { id: "o4", text: "hazard identification (process and behavioural)", percentage: 2, isWinner: false }
      ],
      totalVotes: 21
    },
    likes: 1500,
    comments: 4,
    isBookmarked: false
  },
  {
    id: "p4",
    type: "QUESTION",
    author: {
      name: "Kunal Singh",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&h=500&q=80",
      badge: "EXPLORER",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      title: "ISO 9001 Lead • Hindustan Unilever",
      isFollowing: false
    },
    time: "2 hrs ago",
    tags: ["ESG", "ISO 9001"],
    title: "ISO 14001:2005 New Act ?",
    content: "Cleaned up our version so it is generic. Use it, improve it, share it back. Critical for Use it, improve it, share it back. Critical for tracking long-term deviations across multiple facilities.",
    actionLabel: "Questions",
    likes: 1500,
    comments: 4,
    isBookmarked: false
  },
  {
    id: "p5",
    type: "EVENT",
    author: {
      name: "Ram Kashyap",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&h=500&q=80",
      badge: "BUILDER",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
      title: "ISO 14001 Lead • Hindustan Unilever",
      isFollowing: false
    },
    time: "2 hrs ago",
    tags: ["fire safety", "ISO 9001"],
    title: "ISO 14001:2005 New Act ?",
    content: "Cleaned up our version so it is generic. Use it, improve it, share it back. Critical for Use it, improve it, share it back. Critical for tracking long-term deviations across multiple facilities. read more..",
    event: {
      icon: "TEAMS",
      title: "Tue, Jul 28 11:00 IST",
      subtitle: "anyone can Join",
      actionLabel: "Register Now"
    },
    likes: 1500,
    comments: 4,
    registered: 210,
    isBookmarked: false
  },
  {
    id: "p6",
    type: "JOB",
    author: {
      name: "Krishna Rajput",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1600&h=500&q=80",
      badge: "CREATOR",
      badgeColor: "bg-red-50 text-red-600 border-red-200",
      title: "ISO 9001 Lead • Hindustan Unilever",
      isFollowing: false
    },
    time: "2 hrs ago",
    tags: ["Energy", "OISD"],
    title: "Energy manager(BEE Certified)",
    content: "1-2 years experience",
    job: {
      type: "Full-time",
      sector: "Power & Energy",
      location: "Rajasthan, India",
      compensation: "INR 12-18 LPA",
      applyTill: "10 Aug",
      actionLabel: "Apply Now"
    },
    likes: 1500,
    comments: 4,
    applied: 10,
    isBookmarked: false
  }
];
