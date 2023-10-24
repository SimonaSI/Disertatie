console.log("Hello, lume!")

const express = require("express");
const { DataTypes } = require("sequelize");
const cors = require("cors");
const app = express();

const PORT = 8080;
app.use(cors());

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// start server
app.listen(PORT, (req, res) => {
    console.log(`Serverul asculta pe portul ${PORT}`);
  });