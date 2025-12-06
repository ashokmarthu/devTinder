const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namstedev:As1234567890@namastenode.wtxu7ju.mongodb.net/devTinder"
  );
};
module.exports = connectDB
