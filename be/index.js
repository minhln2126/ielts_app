const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/userRoute");
const questionRoutes = require("./routes/questionRoute");
const testRoutes = require("./routes/testRoute");
const problemRoutes = require("./routes/problemRoute");
const commentRoutes = require("./routes/commentRoute");
const sectionRoutes = require("./routes/sectionRoute");
const siteRoutes = require("./routes/siteRoute");
const postRoutes = require("./routes/postRoute");
const db = require("./config/database");

const port = process.env.PORT || 3000;

const app = express();

//set env config path
dotenv.config({
  path: "./config.env",
});

//connect to db
db.connect();

//static files
app.use(express.static(path.join(__dirname, "/shared")));

//set security http header
app.use(helmet());

//cors policy
app.use(cors());

//body parser
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/sections", sectionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api", siteRoutes);

app.use("*", (req, res) => {
  res.status(400).send("Undefined route !");
});

app.listen(port, () => {
  console.log(`Listen at port ${port}`);
});
