const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection String (replace with your own)
const mongoURL = 'mongodb+srv://admin:admin@studyhallapp.pty8srz.mongodb.net/';

app.get('/', (req, res) => {
  res.send('Hello, this is the root route!');
});

// Define a route for handling form submissions
app.post('/submit-form', async (req, res) => {
  try {
    res.send('Endpoint found and processed successfully');
    const client = await MongoClient.connect(mongoURL);
    const db = client.db();

    // Replace 'your_collection' with the name of your MongoDB collection
    const collection = db.collection('UserInfo');

    // Extract form data from the request body
    const formData = {
      email: req.body.email,
      pass: req.body.password,
      school: req.body.school
    };

    // Insert form data into MongoDB
    await collection.insertOne(formData);

    client.close();
    res.status(200).send('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
