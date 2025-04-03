require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", upload.single('file'), async (req, res) => {
  const {name, email, projectDescription} = req.body;
  const file = req.file;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Message for ${name}`,
    text: projectDescription,
    attachments: file
          ? [{
              filename: file.originalname,
              path: path.join(__dirname, file.path),
            }]
          : [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent!");
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

app.listen(5000, () => console.log("Server works on port: 5000"));