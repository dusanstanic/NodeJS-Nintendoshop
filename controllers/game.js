const gameService = require("../services/game");

exports.fetchAllGames = (req, res, next) => {
  gameService.fetchAllGames().then((games) => {
    res.json(games);
  });
};

exports.save = async (req, res, next) => {
  //vconst gameId = req.params.gameId;
  console.log(req.body);
  const game = req.body;

  const date = `"${new Date().getFullYear()}-${new Date().getMonth()}-0${new Date().getDay()}"`;
  console.log(date);
  const result = await gameService.save({
    title: "yo",
    description: "yo",
    releaseDate: date,
    pgRating: "12",
    status: "new",
    image: "yooo",
    genre: 1,
    price: 3000,
    consoles: [{ id: 5 }],
  });
  console.log("result " + result);
  res.json({ yo: "yo" });

  // console.log(gameId);
  // res.sendFile(path.join(rootDir, "views", "addGame.html"));
};

exports.fetchGameById = async (req, res, next) => {
  const gameId = req.params.gameId;
  const editMode = req.query.edit;
  console.log(gameId);
  const game = await gameService.fetchGameById(gameId);

  res.json(game);
};

exports.update = async (req, res, next) => {
  const date = `"${new Date().getFullYear()}-${new Date().getMonth()}-0${new Date().getDay()}"`;
  const result = await gameService.update({
    id: 42,
    title: "yo",
    description: "yo",
    releaseDate: date,
    pgRating: "12",
    status: "new",
    image: "yooo",
    genre: 1,
    price: 3000,
    consoles: [{ id: 5 }],
  });
  console.log("Result ");
  console.log(result);
  res.json({ result });
};

exports.delete = async (req, res, next) => {
  const gameId = req.params.gameId;
  console.log(gameId);
  const result = await gameService.delete(gameId);
  res.json({ yo: "yo" });
};

// exports.postAddGame = (req, res, next) => {
//   console.log("Title " + req.body.title);
//   res.redirect("/games");
// };
/*  console.log(new Date().toDateString());
  console.log(new Date().toISOString());
  console.log(new Date().toLocaleDateString());
  console.log(new Date().toLocaleString());
  console.log(new Date().toLocaleTimeString());
  console.log(new Date().toTimeString());
  console.log(new Date().toString());
  console.log(new Date().toJSON());*/
