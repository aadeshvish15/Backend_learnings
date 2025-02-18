//step 1: create a folder
//step 2 : move in that folder
//3: npm init -y
// 4: open folder
// 5: npm i express
// 6: create js file(server.js)

//Server initiate
const express = require('express');
const app = express();
//used to parse req.body
const bodyParser = require('body-parser');
//specifically parse JSON data&add it to the request.Body object
app.use(bodyParser.json());

//activate server on 300 port
app.listen(8000, () => {
    console.log("Server started");
});
//Routes
app.get('/', (request, response) => {
    response.send("Hello");
});
app.post('/api/cars', (request, response) => {
    const { name, brand } = request.body;
    console.log(name);
    console.log(brand);
    response.send("Car submitted");
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    console.log("Successful");
    })
    .catch(() => {
    console.log("Failed");
})