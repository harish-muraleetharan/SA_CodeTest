const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const FruitRoutes = require("./fruit-routes");
const CartRoutes = require("./cart-routes");

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 1234;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public/stylesheet")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiRoutes = express.Router();
const cartRoutes = express.Router();

// TODO-1: need to npm install and run to start up this fruit server

// setup the fruit routes
FruitRoutes.setup(apiRoutes);

// TODO-4: need to setup route for cart purchase
CartRoutes.setup(cartRoutes);

// all REST api calls should be under api
app.use("/api", apiRoutes);

app.use("/cart", cartRoutes);

// basic get route for the system
app.get("/", function (req, res, next) {
    fetch("https://fe6c-27-4-40-138.ngrok.io/api/fruits", {
        redirect: "manual",
        agent: agent,
    })
    .then((result) => {
        return result.json();
    })
    .then((jsonResponse) => {
        res.render("shop", { data: jsonResponse });
    });
});

// listening on the nodemon port configured in @see package.json
app.listen(port, (req, res) => {
    console.log(`fruit server started from nodemon and listening at http://localhost:${port}`);
});

// Custom Error handler for fruit server
app.use(function (err, req, res, next) {
    // TODO-5: handle common errors
    console.log(err)
    res.status(500);
    res.send(err)
});
