const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "success" });
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.files);
  res.status(201).json({ msg: "success", body: req.files });
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
