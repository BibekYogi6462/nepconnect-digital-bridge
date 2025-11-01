import News from "../models/News.js";

// Get all news
export const getNews = async (req, res) => {
  try {
    const { category, limit = 10 } = req.query;

    let query = { isActive: true };
    if (category && category !== "all") {
      query.category = category;
    }

    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "समाचारहरू प्राप्त गर्न असफल",
      error: error.message,
    });
  }
};

// Get news by category
export const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const news = await News.find({
      category,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      category,
      count: news.length,
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "समाचारहरू प्राप्त गर्न असफल",
      error: error.message,
    });
  }
};

// Get single news
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "समाचार भेटिएन",
      });
    }

    // Increment views
    news.views += 1;
    await news.save();

    res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "समाचार प्राप्त गर्न असफल",
      error: error.message,
    });
  }
};

// Create new news
export const createNews = async (req, res) => {
  try {
    const {
      title,
      titleEnglish,
      description,
      descriptionEnglish,
      category,
      date,
      createdBy,
    } = req.body;

    // Validate required fields
    if (!title || !titleEnglish || !description || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्",
      });
    }

    const news = await News.create({
      title,
      titleEnglish,
      description,
      descriptionEnglish: descriptionEnglish || "",
      category,
      date,
      createdBy: createdBy || "सिस्टम",
    });

    res.status(201).json({
      success: true,
      message: "समाचार सफलतापूर्वक थपियो",
      data: news,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "समाचार सिर्जना गर्न असफल",
      error: error.message,
    });
  }
};

// Update news
export const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "समाचार भेटिएन",
      });
    }

    res.json({
      success: true,
      message: "समाचार सफलतापूर्वक अद्यावधिक गरियो",
      data: news,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "समाचार अद्यावधिक गर्न असफल",
      error: error.message,
    });
  }
};

// Delete news
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "समाचार भेटिएन",
      });
    }

    res.json({
      success: true,
      message: "समाचार सफलतापूर्वक मेटियो",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "समाचार मेट्न असफल",
      error: error.message,
    });
  }
};
