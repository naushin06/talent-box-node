// const express = require("express");
// const app = express();
// const mongoose = require('mongoose');



// app.get("/", (req, res) => {
//   res.send('hello23')
//   mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     res.send('hello')
//     console.log('Connected to MongoDB Atlas!');
//   })
//   .catch((err) => {
//     res.send('hello23')
//     console.error('Error connecting to MongoDB Atlas:', err);
//   })
//   res.send("Express on Vercel");
// });
// ;

// // Export the Express API
// module.exports = app;




















const express = require("express");
const cors = require("cors");
const app = express();
const genericRoutes = require("./routes/commonRoutes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
app.get("/", (req, res) => {
  res.send("Express on Vercel");
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
//Close the Mongoose connection when the API server is shut down
process.on("SIGTERM", () => {
  app.close(() => {
    console.log("API server shut down");
    mongoose.disconnect();
  });
});

app.use(cookieParser());
app.use(express.json());
app.use("/", genericRoutes);
 module.exports = app;








// const express = require("express");

// const cors = require("cors");

// const app = express();

// const genericRoutes = require("./routes/commonRoutes");

// const mongoose = require("mongoose");

// const cookieParser = require("cookie-parser");

// app.get("/", (req, res) => {

//   res.send("Express on Vercel");

// });

// app.use(

//   cors({

//     origin: ["http://localhost:3000"],

//     methods: ["GET", "POST"],

//     credentials: true,

//   })

// );

// try {

//   mongoose

//     .connect(

//       "mongodb+srv://root:password123*@cluster0.hxeftjt.mongodb.net/talentbox",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     )

//     .then(() => {

//       console.log("Db CONNECT");

//     });

// } catch (error) {

//   console.log(error.message);

// }

// app.use(cookieParser());

// app.use(express.json());

// app.use("/", genericRoutes);

// module.exports = app;


