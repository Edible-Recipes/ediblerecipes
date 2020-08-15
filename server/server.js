const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()) // --> Same as body parser



app.get('/', (req, res) => {
    res.send('Hello');
});





app.listen(PORT, () => {
    console.log('Edible Recipes Server is up and running');
})