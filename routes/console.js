const express = require("express");
const router = express.Router();

const consoleController = require("../controllers/console");

router.get("/consoles", consoleController.fetchAllConsoles);

router.post("/consoles", consoleController.save);

router.put("/consoles", consoleController.update);

router.get("/consoles/:consoleId", consoleController.fetchConsoleById);

module.exports = router;
