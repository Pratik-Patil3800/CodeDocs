const jwt =require("jsonwebtoken");
require('dotenv').config();



const verifyToken = (req, res, next) => {
  const token = req.cookies["auth_token"];
  console.log("at middleware")
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY );
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = verifyToken;