const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./routes/userRoutes.js');


const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = "mongodb+srv://ramnarayan:Ram1234@cluster0.hk4ehir.mongodb.net/amazon?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

// Test route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// router 

app.use('/api/user/',user)
