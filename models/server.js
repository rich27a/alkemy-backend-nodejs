const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const sequelize = require("../database/config");
require("../database/associations");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      characters: "/api/characters",
      genres: "/api/genres",
      movies: "/api/movies",
      search: "/api/search",
      uploads: "/api/uploads",
      users: "/api/users",
    };

    this.databaseConnect();

    this.middlewares();

    this.routes();
  }

  async databaseConnect() {
    try {
      await sequelize.authenticate();
      console.log("Database online");

      await sequelize.sync({ force: false });
      console.log("Tables has been synchronized");
    } catch (error) {
      throw new Error(error);
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //JSON
    this.app.use(express.json());

    //File uploads
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.characters, require("../routes/characters"));
    this.app.use(this.paths.genres, require("../routes/genres"));
    this.app.use(this.paths.movies, require("../routes/movies"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port`, this.port);
    });
  }
}

module.exports = Server;
