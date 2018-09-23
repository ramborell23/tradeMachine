const db = require("../db/queries");
const express = require("express");
const router = express.Router();

/* 1. registerUser // POST Route = /users/newuser */
// router.post("/newuser", db.registerUser);

router.post("/newuser", (req, res, next) => {
    db.registerUser(req)
    .then(() => {
      console.log("TEST 11");
      res.status(200).json({
        status: "success",
        message: "Successfully registered user"
      });
    })
    .catch(err => {
      console.log(`Registration`, err);
      res.status(500).json({
        message: `Registration Failed: ${err} `,
        err
      });
    });
});

module.exports = router;
