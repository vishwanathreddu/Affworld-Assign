const Secret = require("../models/Secrets");

const postSecret = async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Check if the user has already posted a secret
    const existingSecret = await Secret.findOne({ userId });

    if (existingSecret) {
      return res
        .status(400)
        .json({ message: "User has already posted a secret" });
    }

    // Create a new secret
    const newSecret = new Secret({
      userId,
      message,
    });

    await newSecret.save();

    res.status(201).json({ message: "Secret posted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllSecrets = async (req, res) => {
  try {
    const secrets = await Secret.find({}, { _id: 0, __v: 0 }); // Exclude _id and __v from the response

    res.json(secrets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postSecret,
  getAllSecrets,
};
