const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  try {
    const [extention] = filename.split(".").reverse();
    const newFileName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
    res.json({ avatarURL });
  } catch (error) {}
};

module.exports = updateAvatar;
