const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middleware/auth");
const port = 4000;

app.use("/admin", adminAuth);
app.use("/getUserData", (req, res) => {
  try {
    throw new Error("hjdkldl");
  } catch (err) {
    res.status(500).send("some Error contact support team");
  }
});
app.get("/user", userAuth, (req, res) => {
  res.send("User Data sent");
});
app.get("/admin/getAllData", (req, res) => {
  res.send("All Data sent");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("some Error occured");
  }
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
