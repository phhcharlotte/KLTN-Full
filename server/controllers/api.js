import Deadline from "../models/Deadline.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import Thesis from "../models/Thesis.js";
import StudentStatus from "../models/StudentStatus.js";

export const getDataByThesis = async (req, res) => {
  try {
    // console.log("goi vao api");
    const data = [];
    const theses = await Thesis.find().lean();

    // Tạo promises để xử lý song song
    const promises = theses.map(async (thesis) => {
      // const teacherCode = thesis.teacherCode;
      // const teacher = await User.findOne({ code: teacherCode }).lean();

      // // Kiểm tra nếu teacher tồn tại
      // if (!teacher) {
      //   throw new Error(`Teacher with code ${teacherCode} not found`);
      // }

      // Xử lý song song cho các members
      const studentPromises = thesis.members.map(async (memberCode) => {
        const student = await User.findOne({ code: memberCode }).lean();
        const studentStatus = await StudentStatus.findOne({ studentCode: memberCode }).lean();

        if (!student) {
          throw new Error(`Student with code ${memberCode} not found`);
        }
        // if (!studentStatus) {
        //   throw new Error(`StudentStatus with code ${memberCode} not found`);
        // }

        return {
          ky: thesis.semester,
          nam: thesis.year,
          msv: student.code,
          hd: student.firstName,
          t: student.lastName,
          ns: student.dob,
          lcn: student.classCode,
          sdt: student.phoneNumber,
          tdt: thesis.thesisName,
          gvhd: thesis.instructorName,
          ct: studentStatus.president,
          pb: studentStatus.counterArgument,
          tk: studentStatus.secretary,
          uv: studentStatus.commissioner,
          ng: studentStatus.date,
          d: studentStatus.score,
          gh: studentStatus.extend,
          tt: studentStatus.protectStatus,
          alp: studentStatus.allowProtect,
        };
      });

      const studentData = await Promise.all(studentPromises);
      data.push(...studentData);
    });

    await Promise.all(promises);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
