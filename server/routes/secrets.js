// const express = require("express");
// const secretController = require("../controllers/secrets");
// const authMiddleware = require("../utils/authMiddleware");

// const router = express.Router();

// router.post("/post-secret", authMiddleware, secretController.postSecret);
// router.get("/get-secrets", authMiddleware, secretController.getSecrets);

// module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const Secret = require("../models/Secrets");

// Route to get all secrets
router.get("/", async (req, res) => {
  try {
    const secrets = await Secret.find();
    res.json(secrets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to post a new secret
router.post("/", authMiddleware, async (req, res) => {
  const { userId, message } = req.body;

  try {
    const newSecret = new Secret({
      userId,
      message,
    });

    const savedSecret = await newSecret.save();
    res.json(savedSecret);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
