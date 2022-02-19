const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const router = require("./routes");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "Serveur Calculatrice" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use(router);
