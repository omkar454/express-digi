import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

let teas = [];
let nextId = 1;
const port = process.env.PORT || 3000;

// add tea
app.post("/teas", (req, res) => {
  const { name, cost } = req.body;
  const tea = {
    nextId: nextId++,
    name,
    cost,
  };
  teas.push(tea);
  res.status(200).send(tea);
});

// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teas);
});

// get tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teas.find((ele, index) => ele.nextId === parseInt(req.params.id));
  if (!tea) return res.status(404).send("Tea not found");
  return res.status(200).send(tea);
});

// update tea with id
app.put("/teas/:id", (req, res) => {
  if (!req.body)
    return res.status(404).send("Please give data for modification");
  const { name, cost } = req.body;
  const tea = teas.find((ele, index) => ele.nextId === parseInt(req.params.id));
  if (!tea) return res.status(404).send("Tea not found");
  if (!name && !cost)
    return res
      .status(404)
      .send("Please give name or cost in JSON Format for modification");
  else {
    if (name) tea.name = name;
    if (cost) tea.cost = cost;
    res.status(200).send(tea);
  }
});

// delete with id
app.delete("/teas/:id", (req, res) => {
  const teaIndex = teas.findIndex(
    (ele, index) => ele.nextId === parseInt(req.params.id)
  );
  if (teaIndex === -1) return res.status(404).send("Tea not found");
  const removedTea = teas.splice(teaIndex, 1);
  res.status(200).send(removedTea);
});

app.listen(port, () => {
  console.log(`Server started at ${port}...`);
});
