const { body } = require("express-validator");

const POST_KINDS = ["QUESTION","RESOURCE","JOB","REQUEST","EVENT","POLL","poll"];

exports.createPostRules = [
  body("kind").isIn(POST_KINDS).withMessage(`kind must be one of: ${POST_KINDS.join(", ")}`),
  body("title").trim().isLength({ min: 5, max: 300 }).withMessage("Title must be 5–300 characters"),
  body("body").trim().isLength({ min: 10, max: 10000 }).withMessage("Body must be 10–10,000 characters"),
  body("tags").optional().isArray({ max: 8 }).withMessage("Up to 8 tags allowed"),
];

exports.createAnswerRules = [
  body("body").trim().isLength({ min: 10, max: 10000 }).withMessage("Answer must be 10–10,000 characters"),
];
