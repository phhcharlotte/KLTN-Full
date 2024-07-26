import Notification from "../models/Notification.js";

export const getNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNotificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    notification.isRead = true;
    await notification.save();
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAllNotification = async (req, res) => {
  try {
    const result = await Notification.deleteMany({
      isRead: true,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to delete notifications", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
