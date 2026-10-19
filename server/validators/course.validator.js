const { body } = require("express-validator");

const DOMAINS = ["QUALITY","SAFETY","HEALTH","ENVIRONMENT","ENERGY","ESG"];
const TRACKS  = ["awareness","auditor","implementer","exam"];

exports.createCourseRules = [
  body("slug").trim().notEmpty().withMessage("Slug required"),
  body("title").trim().isLength({ min: 5, max: 200 }).withMessage("Title must be 5–200 characters"),
  body("domain").isIn(DOMAINS).withMessage(`Domain must be one of: ${DOMAINS.join(", ")}`),
  body("track").optional().isIn(TRACKS).withMessage(`Track must be one of: ${TRACKS.join(", ")}`),
  body("level").trim().notEmpty().withMessage("Level required"),
  body("durationHrs").isInt({ min: 1, max: 500 }).withMessage("Duration must be 1–500 hours"),
  body("priceInr").isInt({ min: 0 }).withMessage("Price must be >= 0"),
  body("summary").trim().isLength({ min: 20, max: 1000 }).withMessage("Summary must be 20–1000 characters"),
  body("curriculum").isArray({ min: 1 }).withMessage("Curriculum must be a non-empty array"),
];

exports.updateCourseRules = [
  body("title").optional().trim().isLength({ min: 5, max: 200 }),
  body("priceInr").optional().isInt({ min: 0 }),
  body("published").optional().isBoolean(),
];
