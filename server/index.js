const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors")
const morgan = require("morgan");
const multer = require("multer");
const mongoose = require("mongoose");
const { default: helmet } = require("helmet");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const verifyToken = require("./middlewares/auth");
const { createPost } = require("./controllers/posts");
const register = require("./controllers/auth").register;

// CONFIGURATIONS
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ROUTES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture", createPost));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, console.log(`Server Running At Port ${PORT}`));
  })
  .catch((err) => console.log(err));
