const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const port = 4000;

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Ashok",
    lastName: "Marthu",
    email: "ashokmarthu@gmail.com",
    password: "As1234567890",
    age: 27,
  };
  const user = new User(userObj);
  try {
    await user.save();
    res.send("user added sucessfully");
  } catch (err) {
    res.status(400).send("Error while saving the user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch(() => console.log("Failed to connect the database"));
