module.exports = class Game {
  constructor(
    id,
    title,
    description,
    releaseDate,
    price,
    pgRating,
    status,
    image,
    genre,
    consoles,
    images
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.releaseDate = releaseDate;
    this.price = price;
    this.pgRating = pgRating;
    this.status = status;
    this.image = image;
    this.genre = genre;
    this.consoles = consoles;
    this.images = images;
  }

  save() {}
};
