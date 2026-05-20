import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Dettes from "../Databases/Schemas/Dettes.js";
import Creances from "../Databases/Schemas/Creances.js";
import Test from "../Databases/Schemas/Test.js";
import cors from "cors";
import {
  ConsoleLogger,
  ConsoleConfig,
  FileLogger,
} from "@fluxbot/better-console";
import { Colors } from "@fluxbot/better-console";
import color from "colors";

const config = new ConsoleConfig();
const log = new ConsoleLogger(config);
const app = express();
const port = process.env.PORT;
const mongodb = process.env.MONGODBURL;
app.use(cors());
app.use(express.json());

mongoose
  .connect(mongodb, {
    dbName: "debts-manager",
  })
  .then(() => log.database("CONNECTED".magenta))
  .catch((err) => console.error("Erreur de connexion DB :", err));

app.listen(port, function () {
  log.custom("SERVER", Colors.Yellow, `RUNNING`.yellow);
});

app.get("/api", async (req, res) => {
  const debts = await Dettes.find();
  const creances = await Creances.find();
  res.json(debts, creances);
});

app.get("/api/dettes/:status", async (req, res) => {
  const status = req.params.status;
  let dettes;
  if (status == "false") {
    dettes = await Dettes.find({ state: false });
    //  console.log(dettes.length)
  } else if (status == "true") {
    dettes = await Dettes.find({ state: true });
  } else {
    dettes = await Dettes.find();
  }
  //console.log(status);
  res.json(dettes);
});

app.get("/api/creances/:status", async (req, res) => {
  const status = req.params.status;
  let creances;
  if (status == "false") {
    creances = await Creances.find({ state: false });
    //  console.log(dettes.length)
  } else if (status == "true") {
    creances = await Creances.find({ state: true });
  } else {
    creances = await Creances.find();
  }
  //console.log(status);
  res.json(creances);
});

app.get("/api/dettes", async (req, res) => {
  const debts = await Dettes.find();
  res.json(debts);
});

app.get("/api/creances", async (req, res) => {
  const creances = await Creances.find();
  res.json(creances);
});

// app.get("/api/dettes/:name", async (req, res) => {
//   console.log(req.params);
//   res.send("Ok");
// });

app.post("/api/dettes", async (req, res) => {
  const { date, person, amount, state, description } = req.body;
  try {
    const newDebt = new Dettes(req.body);
    await newDebt.save();
    res.send("Enregistré avec succès !");
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/creances", async (req, res) => {
  const { date, person, amount, state, description } = req.body;
  try {
    const newDebt = new Creances(req.body);
    await newDebt.save();
    res.send("Enregistré avec succès !");
  } catch (e) {
    console.log(e);
  }
});

app.patch("/api/dettes/:id", async (req, res) => {
  try {
    const dette = await Dettes.findOne({ _id: req.body._id });
    await dette.updateOne({ state: req.body.state });
    res.send("Modification terminée");
  } catch (e) {
    console.log(e);
  }
});

app.patch("/api/creances/:id", async (req, res) => {
  try {
    const creance = await Creances.findOne({ _id: req.body._id });
    await creance.updateOne({ state: req.body.state });
    res.send("Modification terminée");
  } catch (e) {
    console.log(e);
  }
});
