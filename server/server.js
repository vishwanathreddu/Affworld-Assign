const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const secretRoutes = require("./routes/secrets");
const errorHandler = require("./middleware/errorHandler");
const config = require("./utils/config");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(config.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error", error.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/secrets", secretRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
