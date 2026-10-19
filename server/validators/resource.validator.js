const { body } = require("express-validator");

const DOMAINS    = ["QUALITY","SAFETY","HEALTH","ENVIRONMENT","ENERGY","ESG"];
const FILE_TYPES = ["pdf","xlsx","pptx","docx","zip","link"];

exports.createResourceRules = [
  body("slug").trim().notEmpty().withMessage("Slug required"),
  body("title").trim().isLength({ min: 5, max: 200 }).withMessage("Title must be 5–200 characters"),
  body("domain").isIn(DOMAINS).withMessage("Invalid domain"),
  body("fileType").isIn(FILE_TYPES).withMessage(`fileType must be one of: ${FILE_TYPES.join(", ")}`),
  body("pages").optional().isInt({ min: 1, max: 2000 }).withMessage("Pages must be 1–2000"),
  body("summary").trim().isLength({ min: 10, max: 500 }).withMessage("Summary must be 10–500 characters"),
  body("externalUrl").optional().isURL().withMessage("externalUrl must be a valid URL"),
];
