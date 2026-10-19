import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    password: { type: String, required: true },

    // Auth and Verification
    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    pendingEmail: { type: String, default: null },
    pendingPhone: { type: String, default: null },

    // Additional User Info
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    coverPhoto: { type: String, default: "" },
    birthday: { type: String, default: "" },
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    company: { type: String, default: "" },
    designation: { type: String, default: "" },
    experience: { type: String, default: "" },
    domains: { type: [String], default: [] },
    interests: { type: [String], default: [] },

    // Community Stats
    reputation: { type: Number, default: 100 },
    streak: { type: Number, default: 7 },
    color: {
      type: String,
      default: () => {
        const colors = ['#1e8a8a', '#c2700a', '#4a8a5e', '#d15667', '#176e6e', '#3d5a6d', '#8b4a1e', '#2d5a3d', '#125656', '#3eaaaa', '#b84557', '#344054', '#475467', '#5b6b82', '#7a5230'];
        return colors[Math.floor(Math.random() * colors.length)];
      }
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Virtual for full name
userSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for initials
userSchema.virtual("initials").get(function () {
  const first = this.firstName ? this.firstName[0] : "";
  const last = this.lastName ? this.lastName[0] : "";
  return `${first}${last}`.toUpperCase();
});

// Virtual for designation / title mapping
userSchema.virtual("title").get(function () {
  return this.designation || "Member";
});

const User = mongoose.model("User", userSchema);
export default User;
