const express = require("express");
const router = express.Router();

const Experience = require("../models/Experience");

router.post("/add", async (req, res) => {
    const exp = new Experience(req.body);
    await exp.save();
    res.send("Experience Added");
});

router.get("/all", async (req, res) => {
    const data = await Experience.find();
    res.json(data);
});

module.exports = router;