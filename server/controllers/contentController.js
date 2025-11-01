import Content from "../models/Content.js";

// Create new content
export const createContent = async (req, res) => {
  try {
    const {
      title,
      titleEnglish,
      description,
      type,
      category,
      fileUrl,
      fileSize,
      duration,
      isOfflineAvailable,
      language,
      level,
    } = req.body;

    // Validate required fields
    if (!title || !titleEnglish || !description || !type || !category) {
      return res.status(400).json({
        success: false,
        message: "कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्",
      });
    }

    // Create content
    const content = await Content.create({
      title,
      titleEnglish,
      description,
      type,
      category,
      fileUrl: fileUrl || "",
      fileSize: fileSize || 0,
      duration: duration || "",
      isOfflineAvailable:
        isOfflineAvailable !== undefined ? isOfflineAvailable : true,
      language: language || "nepali",
      level: level || "सुरुआती",
    });

    res.status(201).json({
      success: true,
      message: "सामग्री सफलतापूर्वक सिर्जना गरियो",
      data: content,
    });
  } catch (error) {
    console.error("Create content error:", error);
    res.status(400).json({
      success: false,
      message: "सामग्री सिर्जना गर्न असफल",
      error: error.message,
    });
  }
};

// Get all content
export const getContent = async (req, res) => {
  try {
    const { category, type, limit = 20 } = req.query;

    let query = {};
    if (category && category !== "all") query.category = category;
    if (type && type !== "all") query.type = type;

    const content = await Content.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: content.length,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "सामग्रीहरू प्राप्त गर्न असफल",
      error: error.message,
    });
  }
};

// Get content by category
export const getContentByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const content = await Content.find({ category }).sort({ createdAt: -1 });

    res.json({
      success: true,
      category,
      count: content.length,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "सामग्रीहरू प्राप्त गर्न असफल",
      error: error.message,
    });
  }
};

// Get single content
export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "सामग्री भेटिएन",
      });
    }

    res.json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "सामग्री प्राप्त गर्न असफल",
      error: error.message,
    });
  }
};

// Track download
export const downloadContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "सामग्री भेटिएन",
      });
    }

    content.downloadCount += 1;
    await content.save();

    res.json({
      success: true,
      message: "डाउनलोड ट्र्याक गरियो",
      downloadCount: content.downloadCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "डाउनलोड ट्र्याक गर्न असफल",
      error: error.message,
    });
  }
};
