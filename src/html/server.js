const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// app.use();

app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection String (replace with your own)
const mongoURL = 'mongodb+srv://admin:admin@studyhallapp.pty8srz.mongodb.net/';
// parse json 
app.use(express.text())
app.use(express.json())

// Define a route for handling form submissions
app.post('/submit-form', async (req, res) => {
  try {
    const resData = JSON.parse(req.body);
    const client = await MongoClient.connect(mongoURL);
    const db = client.db();

    // Replace 'your_collection' with the name of your MongoDB collection
    const collection = db.collection('UserInfo');

    // Extract form data from the request body
    const formData = {
      email: resData.email,
      pass: resData.password,
      school: resData.school
    };
    
    console.log(formData);
    // Insert form data into MongoDB
    await collection.insertOne(formData);

    client.close();
    res.redirect('index.html');
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/get-login', async (req, res) => {
  try {
    
    const client = await MongoClient.connect(mongoURL);
    const db = client.db();

    // Replace 'your_collection' with the name of your MongoDB collection
    const collection = db.collection('UserInfo');

    // Extract form data from the request body
    const formData = {
      email: req.body.email,
      pass: req.body.password
    };

    // Fetch all documents from the collection
    const data = await collection.find({}).toArray();

    found = 0;

    console.log(formData);

    data.forEach((doc) => {
      console.log(doc);
      if (doc.email === formData.email && doc.pass === formData.pass) {
        found = 1;
      }

    });
    if (found === 1) {
      res.send("Login Successful");
    } else {
      res.send("Login Failed");
    }

    client.close();

  } catch (error) {
    console.error('Error retreiving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }


});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
