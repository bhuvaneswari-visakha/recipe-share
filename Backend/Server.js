const express = require("express");
const cors = require("cors");
const { configDotenv } = require("dotenv");
const { mongoConnect } = require("./config/db");
const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoutes");
const path = require("path");

configDotenv();

const PORT = process.env.PORT || 5000;
mongoConnect();

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
