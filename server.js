import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* HOME */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* USERS (TEMP STORAGE) */
let users = [];

/* REGISTER */
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Enter email & password" });
  }

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = { email, password };
  users.push(user);

  res.json({ message: "Registered successfully", user });
});

/* LOGIN */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(400).json({ message: "Invalid user" });
  }

  res.json({ message: "Login successful" });
});

/* FILES (DUMMY) */
let files = [];

app.post("/files", (req, res) => {
  const { name } = req.body;

  const file = { id: Date.now(), name };
  files.push(file);

  res.json(file);
});

app.get("/files", (req, res) => {
  res.json(files);
});

/* START SERVER */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
