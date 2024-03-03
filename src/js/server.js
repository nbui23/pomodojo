const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();
const port = 4000;

var auth = false;

// List of authenticated routes
const authenticatedRoutes = [
  "/room.html",
  // Add more authenticated routes here as needed
];

// Middleware to check authentication
const authenticate = (req, res, next) => {
  // Check if requested URL is in the list of authenticated routes
  if (authenticatedRoutes.includes(req.url)) {
    // Check if auth variable is set to true
    if (auth) {
      next(); // Continue to the next middleware or route handler
    } else {
      res.redirect("/login.html"); // Redirect to login page if not authenticated
    }
  } else {
    next(); // If the route is not authenticated, proceed without authentication
  }
};

// app.get("/room.html", async (req, res) => {
//   // make sure auth var is set to true
//   if (auth) {
//     res.sendFile(path.join(__dirname, "../html/room.html"));
//   } else {
//     res.redirect("login.html");
//   }
// });

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
      }
    });

    if (found === 1) {
      auth = true;
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
