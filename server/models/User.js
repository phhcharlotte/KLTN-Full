import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 2,
      max: 10,
    },
    role: String,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    code: String,
    dob: String,
    classCode: String, // vd: TT32H6, TI32G1,...
    major: String, // ngành học. vd: cntt, trí tuệ nhân tạo...
    phoneNumber: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
