const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();
const port = 4000;

app.use(
  session({
    secret: "your_secret_key", // Change this to your own secret key
    resave: false,
    saveUninitialized: false,
  })
);

// Route middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect("/login.html");
  }
}

app.get("/room.html", isAuthenticated, async (req, res) => {
  res.sendFile(path.join(__dirname, "../html/room.html"));
});

app.use(express.static(path.join(__dirname, "../html")));
app.use(express.static(path.join(__dirname, "../css")));
app.use(express.static(path.join(__dirname, "../js")));
app.use(express.static(path.join(__dirname, "../")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.json());

// MongoDB Connection String (replace with your own)
const mongoURL = "mongodb+srv://admin:admin@studyhallapp.pty8srz.mongodb.net/";

// Define a route for handling form submissions
app.post("/sign-up", async (req, res) => {
  try {
    //const resData = JSON.parse(req.body);
    const client = await MongoClient.connect(mongoURL);
    const db = client.db();

    const collection = db.collection("UserInfo");

    const formData = {
      email: req.body.email,
      pass: req.body.password,
      school: req.body.school,
      points: 0,
      score: 0,
    };

    await collection.insertOne(formData);

    client.close();
    res.redirect("login.html");
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Modified route for handling login
app.post("/get-login", async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoURL);
    const db = client.db();

    const collection = db.collection("UserInfo");

    const formData = {
      email: req.body.email,
      pass: req.body.password,
    };

    const data = await collection.find({}).toArray();

    let found = 0;

    data.forEach((doc) => {
      if (doc.email === formData.email && doc.pass === formData.pass) {
        found = 1;
        req.session.user = doc; // Store user data in session
        console.log("User data stored in session:", req.session.user);
      }
    });

    if (found === 1) {
      res.redirect("/room.html"); // Corrected redirect URL
    } else {
      res.redirect("/login.html");
    }

    client.close();
  } catch (error) {
    console.error("Error retrieving data from MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/test", (req, res) => {
  const email = req.session.user.email;
  res.send("<h1>Hello World</h1> " + email);
});

// Route for logout
app.get("/logout", (req, res) => {
  req.session.destroy(); // Destroy session data
  res.redirect("/login.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
