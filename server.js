import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000; // fallback om den inte är satt

app.use(express.json());

// Vår "databas"
let users = [
  { id: 1, name: "Mandus" },
  { id: 2, name: "Klas" },
];

// Bara för att visa upp något på startsidan
app.get("/", (req, res) => {
  res.send("Startsidan på servern");
});

// CRUD för users

// GET

// GET för att hämta alla users
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// GET för att hämta en specifik users (med params)
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ error: "User not found" });

  res.status(200).json(user);
});

// POST

// Skapa en ny user
app.post("/api/users", (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });

  const newUser = { id: Date.now(), name };

  users.push(newUser);

  res.status(201).json(newUser);
});

// PUT

// uppdatera en user
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ error: "User not found" });

  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });

  user.name = name;

  res.status(200).json(user);
});

// DELETE

// Ta bort en user
app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ error: "User not found" });

  users.splice(index, 1);

  res
    .status(200)
    .json({ message: `User with id of ${req.params.id} was deleted.` });
});

// Starta och lyssna på servern
app.listen(PORT, () => {
  console.log(`server körs på http://localhost:${PORT}`);
});
