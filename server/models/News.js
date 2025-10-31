import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleEnglish: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    descriptionEnglish: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: ["रोजगारी", "कृषि", "स्वास्थ्य", "शिक्षा", "अन्य"],
    },
    date: {
      type: String, // Nepali date format: २०८० पुष १५
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      default: "सिस्टम",
    },
  },
  {
    timestamps: true,
  }
);

// Auto-set isNew to false after 7 days
newsSchema.methods.checkIfNew = function () {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  this.isNew = this.createdAt > sevenDaysAgo;
  return this.isNew;
};

export default mongoose.model("News", newsSchema);
