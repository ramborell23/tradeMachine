var express = require("express");
var router = express.Router();
var db = require("../db/queries");

router.use(express.static("public"));




router.get('/', (req, res, next) => {
    db.scrapeStats()
        .then((data) => {
            res.send({ data });
            console.log("RIGHT PLACE")
        })
        .catch((err) => {
            return next(err);
        });
});


module.exports = router;