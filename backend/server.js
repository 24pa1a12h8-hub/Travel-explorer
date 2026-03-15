const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const ExperienceRoutes = require("./routes/experienceRoutes");
const User = require("./models/User");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());

/* ---------------- DATABASE CONNECTION ---------------- */

mongoose.connect("mongodb://127.0.0.1:27017/travelDB")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("Database Error:", err);
});

/* ---------------- REGISTER ---------------- */

app.post("/register", async (req,res)=>{

try{

const {email,password} = req.body;

const existingUser = await User.findOne({email});

if(existingUser){
return res.json({message:"User already exists"});
}

const hashedPassword = await bcrypt.hash(password,10);

const newUser = new User({
email,
password:hashedPassword
});

await newUser.save();

res.json({message:"Registration successful"});

}
catch(err){

res.json({message:"Error registering user"});

}

});

/* ---------------- LOGIN ---------------- */

app.post("/login", async (req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
return res.json({message:"User not found"});
}

const match = await bcrypt.compare(password,user.password);

if(!match){
return res.json({message:"Incorrect password"});
}

res.json({message:"Login successful"});

}
catch(err){

res.json({message:"Login error"});

}

});

/* ---------------- EXPERIENCE ROUTES ---------------- */

app.use("/experience", ExperienceRoutes);

/* ---------------- SERVER ---------------- */

const PORT = 5000;

app.listen(PORT, ()=>{

console.log("Server running on port " + PORT);

});