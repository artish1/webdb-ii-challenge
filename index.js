const express = require("express");
const knex = require("knex");
const server = express();
const dbConfig = require("./knexfile").development;
const db = knex(dbConfig);

const port = 4000;

server.use(express.json());

server.get("/", (req, res) => {
  db("cars")
    .select("*")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      console.log("Error getting cars", err);
      res.status(500).json({ error: "Could not get cars" });
    });
});

server.post("/", validateCarInfo, (req, res) => {
  db("cars")
    .insert(req.body)
    .then(() => {
      res.status(201).json({ message: "Car inserted" });
    })
    .catch(err => {
      console.log("Error making new car", err);
      res.status(500).json({ error: "Could not create new car" });
    });
});

function validateCarInfo(req, res, next) {
  const body = req.body;
  if (!body.vin || !body.make || !body.model || !body.mileage) {
    res
      .status(400)
      .json({ error: "vin, make, model, and mileage fields are required" });
  } else {
    next();
  }
}

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
