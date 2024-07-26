import mongoose from "mongoose";

const DeadlineSchema = new mongoose.Schema(
  {
    type: {
      type: String, //vd: "teacherSubmitTopics", "studentSubmitTopic"
      required: true,
    },
    description: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Deadline = mongoose.model("Deadline", DeadlineSchema);
export default Deadline;
