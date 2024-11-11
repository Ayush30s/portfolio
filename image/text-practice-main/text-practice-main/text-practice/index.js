const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userModel = require("./models/user"); // Ensure this file exists
const employeeModel = require("./models/employee"); // Ensure this file exists

const app = express();
const PORT = 6000;
const JWT_SECRET = "ayush123123";

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://ankit05:ankit05@cluster0.agsur.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Generate JWT
function generateToken(user) {
  return jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
}

// Middleware to authenticate using JWT
function authenticateToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log(token)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid or expired token.");
    req.user = decoded; // Save user info to request
    next();
  });
}

// User Signup Route
app.post("/user/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = await userModel.create({ email, password });
    res.json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
});

// User Signin Route
app.post("/user/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email, password });
    if (user) {
      const token = generateToken(user);
      res.json({ message: "Signin successful", token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error });
  }
});

// Create Employee Route (only accessible by authenticated users)
app.post("/user/new/createEmployee", authenticateToken, async (req, res) => {
  const { fullname, email, password, gender, designation, location } = req.body;
  try {
    const employee = await employeeModel.create({
      fullname,
      email,
      password,
      gender,
      designation,
      location,
      createdBy: req.user.userId,
    });
    res.json({ message: "Employee created successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
});

// Get Employee Details (only accessible by the user who created the employees)
app.get("/employeeDetails", authenticateToken, async (req, res) => {
  try {
    const employees = await employeeModel.find({ createdBy: req.user.userId });
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee details", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
