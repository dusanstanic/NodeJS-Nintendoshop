const db = require("../util/database");
const genreService = require("./genre");
const gameConsoleService = require("./game_console");

exports.fetchAllGames = () => {
  return db
    .execute("select * from game")
    .then(async (results) => {
      const games = results[0];

      for (game of games) {
        game.genre = await genreService.fetchGenreById(game.genre_id);
        game.consoles = await this.fetchConsolesByGameId(game.id);

        delete game.genre_id;
      }

      return games;
    })
    .catch((err) => {
      //console.log("Error");
      //console.log(err);
    });
};

exports.fetchGameById = (id) => {
  return db
    .execute("select * from game where game.id = " + id)
    .then(async (result) => {
      const game = result[0][0];
      game.consoles = await this.fetchConsolesByGameId(id);
      return game;
    })
    .catch((error) => {
      // console.log(error);
    });
};

exports.save = (game) => {
  const values = `("${game.title}", "${game.description}", ${game.releaseDate}, ${game.price}, "${game.pgRating}", "${game.status}", "${game.image}", ${game.genre})`;

  return db
    .execute(
      `insert into game (title, description, release_date, price, pg_rating, status, image, genre_id) VALUES ${values}`
    )
    .then((result) => {
      const gameId = result[0].insertId;
      const consoles = game.consoles;

      for (consolee of consoles) {
        db.execute(
          `insert into game_console (game_id, console_id) values (${gameId}, ${consolee.id})`
        )
          .then((result) => {
            console.log("Result = ");
            console.log(result);
          })
          .catch((error) => {
            console.log("Error " + error);
          });
      }

      return result;
    })
    .catch((err) => {
      console.log("Error " + error);
    });
};

exports.update = (game) => {
  return db
    .execute(
      ` update game 
        set title = "${game.title}", description = "${game.description}", release_date = ${game.releaseDate}, price = ${game.price}, pg_rating = "${game.pgRating}", status = "${game.status}", image = "${game.image}", genre_id = ${game.genre}
        where id = ${game.id}`
    )
    .then(async (res) => {
      const consoles = game.consoles;
      const gameId = game.id;

      if (consoles.length > 0) {
        const result = await gameConsoleService.deleteByGameId(game.id);

        for (consolee of consoles) {
          db.execute(
            `insert into game_console (game_id, console_id) values (${gameId}, ${consolee.id})`
          )
            .then((result) => {
              console.log("Result = ");
              console.log(result);
            })
            .catch((error) => {
              console.log("Error " + error);
            });
        }
      }

      return true;
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.delete = (id) => {
  return db
    .execute(`delete from game where game.id = ` + id)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.fetchConsolesByGameId = (id) => {
  return db
    .execute(
      "select * from game_console gc join console c on c.id = gc.console_id where gc.game_id = " +
        id
    )
    .then(async (result) => {
      const consoles = result[0];
      const updatedConsoles = [];

      for (console of consoles) {
        const updatedConsole = await this.fetchConsoleById(console.console_id);
        updatedConsoles.push(updatedConsole);
      }

      return updatedConsoles;
    })
    .catch((err) => {
      console.log(error);
    });
};

exports.fetchConsoleById = (id) => {
  return db
    .execute("select * from console where console.id = " + id)
    .then(async (result) => {
      const consolee = result[0][0];
      return consolee;
    })
    .catch((error) => {
      console.log(error);
    });
};
