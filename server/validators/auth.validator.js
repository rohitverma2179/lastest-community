import { z } from "zod";

export const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter (a-z)")
  .regex(/[0-9]/, "Password must contain at least one number (0-9)")
  .regex(/[\!@#\$%\^&\*\(\)_\+\-=\[\]\{\};':"\\|,.<>\/?]/, "Password must contain at least one special character (!@#$%^&*)");

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName:  z.string().min(1, "Last name is required"),
  email:     z.string().email("Invalid email address"),
  password:  passwordSchema,
  phone:     z.string().optional(),
  country:     z.string().min(1, "Country is required"),
  city:        z.string().min(1, "City is required"),
  company:     z.string().min(1, "Company is required"),
  designation: z.string().min(1, "Designation is required"),
  experience:  z.string().min(1, "Experience is required"),
  domains:     z.array(z.string()).optional(),
  interests:   z.array(z.string()).optional(),
});

export const loginSchema = z.object({
  email:    z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const verifyOTPSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp:   z.string().length(6, "OTP must be 6 digits"),
});

export const resendOTPSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName:  z.string().min(1, "Last name is required").optional(),
  email:     z.string().email("Invalid email address").optional(),
  phone:     z.string().optional(),
  company:     z.string().optional(),
  designation: z.string().optional(),
  country:     z.string().optional(),
  city:        z.string().optional(),
});

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.errors[0]?.message || "Validation Error",
      errors: error.errors,
    });
  }
};
