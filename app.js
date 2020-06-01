const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes");
const middlewares = require("./utils/middlewares");

// Initialize middlewares
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(middlewares.setHeaders);

//Add Router
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening"));
