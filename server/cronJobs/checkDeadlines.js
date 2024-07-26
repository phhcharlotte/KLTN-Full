// import cron from "node-cron";
// import Deadline from "../models/Deadline.js";
// import Notification from "../models/Notification.js";
// import User from "../models/User.js";

// cron.schedule("*/5 * * * *", async () => {
//   // Chạy mỗi 5 phút
//   try {
//     const currentDate = new Date();
//     const expiredDeadlines = await Deadline.find({
//       endDate: { $lte: currentDate },
//       isActive: true,
//     });

//     for (const deadline of expiredDeadlines) {
//       deadline.isActive = false;
//       await deadline.save();

//       if (deadline.type === "teacherSubmitTopics") {
//         const students = await User.find({ role: "student" });

//         for (const student of students) {
//           const newNotification = new Notification({
//             userId: student._id,
//             message: `The list of thesis topics is now available for registration.`,
//           });
//           await newNotification.save();
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error checking deadlines every 5 minutes:", error);
//   }
// });
