import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["applied","in_review","rejected","accepted"],
    default: "applied"
  }
}, { timestamps: true });

// 🔥 Prevent duplicate applications
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

// ⚡ Performance indexes
applicationSchema.index({ applicant: 1 });
applicationSchema.index({ job: 1 });

export default mongoose.model("Application", applicationSchema);