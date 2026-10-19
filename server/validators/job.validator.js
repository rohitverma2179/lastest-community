const { body } = require("express-validator");
const DOMAINS  = ["QUALITY","SAFETY","HEALTH","ENVIRONMENT","ENERGY","ESG"];
const JOB_TYPES = ["Full-time","Part-time","Freelance","Contract","Project"];

exports.createJobRules = [
  body("title").trim().isLength({ min: 5, max: 200 }).withMessage("Title must be 5–200 characters"),
  body("company").trim().isLength({ min: 2, max: 100 }).withMessage("Company must be 2–100 characters"),
  body("location").trim().notEmpty().withMessage("Location required"),
  body("domain").isIn(DOMAINS).withMessage("Invalid domain"),
  body("jobType").optional().isIn(JOB_TYPES).withMessage(`jobType must be one of: ${JOB_TYPES.join(", ")}`),
  body("remote").optional().isBoolean(),
  body("salary").optional().trim(),
];
