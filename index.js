const express = require("express");
const path = require("path");

const api = require("./api");

const app = express();

const { PORT = 9000 } = process.env;

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/", (req, res) => res.sendStatus(200));
app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
