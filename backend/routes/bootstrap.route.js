const express = require("express");
const { BootstrapModal } = require("../models/bootstrap.modal");
const bootRoute = express.Router();
//get post Route
bootRoute.get("/books", async (req, res) => {
  try {
    const sendData = await BootstrapModal.find();
    res.send(sendData);
  } catch (err) {
    console.log(err.message);
  }
});

//post post Route
bootRoute.post("/bookPost", async (req, res) => {
  try {
    const data = req.body;
    const getData = new BootstrapModal(data);
    await getData.save();
    res.send("form submitted successfully");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
//edit post Route or put data
bootRoute.patch("/editBook/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await BootstrapModal.findByIdAndUpdate({ _id: ID }, payload);
    res.send("book updated successfully");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
//delete post Route
bootRoute.delete("/deletePost/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await BootstrapModal.findByIdAndDelete({ _id: ID });
    res.send("book deleted successfull");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
module.exports = {
 bootRoute,
};
