const pgp = require("pg-promise")({});


var connectionString = pgp("postgres://localhost/btUsers");

var db = pgp(connectionString);

module.exports = db;
