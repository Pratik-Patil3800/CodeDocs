const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  repo_id:{
    type: String,
    required:true,
    unique:true,
  },
  description:{
    type: String,
    required: false,
  },
  category:{
    type: String,
    required: false,
  },
  pages: [
    {
      type: String, 
    },
  ],
});


const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
const Project = mongoose.model("Project", projectSchema);

module.exports = { User, Project };
