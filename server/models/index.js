const dbConfig = require("../config/dbConnection");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.chat = require("./chat.modal")(mongoose);
db.message = require("./Message.model")(mongoose);
db.user = require("./user.model")(mongoose);

module.exports = db;