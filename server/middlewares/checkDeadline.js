import Deadline from "../models/Deadline.js";

export const checkTeacherDeadline = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const activeDeadline = await Deadline.find({
      type: "teacherSubmitTopics",
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      isActive: true,
    });

    if (activeDeadline.length === 0) {
      return res.status(404).json("Thời hạn đăng ký đã hết hoặc chưa bắt đầu");
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const checkStudentDeadline = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const activeDeadline = await Deadline.find({
      type: "studentSubmitTopics",
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      isActive: true,
    });

    if (activeDeadline.length === 0) {
      return res.status(404).json("Thời hạn đăng ký đã hết hoặc chưa bắt đầu");
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
