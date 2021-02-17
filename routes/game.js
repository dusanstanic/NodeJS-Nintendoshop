const express = require("express");
const router = express.Router();

const gameController = require("../controllers/game");

router.get("/games", gameController.fetchAllGames);

router.post("/games", gameController.save);

router.put("/games", gameController.update);

router.delete("/games/:gameId", gameController.delete);

router.get("/games/:gameId", gameController.fetchGameById);

module.exports = router;
