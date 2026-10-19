import mongoose from "mongoose";
import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import Answer from "../model/answer.model.js";
import { getIO } from "../socket.js";

// Mock users to seed if the database is empty
const mockUsersData = [
  { email: "ananya.r@egrowth.com", firstName: "Ananya", lastName: "Ramaswamy", designation: "ISO 9001 Lead Auditor · Quality Systems Consultant", reputation: 3842 },
  { email: "nakul.r@egrowth.com", firstName: "Nakul", lastName: "Rohilla", designation: "HSE Manager · Mining & Heavy Industry", reputation: 7820 },
  { email: "sonu.s@egrowth.com", firstName: "Sonu", lastName: "Singh", designation: "Sustainability Lead · GRI Certified", reputation: 11250 },
  { email: "mukul.m@egrowth.com", firstName: "Mukul", lastName: "Mehlawat", designation: "Process Safety Engineer · Refining & Petrochem", reputation: 2140 },
  { email: "manish.r@egrowth.com", firstName: "Manish", lastName: "Rohilla", designation: "Environmental Compliance Specialist", reputation: 940 },
  { email: "rohit.m@egrowth.com", firstName: "Rohit", lastName: "Mehra", designation: "Energy Auditor · ISO 50001 Lead", reputation: 4600 },
  { email: "linh.t@egrowth.com", firstName: "Linh", lastName: "Tran", designation: "CSR & ESG Analyst · Apparel Supply Chain", reputation: 1820 },
  { email: "pushpender@egrowth.com", firstName: "Pushpender", lastName: "Sharma", designation: "Founder, eGrowth India · QEHS Trainer · Author", reputation: 38400 },
  { email: "amit.s@egrowth.com", firstName: "Amit", lastName: "Singh", designation: "Co-Founder & CEO, eGrowth India", reputation: 24600 }
];

// Mock posts to seed if database is empty
const mockPostsData = [
  // {
  //   kind: "question",
  //   authorKey: "mukul.m",
  //   tags: ["safety", "process-safety"],
  //   title: "How are you handling LOPA studies for legacy offshore platforms without full P&ID documentation?",
  //   body: "We inherited a 1998-era platform from an acquisition and the documentation is patchy. Looking for practical approaches — has anyone reverse-engineered P&IDs from field walkdowns for LOPA? How much confidence can regulators accept?",
  //   counts: { upvotes: 47, answers: 12, views: 1840 }
  // },
  {
    kind: "resource",
    authorKey: "sonu.s",
    tags: ["esg", "sustainability", "reporting"],
    title: "GRI 2024 Disclosure Mapping Template — aligned with ESRS & TCFD",
    body: "Spent the last two months mapping every GRI 2024 indicator to the corresponding ESRS data point and TCFD recommendation. Sharing the working spreadsheet — free, 43 indicators covered, formulas intact.",
    file: { type: "xls", name: "GRI-2024-Mapping-v3.xlsx", size: "2.1 MB" },
    counts: { upvotes: 214, downloads: 1289, comments: 38 }
  },
  // {
  //   kind: "job",
  //   authorKey: "nakul.r",
  //   tags: ["health", "safety", "hse"],
  //   title: "Senior HSE Manager — Mining Operations (Botswana)",
  //   body: "Leading a team of 14 across three open-pit sites. Must have 10+ yrs in extractive industries, NEBOSH Diploma, experience with ICMM principles. Competitive expat package, 6/2 rotation.",
  //   company: "Kopano Resources",
  //   location: "Selebi-Phikwe, Botswana",
  //   salary: "USD 140–180K + package",
  //   counts: { applications: 23, views: 892, saves: 
  // },
  // {
  //   kind: "request",
  //   authorKey: "manish.r",
  //   tags: ["environment", "compliance"],
  //   title: "Looking for UAE Cabinet Decision 37/2001 implementation guide",
  //   body: "Specifically for cement manufacturing — stack emission limits and monitoring frequency. Has anyone got a checklist they've used? Happy to share my own water-quality one in return.",
  //   counts: { responses: 5, upvotes: 14 }
  // },
  {
    kind: "event",
    authorKey: "pushpender",
    tags: ["training", "webinar", "quality"],
    title: " Free webinar: Decoding ISO 9001:2026 — What's Actually Changing",
    body: "Walking through the draft revision, clause-by-clause, with practical transition checklists. 45 minutes + live Q&A. Recording sent to all registrants. 1,200+ already signed up.",
    eventDate: "Tue, May 12 · 14:00 UTC",
    counts: { registrations: 1247, interested: 340 }
  },
  // {
  //   kind: "question",
  //   authorKey: "rohit.m",
  //   tags: ["energy", "iso-50001"],
  //   title: "Energy baseline normalization — degree-days vs. regression: which does your auditor prefer?",
  //   body: "I've used both for different clients. Auditors seem split. In practice, for a mixed-use facility (offices + light manufacturing), the regression approach gives a tighter fit but is harder to defend to non-technical stakeholders. Thoughts?",
  //   counts: { upvotes: 34, answers: 8, views: 512 }
  // },
  // {
  //   kind: "resource",
  //   authorKey: "ananya.r",
  //   tags: ["quality", "audit"],
  //   title: "Internal Audit Question Bank — 127 questions across all ISO 9001:2015 clauses",
  //   body: "Compiled from 6 years of auditing across automotive, pharma, and medical device sectors. Organized by clause, with follow-up probes and typical non-conformities flagged.",
  //   file: { type: "pdf", name: "ISO9001-Audit-Question-Bank.pdf", size: "1.8 MB" },
  //   counts: { upvotes: 186, downloads: 942, comments: 24 }
  // },
  {
    kind: "job",
    authorKey: "sonu.s",
    tags: ["esg", "sustainability"],
    title: "ESG Reporting Analyst — Remote (APAC timezones)",
    body: "Growing climate-tech consultancy. 3–5 yrs ESG reporting experience, GRI or SASB certification required. Supporting clients across SEA on BRSR readiness. Fully remote.",
    company: "GreenArc Advisory",
    location: "Remote (Singapore / Manila / HCMC)",
    salary: "USD 65–85K",
    counts: { applications: 41, views: 1204, saves: 89 }
  },
  // {
  //   kind: "question",
  //   authorKey: "linh.t",
  //   tags: ["esg", "supply-chain", "apparel"],
  //   title: "How do you handle Scope 3 Category 1 data from tier-3 fabric mills that won't respond?",
  //   body: "Our top-tier suppliers are engaged, but we can only trace 40% of fabric to specific mills, and of those, ~15% respond to data requests. Using spend-based for the rest feels weak. Any creative approaches working for you?",
  //   counts: { upvotes: 28, answers: 11, views: 680 }
  // }
];

// Helper to seed users and return a map of user keys to object IDs
const seedUsers = async () => {
  const usersMap = {};
  for (const data of mockUsersData) {
    let user = await User.findOne({ email: data.email });
    if (!user) {
      user = await User.create({
        ...data,
        password: "password123", // Dummy password
        isVerified: true
      });
    }
    usersMap[data.email.split("@")[0]] = user._id;
  }
  return usersMap;
};

// Helper to seed posts
const seedPosts = async () => {
  try {
    const usersMap = await seedUsers();
    for (const postData of mockPostsData) {
      const authorId = usersMap[postData.authorKey];
      if (authorId) {
        await Post.create({
          kind: postData.kind,
          author: authorId,
          tags: postData.tags,
          title: postData.title,
          body: postData.body,
          file: postData.file,
          company: postData.company,
          location: postData.location,
          salary: postData.salary,
          eventDate: postData.eventDate,
          counts: postData.counts
        });
      }
    }
    console.log("[DB] Seeded mock posts and users successfully.");
    await seedAnswers(usersMap);
  } catch (error) {
    console.error("[DB] Error seeding posts:", error);
  }
};

// @desc    Get all posts
// @route   GET /api/v1/posts
export const getPosts = async (req, res) => {
  try {
    let posts = await Post.find()
      .populate("author", "firstName lastName designation reputation color email avatar coverPhoto")
      .populate("eventRef")
      .sort({ updatedAt: -1, createdAt: -1 });

    // Seed database if empty
    if (posts.length === 0) {
      await seedPosts();
      posts = await Post.find()
        .populate("author", "firstName lastName designation reputation color email avatar coverPhoto")
        .populate("eventRef")
        .sort({ updatedAt: -1, createdAt: -1 });
    }

    res.json({ success: true, posts });
  } catch (error) {
    console.error("[POST] Get posts error:", error);
    res.status(500).json({ success: false, message: "Server error fetching posts" });
  }
};

// @desc    Create new post
// @route   POST /api/v1/posts
export const createPost = async (req, res) => {
  try {
    const { kind, title, body, tags, bounty, pollOptions, quizOptions, quizCorrectIndex, allowMultipleAnswers } = req.body;

    if (!kind || !title) {
      return res.status(400).json({ success: false, message: "Kind and title are required fields." });
    }

    let formattedPollOptions = [];
    if (kind === "poll") {
      if (!pollOptions || !Array.isArray(pollOptions) || pollOptions.length < 2) {
        return res.status(400).json({ success: false, message: "Poll requires at least 2 options." });
      }
      formattedPollOptions = pollOptions.map(opt => typeof opt === 'string' ? { text: opt, votes: 0, votedUsers: [] } : opt);
    }

    let formattedQuizOptions = [];
    if (kind === "quiz") {
      if (!quizOptions || !Array.isArray(quizOptions) || quizOptions.length < 2) {
        return res.status(400).json({ success: false, message: "Quiz requires at least 2 options." });
      }
      const correctIdx = quizCorrectIndex ?? 0;
      formattedQuizOptions = quizOptions.map((opt, idx) => {
        const optText = typeof opt === 'string' ? opt : opt.text;
        const isCorrect = typeof opt === 'object' && opt.isCorrect !== undefined ? opt.isCorrect : (idx === correctIdx);
        return { text: optText, isCorrect, votes: 0, votedUsers: [] };
      });
    }

    const post = await Post.create({
      kind,
      author: req.user._id,
      title,
      body: body || title,
      tags: tags || [],
      bounty: bounty || 0,
      pollOptions: formattedPollOptions,
      allowMultipleAnswers: kind === "poll" ? !!allowMultipleAnswers : false,
      quizOptions: formattedQuizOptions,
      quizCorrectIndex: quizCorrectIndex ?? 0,
      counts: {
        upvotes: 0,
        answers: 0,
        views: 0,
        downloads: 0,
        comments: 0,
        responses: 0,
        registrations: 0
      }
    });

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "firstName lastName designation reputation color email avatar coverPhoto"
    );

    res.status(201).json({ success: true, post: populatedPost });
  } catch (error) {
    console.error("[POST] Create post error:", error);
    res.status(500).json({ success: false, message: "Server error creating post" });
  }
};

// ==============================================================================
// POLL VOTE CONTROLLER (Single Choice Lock OR WhatsApp Multi-Choice Switch)
// ==============================================================================
export const votePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionIndex } = req.body;
    const userId = req.user._id;

    // 1. Database se poll post fetch karo
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Poll not found" });
    }
    if (post.kind !== "poll") {
      return res.status(400).json({ success: false, message: "This post is not a poll" });
    }

    // 2. Option Index range validate karo
    if (optionIndex === undefined || optionIndex < 0 || optionIndex >= post.pollOptions.length) {
      return res.status(400).json({ success: false, message: "Invalid option index" });
    }

    const isMultipleAllowed = !!post.allowMultipleAnswers;

    if (!isMultipleAllowed) {
      // -----------------------------------------------------------------------
      // SINGLE SELECTION MODE (Default)
      // Rule: "bss ak bari kisi ne select kr diya hai toh wo unselect nhi kr payega wo"
      // -----------------------------------------------------------------------
      const userAlreadyVotedAny = post.pollOptions.some(opt =>
        opt.votedUsers && opt.votedUsers.some(uid => uid.toString() === userId.toString())
      );

      if (userAlreadyVotedAny) {
        return res.status(400).json({
          success: false,
          message: "You have already voted in this single-choice poll and cannot change your vote."
        });
      }

      // Add vote to the selected option
      post.pollOptions[optionIndex].votes += 1;
      if (!post.pollOptions[optionIndex].votedUsers) {
        post.pollOptions[optionIndex].votedUsers = [];
      }
      post.pollOptions[optionIndex].votedUsers.push(userId);

    } else {
      // -----------------------------------------------------------------------
      // MULTIPLE SELECTION MODE (WhatsApp Style)
      // Rule: "agr toggle button kr diya hai toh whatsapp mai jaise many select ho jaata hai waise hi hm fir apne menny selck kr sakege"
      // Each option toggles independently.
      // -----------------------------------------------------------------------
      const targetOpt = post.pollOptions[optionIndex];
      const hasVotedThisOpt = targetOpt.votedUsers && targetOpt.votedUsers.some(
        uid => uid.toString() === userId.toString()
      );

      if (hasVotedThisOpt) {
        // Toggle OFF (Unvote this specific option)
        targetOpt.votes = Math.max(0, targetOpt.votes - 1);
        targetOpt.votedUsers = targetOpt.votedUsers.filter(
          uid => uid.toString() !== userId.toString()
        );
      } else {
        // Toggle ON (Vote this specific option)
        targetOpt.votes += 1;
        if (!targetOpt.votedUsers) {
          targetOpt.votedUsers = [];
        }
        targetOpt.votedUsers.push(userId);
      }
    }

    // Save updated post
    await post.save();

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "firstName lastName designation reputation color email avatar coverPhoto"
    );

    res.json({ success: true, post: populatedPost });
  } catch (error) {
    console.error("[POLL] Vote error:", error);
    res.status(500).json({ success: false, message: "Server error voting on poll" });
  }
};

// ==============================================================================
// WHATSAPP STYLE QUIZ VOTE CONTROLLER
// ==============================================================================
// @desc    Vote / Submit answer on a quiz option (WhatsApp Style Quiz)
// @route   POST /api/v1/posts/:id/quiz/vote
//
// KYU (Why): 
//   WhatsApp Quiz me jab user option select karta hai, uski response submit 
//   hoti hai aur user ko immediately correct/wrong option feedback milta hai.
//
// KYA (What):
//   1. Check if post is kind "quiz".
//   2. Target quiz option par vote increment aur votedUsers update.
//   3. Responses count update karke populated post return.
// ==============================================================================
export const voteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionIndex } = req.body;
    const userId = req.user._id;

    // 1. Fetch Quiz post from database
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }
    if (post.kind !== "quiz") {
      return res.status(400).json({ success: false, message: "This post is not a quiz" });
    }

    // 2. Validate option index range
    if (optionIndex === undefined || optionIndex < 0 || optionIndex >= post.quizOptions.length) {
      return res.status(400).json({ success: false, message: "Invalid option index" });
    }

    // 3. Check if user already submitted answer to this quiz
    let existingVoteIndex = -1;
    post.quizOptions.forEach((opt, idx) => {
      if (opt.votedUsers && opt.votedUsers.some(uid => uid.toString() === userId.toString())) {
        existingVoteIndex = idx;
      }
    });

    if (existingVoteIndex !== -1) {
      return res.status(400).json({ success: false, message: "You have already answered this quiz" });
    }

    // 4. Increment votes for target option & add user ID to votedUsers
    post.quizOptions[optionIndex].votes += 1;
    if (!post.quizOptions[optionIndex].votedUsers) {
      post.quizOptions[optionIndex].votedUsers = [];
    }
    post.quizOptions[optionIndex].votedUsers.push(userId);

    // Increment overall responses count for the quiz post
    post.counts.responses = (post.counts.responses || 0) + 1;

    // 5. Save updated post in MongoDB
    await post.save();

    // 6. Return populated post object
    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "firstName lastName designation reputation color email avatar coverPhoto"
    );

    res.json({ success: true, post: populatedPost });
  } catch (error) {
    console.error("[QUIZ] Vote error:", error);
    res.status(500).json({ success: false, message: "Server error voting on quiz" });
  }
};

// Seeder for answers
const seedAnswers = async (usersMap) => {
  try {
    const count = await Answer.countDocuments();
    if (count > 0) return;

    const lopaPost = await Post.findOne({ title: /LOPA studies for legacy offshore platforms/ });
    if (!lopaPost) return;

    const mockAnswers = [
      {
        post: lopaPost._id,
        author: usersMap["pushpender"],
        body: `Great question — we did exactly this for a 1995 Bombay High platform three years back. Here's what worked:

**1. Risk-rank your walkdowns.** Not every node deserves equal P&ID reconstruction effort. Start with the 20% of nodes that drive 80% of your LOPA risk reduction targets.

**2. Two-engineer walkdowns.** One reads the existing (incomplete) drawings; the other physically traces. Any discrepancy gets photographed and re-walked the next day.

**3. The "blind reveal" test.** After your walkdown reconstruction, hand the new P&IDs to a senior operator who's been on the platform 10+ years. Ask them to mark anything missing or wrong. ~85% of our gaps surfaced this way.

**4. For interlocks specifically** — get the OEM cause-and-effect matrix from the ESD vendor (Honeywell, ABB, whoever installed). Even if the install is 25 years old, the matrix usually survives in their archive.

**5. Regulator defensibility.** Document your walkdown methodology BEFORE walking. We used IEC 61511 Edition 2 Annex E.4 + ISA TR84.00.04.

DM me if you want the walkdown checklist template — it's ~40 pages.`,
        upvotes: 124,
        accepted: true,
        founder: true,
        repoEarned: 50,
        replies: [
          {
            author: usersMap["ananya.r"],
            body: 'This is exactly what I needed. Especially the "blind reveal" test — brilliant. Thank you, Pushpender.',
            upvotes: 8,
            replies: [
              {
                author: usersMap["pushpender"],
                body: 'Happy to help! The blind reveal alone saved us from 3 missed safety functions on that project. DM me for the checklist.',
                upvotes: 3,
                replies: [],
              }
            ]
          },
          {
            author: usersMap["nakul.r"],
            body: "Co-sign on the ESD vendor matrix. Honeywell will charge but it's worth every rupee. We did the same on a Sasol asset last year.",
            upvotes: 5,
            replies: [
              {
                author: usersMap["rohit.m"],
                body: "ABB also keeps archives going back to the 80s in some regions. Worth a call before you give up on vendor docs.",
                upvotes: 2,
                replies: [],
              }
            ]
          }
        ]
      },
      {
        post: lopaPost._id,
        author: usersMap["nakul.r"],
        body: `Adding to Pushpender's excellent answer with mining/heavy-industry experience:

We use a **3-tier evidence framework** when defending LOPA to regulators with incomplete docs:
- **Tier 1 (highest):** vendor docs, original commissioning records, operator interviews recorded
- **Tier 2:** field walkdown verified by 2+ engineers, photographed
- **Tier 3 (weakest):** inference from similar units, manufacturer typicals

We grade every assumption in our LOPA worksheet by tier, and any Tier 3 evidence triggers either a SIL bump or an explicit conservatism in the IPL credit. Regulators accept this because it's transparent.`,
        upvotes: 67,
        accepted: false,
        repoEarned: 28,
        replies: [
          {
            author: usersMap["sonu.s"],
            body: "The tiering approach is elegant. Do you publish the tier grading in the LOPA report itself, or keep it internal?",
            upvotes: 4,
            replies: []
          }
        ]
      }
    ];

    await Answer.create(mockAnswers);
    console.log("[DB] Seeded mock answers successfully.");
  } catch (error) {
    console.error("[DB] Error seeding answers:", error);
  }
};

// Helper for recursive reply search/injection
function addReplyRecursive(replies, targetId, newReply) {
  if (!replies || !Array.isArray(replies)) return false;
  for (let r of replies) {
    if (r._id && r._id.toString() === targetId.toString()) {
      if (!r.replies) r.replies = [];
      r.replies.push(newReply);
      return true;
    }
    if (r.replies && r.replies.length > 0) {
      const found = addReplyRecursive(r.replies, targetId, newReply);
      if (found) return true;
    }
  }
  return false;
}

// Helper to check if a reply exists anywhere in a replies tree
function hasReplyRecursive(replies, targetId) {
  if (!replies || !Array.isArray(replies)) return false;
  for (let r of replies) {
    if (r._id && r._id.toString() === targetId.toString()) {
      return true;
    }
    if (r.replies && r.replies.length > 0) {
      if (hasReplyRecursive(r.replies, targetId)) return true;
    }
  }
  return false;
}

// Helper to recursively upvote a reply
function voteReplyRecursive(replies, targetId, increment, userId) {
  if (!replies || !Array.isArray(replies)) return false;
  for (let r of replies) {
    if (r._id && r._id.toString() === targetId.toString()) {
      r.upvotes = Math.max(0, (r.upvotes || 0) + increment);
      if (userId) {
        if (!r.upvotedBy) r.upvotedBy = [];
        const exists = r.upvotedBy.some(id => id.toString() === userId.toString());
        if (increment > 0 && !exists) {
          r.upvotedBy.push(userId);
        } else if (increment < 0 && exists) {
          r.upvotedBy = r.upvotedBy.filter(id => id.toString() !== userId.toString());
        }
      }
      return true;
    }
    if (r.replies && r.replies.length > 0) {
      const found = voteReplyRecursive(r.replies, targetId, increment, userId);
      if (found) return true;
    }
  }
  return false;
}

// Helper to deeply populate nested replies up to N levels
function getRepliesPopulate(depth = 10) {
  if (depth <= 0) return null;
  return {
    path: "replies",
    populate: [
      { path: "author", select: "firstName lastName designation reputation color email avatar coverPhoto" },
      ...(depth > 1 ? [getRepliesPopulate(depth - 1)] : [])
    ]
  };
}

// @desc    Get single post by ID (supports Post ID or Event ID)
// @route   GET /api/v1/posts/:id
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    let post = null;
    if (isValidId) {
      post = await Post.findById(id)
        .populate("author", "firstName lastName designation reputation color email avatar coverPhoto")
        .populate("eventRef");

      if (!post) {
        // Check if this ID is linked to an Event
        post = await Post.findOne({ eventRef: id })
          .populate("author", "firstName lastName designation reputation color email avatar coverPhoto")
          .populate("eventRef");
      }

      // If still no Post document exists, but an Event with this ID exists, auto-create post
      if (!post) {
        try {
          const EventModel = mongoose.model("Event");
          const event = await EventModel.findById(id);
          if (event) {
            let authorId = event.author?.userRef;
            if (!authorId) {
              const defaultUser = await User.findOne();
              if (defaultUser) authorId = defaultUser._id;
            }

            if (authorId) {
              post = await Post.create({
                kind: "event",
                author: authorId,
                title: event.title,
                body: event.description,
                tags: event.tags || [],
                eventDate: event.eventDate || "Upcoming",
                eventRef: event._id,
                counts: {
                  upvotes: event.stats?.upvotes || 0,
                  answers: event.stats?.comments || 0,
                  views: 0,
                  downloads: 0,
                  comments: event.stats?.comments || 0,
                  responses: 0,
                  registrations: event.stats?.applied || 0,
                },
              });

              event.postRef = post._id;
              await event.save();

              post = await Post.findById(post._id)
                .populate("author", "firstName lastName designation reputation color email avatar coverPhoto")
                .populate("eventRef");
            }
          }
        } catch (autoPostErr) {
          console.error("[POST] Auto-create post for event error:", autoPostErr);
        }
      }
    }

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, post });
  } catch (error) {
    console.error("[POST] Get post by ID error:", error);
    res.status(500).json({ success: false, message: "Server error fetching post" });
  }
};

// @desc    Get answers for a post
// @route   GET /api/v1/posts/:id/answers
export const getPostAnswers = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.json({ success: true, answers: [] });
    }

    let targetPostId = id;
    let post = await Post.findById(id);
    if (!post) {
      post = await Post.findOne({ eventRef: id });
      if (post) {
        targetPostId = post._id;
      }
    }

    const answers = await Answer.find({ post: targetPostId })
      .populate("author", "firstName lastName designation reputation color email avatar coverPhoto")
      .populate(getRepliesPopulate(10))
      .sort({ createdAt: 1 });

    res.json({ success: true, answers });
  } catch (error) {
    console.error("[ANSWER] Get answers error:", error);
    res.status(500).json({ success: false, message: "Server error fetching answers" });
  }
};

// @desc    Create answer for a post
// @route   POST /api/v1/posts/:id/answers
export const createAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;

    if (!body) {
      return res.status(400).json({ success: false, message: "Answer body is required" });
    }

    let targetPostId = id;
    let post = await Post.findById(id);
    if (!post) {
      post = await Post.findOne({ eventRef: id });
      if (post) {
        targetPostId = post._id;
      } else {
        try {
          const EventModel = mongoose.model("Event");
          const event = await EventModel.findById(id);
          if (event) {
            let authorId = req.user._id;
            post = await Post.create({
              kind: "event",
              author: authorId,
              title: event.title,
              body: event.description,
              tags: event.tags || [],
              eventDate: event.eventDate || "Upcoming",
              eventRef: event._id,
              counts: {
                upvotes: event.stats?.upvotes || 0,
                answers: 0,
                comments: 0,
              },
            });
            event.postRef = post._id;
            await event.save();
            targetPostId = post._id;
          }
        } catch (evtAutoErr) {
          console.error("Error auto-creating post on answer:", evtAutoErr);
        }
      }
    }

    const answer = await Answer.create({
      post: targetPostId,
      author: req.user._id,
      body,
      upvotes: 0,
      accepted: false,
      founder: req.user.email === "pushpender@egrowth.com" || req.user.email === "amit.s@egrowth.com",
      repoEarned: 10,
    });

    let linkedEventId = post?.eventRef ? post.eventRef.toString() : null;

    if (post) {
      post.counts.answers = (post.counts.answers || 0) + 1;
      post.counts.comments = (post.counts.comments || 0) + 1;
      await post.save();

      if (post.eventRef) {
        try {
          const event = await mongoose.model("Event").findById(post.eventRef);
          if (event) {
            linkedEventId = event._id.toString();
            if (!event.stats) event.stats = { applied: 0, upvotes: 0, comments: 0 };
            event.stats.comments = (event.stats.comments || 0) + 1;
            await event.save(); // KYU: Updates event.updatedAt to current time so it sorts to the top!
          }
        } catch (evtErr) {
          console.error("Error updating associated event stats.comments:", evtErr);
        }
      }
    }

    await User.findByIdAndUpdate(req.user._id, { $inc: { reputation: 10 } });

    // Emit live socket event for comments
    try {
      const io = getIO();
      io.emit("post_comment_updated", {
        postId: targetPostId.toString(),
        eventId: linkedEventId || undefined,
        commentsCount: post?.counts?.comments || post?.counts?.answers || 1,
      });
      if (linkedEventId) {
        io.emit("event_comment_updated", {
          eventId: linkedEventId,
          postId: targetPostId.toString(),
          commentsCount: post?.counts?.comments || post?.counts?.answers || 1,
        });
      }
    } catch (sErr) {
      console.warn("[SOCKET] Comment emit failed:", sErr.message);
    }

    const populatedAnswer = await Answer.findById(answer._id)
      .populate("author", "firstName lastName designation reputation color email avatar coverPhoto")
      .populate(getRepliesPopulate(10));

    res.status(201).json({ success: true, answer: populatedAnswer });
  } catch (error) {
    console.error("[ANSWER] Create answer error:", error);
    res.status(500).json({ success: false, message: "Server error creating answer" });
  }
};

// @desc    Create reply to answer or reply
// @route   POST /api/v1/posts/answers/:answerId/replies
export const createReply = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { body } = req.body;

    if (!body) {
      return res.status(400).json({ success: false, message: "Reply body is required" });
    }

    let answerDoc = null;
    if (mongoose.Types.ObjectId.isValid(answerId)) {
      answerDoc = await Answer.findById(answerId);
    }

    if (!answerDoc && mongoose.Types.ObjectId.isValid(answerId)) {
      answerDoc = await Answer.findOne({
        $or: [
          { "replies._id": answerId },
          { "replies.replies._id": answerId },
          { "replies.replies.replies._id": answerId },
          { "replies.replies.replies.replies._id": answerId },
          { "replies.replies.replies.replies.replies._id": answerId }
        ]
      });

      if (!answerDoc) {
        const allAnswers = await Answer.find({});
        answerDoc = allAnswers.find(doc => hasReplyRecursive(doc.replies, answerId));
      }
    }

    if (!answerDoc) {
      return res.status(404).json({ success: false, message: "Parent answer/reply not found" });
    }

    const newReply = {
      author: req.user._id,
      body,
      upvotes: 0,
      replies: []
    };

    if (answerDoc._id.toString() === answerId.toString()) {
      answerDoc.replies.push(newReply);
    } else {
      const added = addReplyRecursive(answerDoc.replies, answerId, newReply);
      if (!added) {
        return res.status(404).json({ success: false, message: "Parent nested reply not found in answer tree" });
      }
    }

    await answerDoc.save();
    const post = await Post.findByIdAndUpdate(answerDoc.post, { $inc: { "counts.comments": 1 } }, { new: true });
    await User.findByIdAndUpdate(req.user._id, { $inc: { reputation: 5 } });

    let linkedEventId = null;
    if (post && post.eventRef) {
      try {
        const event = await mongoose.model("Event").findById(post.eventRef);
        if (event) {
          linkedEventId = event._id.toString();
          if (!event.stats) event.stats = { applied: 0, upvotes: 0, comments: 0 };
          event.stats.comments = (event.stats.comments || 0) + 1;
          await event.save();
        }
      } catch (e) { }
    }

    // Emit live socket event for comment reply
    try {
      const io = getIO();
      if (answerDoc.post) {
        io.emit("post_comment_updated", {
          postId: answerDoc.post.toString(),
          eventId: linkedEventId || undefined,
          commentsCount: post?.counts?.comments || 1,
        });
        if (linkedEventId) {
          io.emit("event_comment_updated", {
            eventId: linkedEventId,
            postId: answerDoc.post.toString(),
            commentsCount: post?.counts?.comments || 1,
          });
        }
      }
    } catch (sErr) { }

    const populatedAnswer = await Answer.findById(answerDoc._id)
      .populate("author", "firstName lastName designation reputation color email avatar coverPhoto")
      .populate(getRepliesPopulate(10));

    res.status(201).json({ success: true, answer: populatedAnswer });
  } catch (error) {
    console.error("[REPLY] Create reply error:", error);
    res.status(500).json({ success: false, message: "Server error creating reply" });
  }
};

// @desc    Vote / Like a post
// @route   PUT /api/v1/posts/:id/vote or /api/v1/posts/:id/like
export const votePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { voted } = req.body;
    const userId = req.user._id;

    let post = await Post.findById(id);
    if (!post) {
      post = await Post.findOne({ eventRef: id });
    }
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (!post.upvotedBy) {
      post.upvotedBy = [];
    }

    const hasVoted = post.upvotedBy.some(uid => uid.toString() === userId.toString());
    const shouldVote = voted !== undefined ? Boolean(voted) : !hasVoted;

    if (shouldVote && !hasVoted) {
      post.upvotedBy.push(userId);
      post.counts.upvotes = (post.counts.upvotes || 0) + 1;
    } else if (!shouldVote && hasVoted) {
      post.upvotedBy = post.upvotedBy.filter(uid => uid.toString() !== userId.toString());
      post.counts.upvotes = Math.max(0, (post.counts.upvotes || 0) - 1);
    }

    await post.save();

    // Sync upvote to associated Event
    let linkedEventId = post.eventRef ? post.eventRef.toString() : null;
    let eventUpvotesCount = post.counts.upvotes;

    if (post.eventRef) {
      try {
        const EventModel = mongoose.model("Event");
        const event = await EventModel.findById(post.eventRef);
        if (event) {
          linkedEventId = event._id.toString();
          if (!event.upvotedBy) {
            event.upvotedBy = [];
          }
          const hasEventUpvoted = event.upvotedBy.some(uid => uid.toString() === userId.toString());
          if (shouldVote && !hasEventUpvoted) {
            event.upvotedBy.push(userId);
            event.stats.upvotes = (event.stats.upvotes || 0) + 1;
          } else if (!shouldVote && hasEventUpvoted) {
            event.upvotedBy = event.upvotedBy.filter(uid => uid.toString() !== userId.toString());
            event.stats.upvotes = Math.max(0, (event.stats.upvotes || 0) - 1);
          }
          await event.save();
          eventUpvotesCount = event.stats.upvotes;
        }
      } catch (evtSyncErr) {
        console.error("Error syncing upvote to Event:", evtSyncErr);
      }
    }

    const isLiked = post.upvotedBy.some(uid => uid.toString() === userId.toString());

    // Emit live socket event to all clients
    try {
      const io = getIO();
      io.emit("post_like_updated", {
        postId: post._id.toString(),
        eventId: linkedEventId || undefined,
        upvotes: post.counts.upvotes,
        userId: userId.toString(),
        hasLiked: isLiked
      });

      if (linkedEventId) {
        io.emit("event_like_updated", {
          eventId: linkedEventId,
          postId: post._id.toString(),
          upvotes: eventUpvotesCount,
          userId: userId.toString(),
          hasLiked: isLiked
        });
      }
    } catch (socketErr) {
      console.warn("[SOCKET] Notice: Socket emit failed:", socketErr.message);
    }

    res.json({
      success: true,
      upvotes: post.counts.upvotes,
      upvotedBy: post.upvotedBy,
      hasLiked: isLiked
    });
  } catch (error) {
    console.error("[POST] Vote error:", error);
    res.status(500).json({ success: false, message: "Server error voting on post" });
  }
};

// @desc    Vote on an answer or nested reply
// @route   PUT /api/v1/posts/answers/:answerId/vote
export const voteAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { voted } = req.body;
    const increment = voted ? 1 : -1;
    const userId = req.user?._id;

    let answerDoc = null;
    if (mongoose.Types.ObjectId.isValid(answerId)) {
      answerDoc = await Answer.findById(answerId);
    }

    if (!answerDoc && mongoose.Types.ObjectId.isValid(answerId)) {
      const allAnswers = await Answer.find({});
      answerDoc = allAnswers.find(doc => hasReplyRecursive(doc.replies, answerId));
    }

    if (!answerDoc) {
      return res.status(404).json({ success: false, message: "Answer/reply not found" });
    }

    if (answerDoc._id.toString() === answerId.toString()) {
      answerDoc.upvotes = Math.max(0, (answerDoc.upvotes || 0) + increment);
      if (userId) {
        if (!answerDoc.upvotedBy) answerDoc.upvotedBy = [];
        const exists = answerDoc.upvotedBy.some(id => id.toString() === userId.toString());
        if (increment > 0 && !exists) {
          answerDoc.upvotedBy.push(userId);
        } else if (increment < 0 && exists) {
          answerDoc.upvotedBy = answerDoc.upvotedBy.filter(id => id.toString() !== userId.toString());
        }
      }
    } else {
      voteReplyRecursive(answerDoc.replies, answerId, increment, userId);
    }

    await answerDoc.save();

    const populatedAnswer = await Answer.findById(answerDoc._id)
      .populate("author", "firstName lastName designation reputation color email avatar coverPhoto")
      .populate(getRepliesPopulate(10));

    res.json({ success: true, answer: populatedAnswer });
  } catch (error) {
    console.error("[ANSWER] Vote error:", error);
    res.status(500).json({ success: false, message: "Server error voting on answer" });
  }
};

// @desc    Accept an answer as best answer
// @route   PUT /api/v1/posts/answers/:answerId/accept
export const acceptAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;

    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ success: false, message: "Answer not found" });
    }

    await Answer.updateMany({ post: answer.post }, { accepted: false });

    answer.accepted = true;
    answer.repoEarned = (answer.repoEarned || 0) + 25;
    await answer.save();

    await User.findByIdAndUpdate(answer.author, { $inc: { reputation: 25 } });

    const populatedAnswer = await Answer.findById(answerId)
      .populate("author", "firstName lastName designation reputation color email avatar coverPhoto")
      .populate(getRepliesPopulate(10));

    res.json({ success: true, answer: populatedAnswer });
  } catch (error) {
    console.error("[ANSWER] Accept error:", error);
    res.status(500).json({ success: false, message: "Server error accepting answer" });
  }
};



// feed api edit feature
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, pollOptions, quizOptions, quizCorrectIndex } = req.body;
    const currentUserId = (req.user?._id || req.user?.id)?.toString();

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const postAuthorId = post.author?._id
      ? post.author._id.toString()
      : post.author?.toString();

    if (postAuthorId && currentUserId && postAuthorId !== currentUserId) {
      console.warn(`[UPDATE POST] 403 Forbidden: postAuthor (${postAuthorId}) !== currentUser (${currentUserId})`);
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only edit your own posts",
      });
    }

    if (title !== undefined) {
      post.title = title;
    }
    if (content !== undefined) {
      post.body = content;
    }

    // Update Poll Options
    if (pollOptions && Array.isArray(pollOptions)) {
      post.pollOptions = pollOptions.map((opt, idx) => ({
        text: typeof opt === "string" ? opt : opt.text,
        votes: post.pollOptions?.[idx]?.votes || 0,
        votedUsers: post.pollOptions?.[idx]?.votedUsers || [],
      }));
    }

    // Update Quiz Options
    if (quizOptions && Array.isArray(quizOptions)) {
      const correctIdx = quizCorrectIndex !== undefined ? Number(quizCorrectIndex) : (post.quizCorrectIndex || 0);
      post.quizOptions = quizOptions.map((opt, idx) => ({
        text: typeof opt === "string" ? opt : opt.text,
        isCorrect: idx === correctIdx || (typeof opt === "object" && !!opt.isCorrect),
        votes: post.quizOptions?.[idx]?.votes || 0,
        votedUsers: post.quizOptions?.[idx]?.votedUsers || [],
      }));
      post.quizCorrectIndex = correctIdx;
    }

    post.isEdited = true;

    const updatedPost = await post.save();

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete post
// @route   DELETE /api/v1/posts/:id
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUserId = (req.user?._id || req.user?.id)?.toString();

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const postAuthorId = post.author?._id
      ? post.author._id.toString()
      : post.author?.toString();

    if (postAuthorId && currentUserId && postAuthorId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete your own posts",
      });
    }

    if (post.kind === "event" && post.eventRef) {
      try {
        await mongoose.model("Event").findByIdAndDelete(post.eventRef);
      } catch (evtDelErr) {
        console.error("[POST CONTROLLER] Error deleting associated event:", evtDelErr);
      }
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      postId: id,
      eventId: post.eventRef,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};