const db = require("../util/database");

exports.fetchGenreById = (id) => {
  return db
    .execute("select * from genre where genre.id = " + id)
    .then((result) => {
      const genre = result[0][0];
      return genre;
    })
    .catch((err) => {
      console.log(error);
    });
};
