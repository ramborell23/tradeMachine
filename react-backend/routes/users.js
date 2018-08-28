const db = require("../db/queries");
const express = require("express");
const router = express.Router();


/* 1. registerUser // POST Route = /users/newuser */
router.post('/newuser', db.registerUser);



module.exports = router;
