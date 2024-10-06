const express = require("express");
const axios = require("axios");
const router = express.Router();


router.post("/", async (req, res) => {
  console.log("server.js hit");

  const codeText = req.body.code; 
  const extraPrompt = req.body.extraPrompt; 

  if (!codeText) {
    return res.status(400).json({ error: "No code provided" });
  }

  try {
   
    const response = await axios.post(
      "http://localhost:5000/generate-docs",
      {
        code: codeText,
        extraPrompt: extraPrompt,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data && response.data.documentation) {
      res.json({ documentation: response.data.documentation });
    } else {
      res.status(500).json({ error: "Failed to get documentation" });
    }
  } catch (error) {
    console.error("Error forwarding request to Flask:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;