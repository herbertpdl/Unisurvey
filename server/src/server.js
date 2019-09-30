const express = require("express");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV;

    this.middlewares();
    this.cross();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use("/api/v1", require("./routes"));
  }

  cross(){
    this.express.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Methods", "*");

      next();
    });
  }
}

module.exports = new App().express;