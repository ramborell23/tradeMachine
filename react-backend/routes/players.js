var express = require('express');
var router = express.Router();
var db = require('../db/queries');

router.use(express.static('public'))

router.get('/all', (req, res, next) => {
  db.getAllMoney()
    .then((data) => {
      res.send({data});
      console.log("RIGHT PLACE")
    })
    .catch((err) => {
      return next(err);
    });
});

router.get('/salary/:team', (req, res, next) => {
  var name = req.params.team  
  db.getSalariesByTeam(name)
  .then((data) => {
    res.send({data});
  })
  .catch((err) => {
    console.log(err)
    return next(err);
  });
});


router.get('/home', (req, res, next) => {
  db.getAllPlayers()
    .then((data) => {
      res.send(homepage);
    })
    .catch((err) => {
      return next(err);
    });
});


router.get('/first/:firstname', (req, res, next) => {
  var name = req.params.firstname  
  db.getPlayerByFirstName(name)
  .then((data) => {
    res.send({data: data});
  })
  .catch((err) => {
    console.log(err)
    return next(err);
  });
});


router.get('/last/:lastname', (req, res, next) => {
  var name = req.params.lastname  
  db.getPlayerByLastName(name)
  .then((data) => {
    res.send({data: data});
  })
  .catch((err) => {
    console.log(err)
    return next(err);
  });
});




module.exports = router;