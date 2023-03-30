const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  title: String,
  content: String,
  age: String,
});

module.exports = mongoose.model("Dashboards", dashboardSchema);
