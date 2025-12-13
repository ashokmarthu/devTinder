const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const port = 4000;
app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added sucessfully");
  } catch (err) {
    res.status(400).send(err.message ?? "Error while saving the user");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).send("User not found");
    } else res.send("deleted user successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "gender",
      "skills",
      "age",
      "about",
      "photoUrl",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) throw new Error("update not allowed");
    if (data?.skills?.length > 10)
      throw new Error("Skills more than 10 not allowed");
    const isUserExist = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: true,
      runValidators: true,
    });
    if (!isUserExist) {
      res.status(404).send("User not found");
    } else res.send("updated user successfully");
  } catch (err) {
    res.status(400).send(err.message);
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
