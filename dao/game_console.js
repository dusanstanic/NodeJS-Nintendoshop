const db = require("../util/database");

exports.deleteByGameId = (id) => {
  return db
    .execute(`delete from game_console where game_console.game_id = ` + id)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
