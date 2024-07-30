const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

async function uploadOnCloudinary(req, res) {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "dummy",
    });

    fs.unlinkSync(req.file.path);

    return res.status(201).json({ url: uploadResult.secure_url });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { uploadOnCloudinary };
