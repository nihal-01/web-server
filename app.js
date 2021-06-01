const express = require("express");
require("dotenv").config();
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/partials"));
app.set("views", path.join(__dirname, "/templates"));

app.use(express.static(path.join(__dirname, "/public")));

app.get("", (req, res) => {
  res.render("index.hbs", { title: "WEB APP" });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", { title: "About us" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.status(400).json({
      code: 400,
      error: "address is not provide",
    });
  }

  geocode(req.query.address, (err, { lat, log, placeName } = {}) => {
    if (err) {
      return res.status(400).json({
        code: 400,
        error: err,
      });
    }
    forcast(lat, log, (err, result) => {
      if (err) {
        return res.status(400).json({
          code: 400,
          error: err,
        });
      }

      res.status(200).json({
        ...result,
        place: placeName,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send("404, page not found!");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
