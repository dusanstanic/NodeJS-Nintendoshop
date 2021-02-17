const consoleService = require("../services/console");

exports.fetchAllConsoles = async (req, res, next) => {
  const consoles = await consoleService.fetchAllConsoles();
  res.json(consoles);
};

exports.save = async (req, res, next) => {
  const date = `"${new Date().getFullYear()}-${new Date().getMonth()}-0${new Date().getDay()}"`;

  const result = await consoleService.save({
    title: "c1",
    description: "c1",
    releaseDate: date,
    price: 3000,
    type: "3DS",
    condition: "new",
    image: "img",
    logo: "logo",
  });
  console.log("result " + result);
  res.json({ yo: "yo" });

  // console.log(gameId);
  // res.sendFile(path.join(rootDir, "views", "addGame.html"));
};

exports.update = async (req, res, next) => {
  const date = `"${new Date().getFullYear()}-${new Date().getMonth()}-0${new Date().getDay()}"`;
  const result = await consoleService.update({
    id: 12,
    title: "c1",
    description: "c1",
    releaseDate: date,
    price: 3000,
    type: "3DS",
    condition: "new",
    image: "img",
    logo: "logo",
  });

  res.json({ result });
};

exports.fetchConsoleById = async (req, res, next) => {
  const consoleId = req.params.consoleId;

  const consolee = await consoleService.fetchConsoleById(consoleId);

  res.json(consolee);
};
