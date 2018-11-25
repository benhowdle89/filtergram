require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const api = require("./api");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

const { PORT = 5000 } = process.env;

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/", (req, res) => res.sendStatus(200));
app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
