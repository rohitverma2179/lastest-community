export const mapPostToWishlistItem = (post, postId, type) => {
  if (!post) {
    return {
      id: postId,
      type: "discussion",
      category: "discussions",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
      title: "Saved Post",
      description: "",
      isChecked: false,
    };
  }

  const id = post.id || post._id || postId || `post-${Date.now()}`;
  let itemType = "discussion";
  let category = "discussions";
  let title = post.title || "Untitled Post";
  let subtitle = "";
  let description = post.content || post.body || "";
  let avatar = post.author?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";
  let action = null;
  let actionText = "";
  let coins = 0;

  const typeUpper = (post.type || type)?.toUpperCase();

  if (typeUpper === "RESOURCE") {
    category = "files";
    if (post.attachment) {
      itemType = post.attachment.type?.toUpperCase() === "EXCEL" ? "excel" : "discussion";
      title = post.attachment.name || post.title || "Resource File";
      subtitle = `Size: ${post.attachment.size || "Unknown"}`;
      if (post.attachment.actionPoints) {
        action = "coin";
        coins = post.attachment.actionPoints;
      }
    } else {
      itemType = "discussion";
      title = post.title;
      description = post.content || post.body || "";
    }
  } else if (typeUpper === "QUESTION") {
    category = "discussions";
    itemType = "discussion";
  } else if (typeUpper === "POLL") {
    category = "polls";
    itemType = "discussion";
  } else if (typeUpper === "QUIZ") {
    category = "quizzes";
    itemType = "discussion";
  } else if (typeUpper === "EVENT") {
    category = "meetings";
    itemType = "teams";
    title = post.title;
    subtitle = post.event?.subtitle || "Anyone Can Join";
    action = "join";
    actionText = post.event?.actionLabel || "Join Now";
  } else if (typeUpper === "JOB") {
    category = "jobs";
    itemType = "discussion";
    title = post.title;
    description = post.content || post.body || "";
    action = "disabled";
    actionText = "Applied";
  }

  return {
    id,
    type: itemType,
    category,
    avatar,
    title,
    subtitle,
    description,
    action,
    actionText,
    coins,
    isChecked: false,
    savedAt: post.savedAt || post.createdAt || new Date().toISOString(),
    originalPost: post
  };
};
