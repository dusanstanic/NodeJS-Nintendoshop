const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");

const rootDir = require("./util/path");

const adminRouter = require("./routes/admin");
const gameRoutes = require("./routes/game");
const consoleRoutes = require("./routes/console");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter.routes);
app.use(gameRoutes);
app.use(consoleRoutes);

app.use(errorController.get404);

app.listen(4000);
