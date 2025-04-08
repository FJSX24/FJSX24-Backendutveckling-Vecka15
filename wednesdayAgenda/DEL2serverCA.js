import express from "express";
const app = express();
const PORT = 3000;

// Middleware för att läsa JSON
app.use(express.json());

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Bara för att visa upp något på startsidan
app.get("/", (req, res) => {
  res.send("Hello express server");
});

// CRUD med user

// GET - Hämta alla användare
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// GET med Path Params
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

// POST - Skapa ny användare
app.post("/api/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  const newUser = { id: Date.now(), name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Uppdatera användare
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ error: "User not found" });

  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });
  user.name = name;

  res.json(user);
});

// DELETE - Ta bort användare
app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ error: "User not found" });

  users.splice(index, 1);

  res.json({ message: "User deleted" });
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
