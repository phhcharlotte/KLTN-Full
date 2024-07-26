import StudentStatus from "../models/StudentStatus.js";

// get

export const getStudentStatus = async (req, res) => {
  try {
    const data = await StudentStatus.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// update
export const updateCouncil = async (req, res) => {
  try {
    const { studentCode, field, updateName } = req.body;
    // console.log(studentCode, field, updateName);

    const updateStudentStatus = await StudentStatus.findOne({ studentCode: studentCode });

    if (!updateStudentStatus) {
      return res.status(404).json("student status not found");
    }

    updateStudentStatus[field] = updateName;
    await updateStudentStatus.save();

    res.status(200).json("Update successful");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateDocument = async (req, res) => {
  try {
    const { linkDrive, linkGithub } = req.body;
    const { code } = req.user;
    // console.log(studentCode, field, updateName);

    const updateStudentStatus = await StudentStatus.findOne({ studentCode: code });

    if (!updateStudentStatus) {
      return res.status(404).json("student status not found");
    }

    updateStudentStatus.linkDrive = linkDrive;
    updateStudentStatus.linkGithub = linkGithub;
    await updateStudentStatus.save();

    res.status(200).json("Update successful");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete
export const deleteStudentStatus = async (req, res) => {
  try {
    const { studentCode } = req.body;
    const deletedStatus = await StudentStatus.findOneAndDelete({ studentCode: studentCode });

    if (!deletedStatus) {
      return res.status(404).json("student status not found");
    }

    res.status(200).json("Delete successful");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentStatusByCouncilName = async (req, res) => {
  try {
    const { firstName, lastName } = req.user;
    const name = `${firstName} ${lastName}`;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Tạo truy vấn động để tìm kiếm trong nhiều trường
    const query = {
      $or: [
        { president: name },
        { instructor: name },
        { secretary: name },
        { counterArgument: name },
        { commissioner: name },
      ],
    };

    const councils = await StudentStatus.find(query);

    if (councils.length === 0) {
      return res.status(404).json({ message: "No records found with the given name" });
    }

    res.status(200).json(councils);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
