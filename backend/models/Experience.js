const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
    destination: String,
    description: String,
    tips: String,
    rating: Number
});

module.exports = mongoose.model("Experience", ExperienceSchema);