const express = require("express");
const cors = require("cors");
const { configDotenv } = require("dotenv");
const { mongoConnect } = require("./config/db");
const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoutes");
const path = require("path");
configDotenv();
const PORT = process.env.PORT;
mongoConnect();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
