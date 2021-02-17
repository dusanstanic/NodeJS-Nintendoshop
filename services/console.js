const db = require("../util/database");

exports.fetchAllConsoles = () => {
  return db
    .execute("select * from console")
    .then(async (result) => {
      const consoles = result[0];

      for (consolee of consoles) {
        consolee.games = await this.fetchGamesByConsoleId(consolee.id);
      }

      return consoles;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.fetchConsoleById = (id) => {
  return db
    .execute("select * from console where console.id = " + id)
    .then(async (result) => {
      const consolee = result[0][0];
      consolee.games = await this.fetchGamesByConsoleId(id);

      return consolee;
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.save = (consolee) => {
  const values = `("${consolee.title}", "${consolee.description}", ${consolee.releaseDate}, ${consolee.price}, "${consolee.type}", "${consolee.condition}", "${consolee.image}", "${consolee.logo}")`;

  return db
    .execute(
      `insert into console (title, description, release_date, price, type, conditionn, image, logo) VALUES ${values}`
    )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log("Error " + error);
    });
};

exports.update = (consolee) => {
  return db
    .execute(
      ` update console 
        set title = "${consolee.title}", description = "${consolee.description}", release_date = ${consolee.releaseDate}, price = ${consolee.price}, type = "${consolee.type}", conditionn = "${consolee.condition}", image = "${consolee.image}", logo = "${consolee.logo}"
        where id = ${consolee.id}`
    )
    .then(async (res) => {
      return true;
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
};

exports.fetchGamesByConsoleId = (id) => {
  return db
    .execute(
      "select * from game g join game_console gc on g.id = gc.game_id where gc.console_id = " +
        id
    )
    .then(async (result) => {
      const games = result[0];
      const updatedGames = [];

      for (game of games) {
        const updatedGame = await this.fetchGameById(game.game_id);
        updatedGames.push(updatedGame);
      }

      return updatedGames;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.fetchGameById = (id) => {
  return db
    .execute("select * from game where game.id = " + id)
    .then(async (result) => {
      const game = result[0][0];
      return game;
    })
    .catch((error) => {
      console.log(error);
    });
};
