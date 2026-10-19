'use client';

import React, { useState, useEffect } from "react";
import WishlistHeader from "../components/wishlist/WishlistHeader";
import WishlistActionBar from "../components/wishlist/WishlistActionBar";
import WishlistItem from "../components/wishlist/WishlistItem";
import DailyMission from "../components/layout/RightSidebar/DailyMission";
import UpcomingEvent from "../components/layout/RightSidebar/UpcomingEvent";
import TopContributors from "../components/layout/RightSidebar/TopContributors";
import { Check, Sparkles } from "lucide-react";

/**
 * WishlistPage Component
 * 2-Column Responsive Layout:
 * - Left main workspace with Header, Action Bar, and Wishlist Items matching screenshot.
 * - Right sidebar with DailyMission, UpcomingEvent, and TopContributors.
 */
export default function WishlistPage() {
  const [items, setItems] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("egrowth_wishlist");
        return stored ? JSON.parse(stored) : [];
      }
      return [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  useEffect(() => {
    const loadWishlist = () => {
      try {
        const stored = localStorage.getItem("egrowth_wishlist");
        setItems(stored ? JSON.parse(stored) : []);
      } catch (e) {
        console.error("Failed to load wishlist", e);
      }
    };

    window.addEventListener("wishlist_updated", loadWishlist);
    window.addEventListener("storage", loadWishlist);
    return () => {
      window.removeEventListener("wishlist_updated", loadWishlist);
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  // Selection states
  const checkedItemIds = items.filter((i) => i.isChecked).map((i) => i.id);
  const isAllChecked = items.length > 0 && checkedItemIds.length === items.length;

  // Filtered and Sorted items computation
  const filteredItems = React.useMemo(() => {
    // Attach index so every item has a distinct chronological rank
    let list = items.map((item, idx) => ({ ...item, _idx: idx }));

    // 1. Category Filter (Multiple checkboxes supported)
    if (selectedCategories.length > 0 && !selectedCategories.includes("all")) {
      list = list.filter((item) =>
        selectedCategories.includes(item.category) ||
        selectedCategories.includes(item.type?.toLowerCase())
      );
    }

    const parseTimestamp = (item) => {
      if (item.savedAt) {
        const t = new Date(item.savedAt).getTime();
        if (!isNaN(t) && t > 0) return t;
      }
      if (item.createdAt) {
        const t = new Date(item.createdAt).getTime();
        if (!isNaN(t) && t > 0) return t;
      }
      if (item.originalPost?.createdAt) {
        const t = new Date(item.originalPost.createdAt).getTime();
        if (!isNaN(t) && t > 0) return t;
      }
      if (typeof item.id === "number" && item.id > 10000000) {
        return item.id;
      }
      return item._idx;
    };

    // 2. Sort by Latest vs Oldest
    if (sortBy === "oldest") {
      // Oldest first: lowest timestamp / earliest added index first
      list.sort((a, b) => {
        const tA = parseTimestamp(a);
        const tB = parseTimestamp(b);
        if (tA !== tB) return tA - tB;
        return a._idx - b._idx;
      });
    } else {
      // Latest first: highest timestamp / most recently added index first
      list.sort((a, b) => {
        const tA = parseTimestamp(a);
        const tB = parseTimestamp(b);
        if (tA !== tB) return tB - tA;
        return b._idx - a._idx;
      });
    }

    return list;
  }, [items, selectedCategories, sortBy]);

  const handleToggleCategory = (catId) => {
    if (catId === "all") {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories((prev) => {
      const isAlready = prev.includes(catId);
      if (isAlready) {
        return prev.filter((c) => c !== catId);
      } else {
        return [...prev.filter((c) => c !== "all"), catId];
      }
    });
  };

  const handleSelectAllCategories = () => {
    setSelectedCategories([]);
  };

  const categoryLabelsMap = {
    discussions: "Questions",
    files: "Resources",
    jobs: "Jobs",
    meetings: "Events",
    polls: "Polls",
    quizzes: "Quizzes",
  };

  const getSubHeadingLabel = () => {
    const sortLabel = sortBy === "oldest" ? "Oldest" : "Latest";
    if (selectedCategories.length === 0 || selectedCategories.includes("all")) {
      return sortLabel;
    }
    if (selectedCategories.length === 1) {
      const name = categoryLabelsMap[selectedCategories[0]] || selectedCategories[0];
      return `${name} (${sortLabel})`;
    }
    return `${selectedCategories.length} Categories (${sortLabel})`;
  };

  // Handlers
  const handleToggleSelectAll = () => {
    const nextState = !isAllChecked;
    setItems((prev) => {
      const updated = prev.map((item) => ({ ...item, isChecked: nextState }));
      localStorage.setItem("egrowth_wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleItemCheck = (id) => {
    setItems((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item));
      localStorage.setItem("egrowth_wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteSelected = () => {
    if (checkedItemIds.length === 0) return;
    const count = checkedItemIds.length;
    setItems((prev) => {
      const updated = prev.filter((item) => !item.isChecked);
      localStorage.setItem("egrowth_wishlist", JSON.stringify(updated));
      window.dispatchEvent(new Event("wishlist_updated"));
      return updated;
    });
    showToast(`Removed ${count} item${count > 1 ? "s" : ""} from your Wishlist.`);
  };

  const handleDeleteSingleItem = (id) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("egrowth_wishlist", JSON.stringify(updated));
      window.dispatchEvent(new Event("wishlist_updated"));
      return updated;
    });
    showToast("Item removed from your Wishlist.");
  };

  const handleActionClick = (item) => {
    if (item.action === "join") {
      showToast(`Joining session for ${item.title}...`);
    } else if (item.action === "coin") {
      showToast(`Redeemed ${item.coins} coins for ${item.title}!`);
    }
  };

  const isCustomFiltered = selectedCategories.length > 0 || sortBy !== "latest";

  return (
    <div className="py-3 bg-[#F4F3F0] sm:py-5 lg:py-6 w-full flex-1 min-h-screen">
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-3 flex items-center gap-2.5 border border-slate-800">
          <Check className="w-4 h-4 text-sky-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2-Column Responsive Layout: Left Main Workspace, Right Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT COLUMN: Header, Action Bar & Wishlist Item List */}
        <div className="flex-1 space-y-5 min-w-0">
          {/* Header */}
          <WishlistHeader />

          {/* Action Bar (Select All, Bulk Delete, Filters Dropdown) */}
          <WishlistActionBar
            isAllChecked={isAllChecked}
            selectedCount={checkedItemIds.length}
            onToggleSelectAll={handleToggleSelectAll}
            onDeleteSelected={handleDeleteSelected}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
            onSelectAllCategories={handleSelectAllCategories}
            sortBy={sortBy}
            onSelectSortBy={setSortBy}
          />

          {/* Category Sub-heading */}
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide">
              {getSubHeadingLabel()}
            </h2>
            {isCustomFiltered && (
              <span className="text-[11px] text-slate-400 font-medium">
                Showing {filteredItems.length} of {items.length}
              </span>
            )}
          </div>

          {/* Wishlist File & Discussion Item List */}
          <div className="space-y-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <WishlistItem
                  key={item.id}
                  item={item}
                  onToggleCheck={handleToggleItemCheck}
                  onActionClick={handleActionClick}
                  onShowToast={showToast}
                  onDelete={handleDeleteSingleItem}
                />
              ))
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center space-y-3 shadow-2xs">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0096ff] flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No items found</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                  {isCustomFiltered
                    ? "There are no saved items matching your selected categories and sort filters."
                    : "Your wishlist is empty. Explore discussions and resources to save items for later!"}
                </p>
                {isCustomFiltered && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSortBy("latest");
                    }}
                    className="px-4 py-2 bg-[#0096ff] text-white text-xs font-bold rounded-full hover:bg-[#0082de] transition cursor-pointer"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Cards (DailyMission, UpcomingEvent, TopContributors) */}
        <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0 space-y-3 lg:space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto scrollbar-hide">
          <DailyMission />
          <UpcomingEvent />
          <TopContributors />
        </div>
      </div>
    </div>
  );
}