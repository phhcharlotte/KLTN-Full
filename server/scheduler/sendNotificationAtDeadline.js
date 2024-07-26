import schedule from "node-schedule";
import Deadline from "../models/Deadline.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const scheduleNotification = async (deadline, userType, message) => {
  const job = schedule.scheduleJob(new Date(deadline.endDate), async () => {
    try {
      if (userType === "students") {
        const students = await User.find({ role: "student" });

        for (const student of students) {
          const newNotification = new Notification({
            userId: student._id,

            message: message, //`The list of thesis topics is now available for registration.`,
          });
          await newNotification.save();
        }
      }

      deadline.isActive = false;
      await deadline.save();
    } catch (error) {
      console.error("Error during scheduled notification:", error);
    }
  });

  return job;
};
