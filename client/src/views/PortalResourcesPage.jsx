'use client';

import React, { useState, useEffect } from "react";
import { ProfileCard, QuickMenu, LearnCard, InviteCard } from "../components/layout/LeftSidebar";
import ResourceHeroBanner from "../components/resources/ResourceHeroBanner";
import ResourceFilterBar from "../components/resources/ResourceFilterBar";
import ResourceCard from "../components/resources/ResourceCard";
import UploadResourceModal from "../components/resources/UploadResourceModal";
import RequestResourceModal from "../components/resources/RequestResourceModal";
import ResourceDetailModal from "../components/resources/ResourceDetailModal";
import api from "../utils/axios";

const INITIAL_RESOURCES = [
  {
    id: "1",
    title: "GRI 2024 Disclosure Mapping Template",
    type: "XLS",
    category: "ESG",
    fileSize: "2.1MB",
    tags: ["esg", "reporting"],
    uploaderName: "Rupa Mehta",
    timeAgo: "5h",
    downloads: 1289,
    meritPoints: 380,
    summary: "Comprehensive GRI disclosure mapping spreadsheet pre-formatted for 2024 compliance and sustainability reporting."
  },
  {
    id: "2",
    title: "ISO 9001 Internal Audit Question Bank",
    type: "PDF",
    category: "QUALITY",
    fileSize: "1.8MB",
    tags: ["quality", "audit"],
    uploaderName: "Tannu Sharma",
    timeAgo: "2d",
    downloads: 942,
    meritPoints: 320,
    summary: "Complete set of ISO 9001 clause-by-clause audit questions, check-sheets, and non-conformance logging forms."
  },
  {
    id: "3",
    title: "LOTO Procedure Template — Manufacturing",
    type: "DOC",
    category: "SAFETY",
    fileSize: "180KB",
    tags: ["safety"],
    uploaderName: "raj Singh",
    timeAgo: "1w",
    downloads: 2104,
    meritPoints: 100,
    summary: "Standard operating procedure for Lockout/Tagout (LOTO) energy isolation in manufacturing plants."
  },
  {
    id: "4",
    title: "GHG Inventory Calculator — Scope 1, 2, 3",
    type: "XLS",
    category: "ENVIRONMENT",
    fileSize: "3.4MB",
    tags: ["environment", "esg"],
    uploaderName: "rupali Patel",
    timeAgo: "2w",
    downloads: 3568,
    meritPoints: 555,
    summary: "Automated carbon footprint calculator using GHG Protocol emission factors for Scope 1, 2, and 3 activities."
  },
  {
    id: "5",
    title: "Incident Investigation — TapRooT Deck",
    type: "PPT",
    category: "SAFETY",
    fileSize: "5.2MB",
    tags: ["safety", "health"],
    uploaderName: "Kannu Dev",
    timeAgo: "3w",
    downloads: 867,
    meritPoints: 9102,
    summary: "Root cause analysis presentation deck featuring TapRooT & 5-Why problem-solving frameworks."
  },
  {
    id: "6",
    title: "ISO 14001 Gap Assessment Workbook",
    type: "XLS",
    category: "ENVIRONMENT",
    fileSize: "890KB",
    tags: ["environment"],
    uploaderName: "Chota Kumar",
    timeAgo: "3w",
    downloads: 1428,
    meritPoints: 200,
    summary: "Environmental management system gap analysis spreadsheet for tracking readiness towards ISO 14001 certification."
  },
  {
    id: "7",
    title: "Energy Audit Report — ISO 50001 Template",
    type: "DOC",
    category: "ENERGY",
    fileSize: "620KB",
    tags: ["energy"],
    uploaderName: "Munna Sharma",
    timeAgo: "1mo",
    downloads: 734,
    meritPoints: 140,
    summary: "Professional energy audit report template with section headers, baseline consumption tables, and ECM proposals."
  },
  {
    id: "8",
    title: "CSRD Readiness Checklist (v2)",
    type: "PDF",
    category: "ESG",
    fileSize: "1.2MB",
    tags: ["esg", "sustainability"],
    uploaderName: "Pappu Yadav",
    timeAgo: "1mo",
    downloads: 2898,
    meritPoints: 220,
    summary: "Corporate Sustainability Reporting Directive readiness checklist covering ESRS double materiality requirements."
  },
  {
    id: "9",
    title: "Process Hazard Analysis — HAZOP Workbook",
    type: "XLS",
    category: "SAFETY",
    fileSize: "1.5MB",
    tags: ["safety"],
    uploaderName: "Mukul",
    timeAgo: "1mo",
    downloads: 1106,
    meritPoints: 270,
    summary: "HAZOP worksheet for industrial plant risk assessment, cause/consequence evaluation, and safeguard tracking."
  },
  {
    id: "10",
    title: "ESG Materiality Assessment Playbook",
    type: "PPT",
    category: "ESG",
    fileSize: "8.1MB",
    tags: ["esg"],
    uploaderName: "Patil Malhotra",
    timeAgo: "2mo",
    downloads: 1934,
    meritPoints: 1270,
    summary: "Step-by-step stakeholder engagement slide deck for conducting double materiality matrix assessments."
  }
];

export default function PortalResourcesPage() {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeFileType, setActiveFileType] = useState("ALL");
  const [activeSort, setActiveSort] = useState("TRENDING");

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await api.get("/resources");
        if (response.data && response.data.resources && response.data.resources.length > 0) {
          const fetched = response.data.resources.map((item) => ({
            id: item._id,
            title: item.title,
            type: (item.type || "PDF").toUpperCase(),
            category: (item.domain || "QUALITY").toUpperCase(),
            domain: item.domain || "Quality",
            fileSize: item.size || "1.5MB",
            tags: item.tags || [],
            uploadedBy: item.uploadedBy,
            uploaderName: item.uploadedBy ? `${item.uploadedBy.firstName || ""} ${item.uploadedBy.lastName || ""}`.trim() || "Community Member" : "Community Member",
            author: item.uploadedBy ? {
              name: `${item.uploadedBy.firstName || ""} ${item.uploadedBy.lastName || ""}`.trim() || "Community Member",
              avatar: item.uploadedBy.avatar || null,
              color: item.uploadedBy.color
            } : null,
            timeAgo: "Recently",
            downloads: item.downloads || 0,
            meritPoints: item.downloads ? item.downloads * 2 + 50 : 100,
            summary: item.summary || "",
            externalUrl: item.externalUrl || ""
          }));
          setResources(fetched);
        }
      } catch (err) {
        console.warn("[RESOURCES] Backend fetch fallback to initial static list:", err?.message || err);
      }
    };
    fetchResources();
  }, []);

  const handleUploadSuccess = (newRes) => {
    if (!newRes) return;
    const formattedRes = {
      id: newRes._id || newRes.id,
      title: newRes.title,
      type: (newRes.type || "PDF").toUpperCase(),
      category: (newRes.domain || "QUALITY").toUpperCase(),
      domain: newRes.domain || "Quality",
      fileSize: newRes.size || "1.5MB",
      tags: newRes.tags || [],
      uploadedBy: newRes.uploadedBy,
      uploaderName: newRes.uploadedBy ? `${newRes.uploadedBy.firstName || ""} ${newRes.uploadedBy.lastName || ""}`.trim() || "Community Member" : "Community Member",
      author: newRes.uploadedBy ? {
        name: `${newRes.uploadedBy.firstName || ""} ${newRes.uploadedBy.lastName || ""}`.trim() || "Community Member",
        avatar: newRes.uploadedBy.avatar || null,
        color: newRes.uploadedBy.color
      } : null,
      timeAgo: "Just now",
      downloads: newRes.downloads || 0,
      meritPoints: 100,
      summary: newRes.summary || "",
      externalUrl: newRes.externalUrl || ""
    };
    setResources((prev) => [formattedRes, ...prev]);
  };

  const handleDownloadTrigger = async (res) => {
    // Increment download count locally
    setResources((prev) =>
      prev.map((item) =>
        item.id === res.id ? { ...item, downloads: item.downloads + 1 } : item
      )
    );
    // Also hit backend download endpoint if ID is mongo _id format
    if (res.id && res.id.length > 10) {
      try {
        await api.post(`/resources/${res.id}/download`);
      } catch (err) {
        console.warn("[DOWNLOAD] Backend counter update failed:", err?.message || err);
      }
    }
  };

  // Filter & Sort Logic
  const filteredResources = resources
    .filter((res) => {
      if (activeCategory !== "ALL" && activeCategory !== "FOLLOWING") {
        if (res.category?.toUpperCase() !== activeCategory.toUpperCase()) return false;
      }
      if (activeFileType !== "ALL") {
        if (activeFileType === "DOC" && !["DOC", "DOCX"].includes(res.type.toUpperCase())) return false;
        if (activeFileType === "XLS" && !["XLS", "XLSX"].includes(res.type.toUpperCase())) return false;
        if (activeFileType === "PPT" && !["PPT", "PPTX"].includes(res.type.toUpperCase())) return false;
        if (["PDF", "ZIP", "VIDEO", "DRIVE"].includes(activeFileType)) {
          if (res.type.toUpperCase() !== activeFileType) return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (activeSort === "MOST_DOWNLOADED") return b.downloads - a.downloads;
      if (activeSort === "MOST_RECENT") return b.id - a.id;
      return b.meritPoints - a.meritPoints; // TRENDING
    });

  return (
    <div className="py-3 sm:py-5 lg:py-6 w-full flex-1 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start w-full">
        {/* Left Column: Left Sidebar (Visible on desktop / lg screens) */}
        <div className="hidden lg:block lg:w-[250px] xl:w-[270px] 2xl:w-[280px] shrink-0 space-y-3 lg:space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto scrollbar-hide">
          <ProfileCard />
          <QuickMenu />
          <LearnCard />
          <InviteCard />
        </div>

        {/* Main Column: Resource Library Content (Extends full width to right edge) */}
        <div className="flex-1 w-full min-w-0">
          {/* Top Hero Banner */}
          <ResourceHeroBanner
            onUploadClick={() => setIsUploadOpen(true)}
            onRequestClick={() => setIsRequestOpen(true)}
          />

          {/* Filter Bar */}
          <ResourceFilterBar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activeFileType={activeFileType}
            onFileTypeChange={setActiveFileType}
            activeSort={activeSort}
            onSortChange={setActiveSort}
          />

          {/* Resource Grid */}
          {filteredResources.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-6">
              <h3 className="font-bold text-slate-800 text-base">No resources found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try selecting a different domain or file type filter.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("ALL");
                  setActiveFileType("ALL");
                }}
                className="mt-4 px-4 py-2 bg-[#0b4b66] text-white text-xs font-bold rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredResources.map((res) => (
                <ResourceCard
                  key={res.id}
                  resource={res}
                  onSelect={(item) => setSelectedResource(item)}
                  onDownload={(item) => handleDownloadTrigger(item)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <UploadResourceModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <RequestResourceModal
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
      />
      {selectedResource && (
        <ResourceDetailModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
          onDownload={handleDownloadTrigger}
        />
      )}
    </div>
  );
}