import Resource from "../model/resource.model.js";
import User from "../model/user.model.js";
import { uploadFileToCloudinary } from "../services/cloudinary.service.js";

// @desc    Get all resources
// @route   GET /api/v1/resources
export const getAllResources = async (req, res) => {
  try {
    let count = await Resource.countDocuments({});
    if (count === 0) {
      // Find a user to assign as uploader
      let user = await User.findOne({});
      if (user) {
        const seedResources = [
          {
            title: "GRI 2024 Disclosure Mapping Template",
            type: "xlsx",
            domain: "esg",
            downloads: 1289,
            tag: "ESG · Reporting",
            summary: "Every GRI 2024 indicator mapped to the corresponding ESRS data point and TCFD recommendation. 43 indicators covered.",
            pages: 18,
            size: "2.1 MB",
            tags: ["esg", "reporting"],
            uploadedBy: user._id,
            externalUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            title: "ISO 9001 Internal Audit Question Bank",
            type: "pdf",
            domain: "quality",
            downloads: 942,
            tag: "Quality · Audit",
            summary: "127 audit questions across all ISO 9001:2015 clauses, with follow-up probes and typical non-conformities flagged.",
            pages: 24,
            size: "1.8 MB",
            tags: ["quality", "audit"],
            uploadedBy: user._id,
            externalUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            title: "GHG Inventory Calculator (Scope 1, 2, 3)",
            type: "xlsx",
            domain: "environment",
            downloads: 3560,
            tag: "Environment · ESG",
            summary: "A working greenhouse-gas inventory calculator with emission factors and category breakdowns for Scope 1, 2 and 3.",
            pages: 12,
            size: "3.4 MB",
            tags: ["environment", "esg"],
            uploadedBy: user._id,
            externalUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            title: "Incident Investigation: TapRooT Deck",
            type: "pptx",
            domain: "safety",
            downloads: 867,
            tag: "Safety · Health",
            summary: "A ready-to-deliver root-cause investigation training deck based on the TapRooT methodology.",
            pages: 42,
            size: "5.2 MB",
            tags: ["safety", "health"],
            uploadedBy: user._id,
            externalUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            title: "ISO 14001 Gap Assessment Workbook",
            type: "xlsx",
            domain: "environment",
            downloads: 1420,
            tag: "Environment",
            summary: "Clause-by-clause gap assessment workbook to benchmark your EMS against ISO 14001:2015.",
            pages: 16,
            size: "890 KB",
            tags: ["environment"],
            uploadedBy: user._id,
            externalUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            title: "Energy Audit Report: ISO 50001 Template",
            type: "docx",
            domain: "energy",
            downloads: 734,
            tag: "Energy",
            summary: "A structured energy-audit report template aligned to ISO 50001, with baseline, EnPIs and action plan sections.",
            pages: 20,
            size: "620 KB",
            tags: ["energy"],
            uploadedBy: user._id,
            externalUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            title: "CSRD Readiness Checklist (v2)",
            type: "pdf",
            domain: "esg",
            downloads: 2890,
            tag: "ESG · Sustainability",
            summary: "A practical readiness checklist to prepare for CSRD and ESRS reporting obligations.",
            pages: 14,
            size: "1.2 MB",
            tags: ["esg", "sustainability"],
            uploadedBy: user._id,
            externalUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            title: "Process Hazard Analysis: HAZOP Workbook",
            type: "xlsx",
            domain: "safety",
            downloads: 1106,
            tag: "Safety",
            summary: "A node-by-node HAZOP worksheet with guidewords, deviations, safeguards and action tracking.",
            pages: 22,
            size: "1.5 MB",
            tags: ["safety"],
            uploadedBy: user._id,
            externalUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            title: "ESG Materiality Assessment Playbook",
            type: "pptx",
            domain: "esg",
            downloads: 1934,
            tag: "ESG",
            summary: "A step-by-step playbook to run a double-materiality assessment with your stakeholders.",
            pages: 38,
            size: "8.1 MB",
            tags: ["esg"],
            uploadedBy: user._id,
            externalUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            title: "APQP Phase Gate Review Pack",
            type: "zip",
            domain: "quality",
            downloads: 640,
            tag: "Quality",
            summary: "A complete APQP phase-gate review pack with checklists and templates for all five phases.",
            pages: 64,
            size: "14 MB",
            tags: ["quality"],
            uploadedBy: user._id,
            externalUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            title: "Water Stewardship KPIs (AWS aligned)",
            type: "pdf",
            domain: "environment",
            downloads: 512,
            tag: "Environment · Sustainability",
            summary: "A KPI set for water stewardship aligned to the Alliance for Water Stewardship standard.",
            pages: 10,
            size: "920 KB",
            tags: ["environment", "sustainability"],
            uploadedBy: user._id,
            externalUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            title: "ISO 45001 Risk & Opportunity Register",
            type: "xlsx",
            domain: "health",
            downloads: 1780,
            tag: "Health · Safety",
            summary: "A ready-to-use OH&S risk and opportunity register with scoring and control hierarchy.",
            pages: 8,
            size: "1.3 MB",
            tags: ["health", "safety"],
            uploadedBy: user._id,
            externalUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          }
        ];
        await Resource.insertMany(seedResources);
      }
    }

    const resources = await Resource.find({})
      .populate("uploadedBy", "firstName lastName designation color reputation email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, resources });
  } catch (error) {
    console.error("[RESOURCE] Get all resources error:", error);
    res.status(500).json({ success: false, message: "Server error fetching resources." });
  }
};

// @desc    Upload new resource
// @route   POST /api/v1/resources
export const uploadResource = async (req, res) => {
  try {
    const { title, domain, fileType, summary, slug, isLink, externalUrl, source, duration } = req.body;
    let tags = req.body.tags;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required." });
    }

    // Parse tags if sent as a string (FormData)
    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
      } catch (e) {
        tags = tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
    } else if (!tags) {
      tags = domain ? [domain.toLowerCase()] : [];
    }

    let finalExternalUrl = externalUrl || "";
    let finalSize = req.body.size || "";
    let finalType = fileType || "doc";

    // Handle local file upload via Multer to Cloudinary
    if (req.file) {
      console.log(`[RESOURCE] Uploading file to Cloudinary: ${req.file.originalname}`);
      const cloudResult = await uploadFileToCloudinary(req.file.buffer);
      finalExternalUrl = cloudResult.secure_url;
      finalType = req.file.originalname.split(".").pop().toLowerCase();

      const bytes = req.file.size;
      if (bytes > 1048576) {
        finalSize = (bytes / 1048576).toFixed(1) + " MB";
      } else {
        finalSize = (bytes / 1024).toFixed(0) + " KB";
      }
    }

    const resource = await Resource.create({
      title,
      type: finalType,
      tags,
      size: finalSize,
      uploadedBy: req.user._id,
      externalUrl: finalExternalUrl,
      source: source || "",
      duration: duration || "",
      downloads: 0,
      views: 0,
      summary: summary || "",
      domain: domain || "",
      pages: req.body.pages ? parseInt(req.body.pages, 10) : 0,
      tag: req.body.tag || (tags && tags.length > 0 ? tags.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(' · ') : ""),
    });

    const populatedResource = await Resource.findById(resource._id)
      .populate("uploadedBy", "firstName lastName designation color reputation email avatar");

    res.status(201).json({ success: true, resource: populatedResource });
  } catch (error) {
    console.error("[RESOURCE] Upload resource error:", error);
    res.status(500).json({ success: false, message: "Server error uploading resource." });
  }
};

// @desc    Download / get resource URL
// @route   POST /api/v1/resources/:id/download
export const downloadResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: "Resource not found." });
    }

    // Increment downloads count
    resource.downloads = (resource.downloads || 0) + 1;
    await resource.save();

    res.status(200).json({
      success: true,
      data: {
        fileUrl: resource.externalUrl,
      },
    });
  } catch (error) {
    console.error("[RESOURCE] Download resource error:", error);
    res.status(500).json({ success: false, message: "Server error handling resource download." });
  }
};
