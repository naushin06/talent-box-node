const Dashboard = require("../models/DashboardModel");
const mongoose = require("mongoose");

const dashboardController = {};


dashboardController.createDashboardContent = async (req, res) => {
  const { title, content, age } = req.body;
  try {
    const newContent = await Dashboard.create({ title, content, age });
    res.status(201).json({ data: newContent });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

dashboardController.getDashboardContent = async (req, res) => {
  try {
    const dashboardContent = await Dashboard.find();
    res.status(200).json({ data: dashboardContent });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports = dashboardController;
