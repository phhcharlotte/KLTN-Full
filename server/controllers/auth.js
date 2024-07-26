import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Đăng ký
export const register = async (req, res) => {
  try {
    const { username, password, role, firstName, lastName, code, dob, classCode, major, phoneNumber } = req.body;

    if (!username || !password || !role || !code) {
      return res.status(400).json({ msg: "Please provide all required fields." });
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ msg: "Username is already taken." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      firstName,
      lastName,
      code,
      dob,
      classCode,
      major,
      phoneNumber,
    });

    await newUser.save();

    res.status(201).json({ msg: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: "Please provide both username and password." });
    }

    const user = await User.findOne({ username: username });
    if (!user) return res.status(400).json({ msg: "Tài khoản không tồn tại" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Mật khẩu không chính xác" });

    const payload = {
      _id: user._id,
      username: user.username,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      code: user.code,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10h" });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
