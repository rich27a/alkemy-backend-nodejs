const Character = require("../models/character");
const Movie = require("../models/movie");
const Genre = require("../models/genre");

Character.belongsToMany(Movie, { through: "ActorMovies" });
Movie.belongsToMany(Character, { through: "ActorMovies" });

Genre.hasMany(Movie);
Movie.belongsTo(Genre);
