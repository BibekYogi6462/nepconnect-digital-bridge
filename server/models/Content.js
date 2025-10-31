import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    titleEnglish: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["video", "audio", "document", "article"],
    },
    category: {
      type: String,
      required: true,
      enum: ["कृषि", "शिक्षा", "स्वास्थ्य", "रोजगारी", "कानून", "प्रविधि"],
    },
    fileUrl: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
    duration: {
      type: String, // For video/audio content
    },
    isOfflineAvailable: {
      type: Boolean,
      default: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      default: "nepali",
    },
    level: {
      type: String,
      enum: ["सुरुआती", "मध्यम", "उन्नत"],
      default: "सुरुआती",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Content", contentSchema);
