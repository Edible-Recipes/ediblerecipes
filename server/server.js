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

//psql -d <url from elephantSQL> -f starwars_postgres_create.sql
//postgres://nagsauar:3uEIYk1GNWY8XPHcw61ZsQErEvPKtr2d@rajje.db.elephantsql.com:5432/nagsauar
//psql -d postgres://nagsauar:3uEIYk1GNWY8XPHcw61ZsQErEvPKtr2d@rajje.db.elephantsql.com:5432/nagsauar -f ediblerecipes_create.sql