const { body } = require("express-validator");

exports.meritOpRules = [
  body("op").isIn(["earn","spend","buy"]).withMessage("op must be earn | spend | buy"),
  body("amount").isInt({ min: 1 }).withMessage("amount must be a positive integer"),
  body("label").trim().isLength({ min: 2, max: 200 }).withMessage("label must be 2–200 characters"),
];
