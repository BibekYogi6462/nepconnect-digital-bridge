import Content from "../models/Content.js";

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
