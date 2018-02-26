const pgp = require('pg-promise')({});

const db = pgp("postgres://localhost/nba");
var word ;

// function nameCheck(next) {
//     var next = location.split(' ')
//     var copy = location
//     var word;
//     if (next.length === 2) {
//         var beginning = next[0][0].toUpperCase() + next[0].slice(1)
//         var ending = next[1][0].toUpperCase() + next[1].slice(1)
//         word = `${beginning} ${ending}`
//     }else {
//         next.join('')
//         word = copy[0].toUpperCase() + copy.slice(1).toLowerCase()
//     }
// }

//PLAYERS
function getAllPlayers() {
    return db.any('select * from players')
}

function getPlayerByFirstName(firstname) {
    firstname = firstname[0].toUpperCase() + firstname.slice(1).toLowerCase()
    console.log(firstname)
    return db.many('SELECT * FROM players where firstname=$1', [firstname])
}
function getPlayerByLastName(lastname) {
    lastname = lastname[0].toUpperCase() + lastname.slice(1).toLowerCase()
    console.log(lastname)
    return db.many('SELECT * FROM players where lastname=$1', [lastname])
}

function getPlayerWithName(firstname) {
    firstname = firstname[0].toUpperCase() + firstname.slice(1).toLowerCase()
    var lastname = firstname
    console.log(firstname)
    console.log(lastname)
    return db.many(`SELECT * FROM players WHERE firstname LIKE %firstname=$1% OR lastname LIKE %lastname=$2%`, [firstname, lastname])
}

//TEAMS

function getAllTeams() {
    return db.any('select * from teams')
}

function getTeamByCityName(location) {
    location = location[0].toUpperCase() + location.slice(1).toLowerCase()
    console.log(location)
    return db.many('SELECT * FROM teams where location=$1', [location])
}

function getTeamByTeamName(name) {
    name = name[0].toUpperCase() + name.slice(1).toLowerCase()
    console.log(name)
    return db.many('SELECT firstname,lastname,teamname,playerid, teamlogo FROM players JOIN teams ON players.teamid=teams.teamid where simplename=$1', [name])
}

function getPlayersByTeam(location) {
    var next = location.split(' ')
    var copy = location
    var word;
    if (next.length === 2) {
        var beginning = next[0][0].toUpperCase() + next[0].slice(1)
        var ending = next[1][0].toUpperCase() + next[1].slice(1)
        word = `${beginning} ${ending}`
    }else {
        next.join('')
        word = copy[0].toUpperCase() + copy.slice(1).toLowerCase()
    }
    return db.many('SELECT firstname,lastname,teamname,playerid FROM players JOIN teams ON players.teamid=teams.teamid where location=$1', [word])
}

module.exports = {
    //Player Functions
    getAllPlayers,
    getPlayerByFirstName,
    getPlayerWithName,
    getPlayerByLastName,
    //Team Functions
    getAllTeams,
    getTeamByCityName,
    getPlayersByTeam,
    getTeamByTeamName,

};