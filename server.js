const express = require("express");
const path = require("path");
const util = require("util");
const port = process.env.PORT || 9000;

const app = express();

//Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

app.listen(port, () => console.log(`listening on localhost: ${port}`));