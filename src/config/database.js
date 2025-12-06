const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namstedev:<dbpassword>@namastenode.wtxu7ju.mongodb.net/devTinder"
  );
};
module.exports = connectDB
