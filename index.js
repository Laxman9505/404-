const express = require("express");
const app = express();
const connectDb = require("./DB");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

connectDb();
//Initialize the middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("Server is listening on port" + PORT);
});

app.use("/api/users", require("./routes/user"));

app.use("/api/auth", require("./routes/auth"));

app.use("/api/parking", require("./routes/parking"));
app.listen(PORT, () => {
  console.log("server is listenning");
});
