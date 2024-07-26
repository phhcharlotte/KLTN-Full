import mongoose from "mongoose";

const ThesisSchema = new mongoose.Schema(
  {
    semester: String,
    year: String,
    thesisName: String,
    instructorCode: String,
    instructorName: String,
    instructorPhone: String,
    studentQuantity: String,
    require: String,
    members: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Thesis = mongoose.model("Thesis", ThesisSchema);
export default Thesis;
