const express = require("express");
const {User} = require("./models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware");
const router = express.Router();
require('dotenv').config();

router.post("/login",  async (req, res) => {
    
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post("/register",async (req, res) => {
      
  
      try {
        let user = await User.findOne({
          email: req.body.email,
        });
  
        if (user) {
          return res.status(400).json({ message: "User already exists" });
        }
  
        user = new User(req.body);
        await user.save();
  
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );
  
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 86400000,
        });
        return res.status(200).send({ message: "User registered OK" });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
      }
    }
  );
  

router.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

module.exports = router;

