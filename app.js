const express = require("express");
const cors = require("cors");
const app = express();
const genericRoutes = require("./routes/commonRoutes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
try {
  mongoose
    .connect(
      "mongodb+srv://root:password123*@cluster0.hxeftjt.mongodb.net/talentbox",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Db CONNECT");
    });
} catch (error) {
  console.log(error.message);
}
// Close the Mongoose connection when the API server is shut down
process.on("SIGTERM", () => {
  app.close(() => {
    console.log("API server shut down");
    mongoose.disconnect();
  });
});

app.use(cookieParser());
app.use(express.json());
app.use("/talentbox", genericRoutes);
