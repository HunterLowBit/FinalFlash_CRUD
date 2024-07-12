const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}`)
);
// back\app.js
