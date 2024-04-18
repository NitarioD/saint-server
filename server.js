const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/authroutes");
const userRoutes = require("./routes/user");
const imgRoutes = require("./routes/image");
const postRoutes = require("./routes/post");
const videoRoutes = require("./routes/video");
const BasePagesRoutes = require("./routes/base_pages");
const givingRoutes = require("./routes/giving");
const subscriberRoutes = require("./routes/subscriber");

//db connect
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const app = express();
const http = require("http").createServer(app);

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", imgRoutes);
app.use("/api", postRoutes);
app.use("/api", videoRoutes);
app.use("/api", BasePagesRoutes);
app.use("/api", givingRoutes);
app.use("/api", subscriberRoutes);

const port = process.env.PORT || 8000;

http.listen(port, () => console.log(`Server connected to port: ${port}`));
