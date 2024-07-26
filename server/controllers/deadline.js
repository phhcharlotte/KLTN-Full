import Deadline from "../models/Deadline.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { scheduleNotification } from "../scheduler/sendNotificationAtDeadline.js";

export const createDeadline = async (req, res) => {
  try {
    const { type, description, startDate, endDate } = req.body;

    const newDeadline = new Deadline({
      type,
      description,
      startDate,
      endDate,
    });

    await newDeadline.save();

    // Create notification for teacher when deadline is created
    if (type === "teacherSubmitTopics") {
      scheduleNotification(
        newDeadline,
        "students",
        "Đã có danh sách đề tài, sinh viên xem danh sách và lựa chọn đề tài phù hợp trước khi đến hạn đăng ký"
      );
      const teachers = await User.find({ role: "teacher" });

      teachers.forEach(async (teacher) => {
        const newNotification = new Notification({
          userId: teacher._id,

          message: `Bạn có một deadline mới: ${description}. Thời hạn cuối: ${endDate}`,
        });
        await newNotification.save();
      });
    }
    if (type === "studentSubmitTopics") {
      const students = await User.find({ role: "student" });

      students.forEach(async (student) => {
        const newNotification = new Notification({
          userId: student._id,

          message: `Bạn có một deadline mới: ${description}. Thời hạn cuối: ${endDate}`,
        });
        await newNotification.save();
      });
    }

    res.status(201).json(newDeadline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDeadline = async (req, res) => {
  try {
    const { role } = req.user;
    const currentDate = new Date(); // Định nghĩa currentDate để lấy thời gian hiện tại

    if (role === "teacher") {
      const deadline = await Deadline.findOne({
        type: "teacherSubmitTopics",
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
        isActive: true,
      });
      if (!deadline) {
        return res.json({ message: "Active deadline not found" });
      }

      res.status(200).json(deadline);
    }
    if (role === "student") {
      const deadline = await Deadline.findOne({
        type: "studentSubmitTopics",
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
        isActive: true,
      });
      if (!deadline) {
        return res.status(404).json({ message: "Active deadline not found" });
      }

      res.status(200).json(deadline);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getTeacherActiveDeadline = async (req, res) => {
  try {
    const currentDate = new Date(); // Định nghĩa currentDate để lấy thời gian hiện tại

    const deadline = await Deadline.findOne({
      type: "teacherSubmitTopics",
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      isActive: true,
    });

    if (!deadline) {
      return res.status(404).json({ message: "Active deadline not found" });
    }

    res.status(200).json(deadline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentActiveDeadline = async (req, res) => {
  try {
    const currentDate = new Date(); // Định nghĩa currentDate để lấy thời gian hiện tại

    const deadline = await Deadline.findOne({
      type: "studentSubmitTopics",
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      isActive: true,
    });

    if (!deadline) {
      return res.status(404).json({ message: "Active deadline not found" });
    }

    res.status(200).json(deadline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDeadline = async (req, res) => {
  try {
    const { id } = req.params;
    const deadline = await Deadline.findByIdAndDelete(id);

    if (!deadline) {
      return res.status(404).json({ message: "Deadline not found" });
    }

    res.status(200).json({ message: "Deadline deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
