const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
//Logs HTTP request urls to console with time and reply
const loggerHttp = require("morgan");

/*Setup basic config*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(helmet.noCache());

/* Connect to database */
mongoose
  .connect("<url>")
  .then(() => console.log("connected to mongoDB"))
  .catch(() => console.log("there is an error maybe"));

/* Startup server */
const Port = process.env.PORT || 4000;
app.listen(Port, () => {
  console.log("Listening on port" + Port);
});
