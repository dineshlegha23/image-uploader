const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary");
require("dotenv").config();
const { uploadOnCloudinary } = require("./upload");

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // Click 'View Credentials' below to copy your API secret
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./uploads/");
//   },

//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

const upload = multer({ dest: "./uploads" });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "success" });
});

app.post("/upload", upload.single("image"), uploadOnCloudinary);

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
