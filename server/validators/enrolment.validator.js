const { body } = require("express-validator");

exports.enrolRules = [
  body("courseId").trim().notEmpty().withMessage("courseId required"),
  body("paymentMethod").optional().isIn(["razorpay","stripe","merit","free"]).withMessage("Invalid paymentMethod"),
  body("razorpayOrderId").optional().trim(),
];

exports.updateProgressRules = [
  body("progress").isInt({ min: 0, max: 100 }).withMessage("progress must be 0–100"),
];
