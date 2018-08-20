const pgp = require('pg-promise')({});

const db = pgp("postgres://localhost/nba");
const puppeteer = require("puppeteer");

var word;

function getAllPlayers() {
    return db.any('select * from players')
}

function getAllMoney() {
    return db.any('select * from player_salaries')
}

function getSalariesByTeam(teamAbbriv) {
    let temp = teamAbbriv.toUpperCase()
    console.log(temp)
    return db.many('SELECT * FROM  player_salaries WHERE tm=$1', [temp])
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


function getPlayerContracts(playerName) {
    console.log(playerName)
    return db.any('select * from player_salaries WHERE player=$1', [playerName])
}

//TEAMS

function getAllTeams() {
    return db.any('SELECT abbreviation, teamname, teamid, _2017_18 ,_2018_19, teamlogo FROM  teams JOIN team_salaries ON teams.teamname = team_salaries.tm')

}
function getTeamCap(teamname) {
    return db.any('SELECT abbreviation, teamname, teamid, _2017_18 ,_2018_19, teamlogo FROM  teams JOIN team_salaries ON teams.teamname = team_salaries.tm WHERE abbreviation = $1', [teamname])
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
    } else {
        next.join('')
        word = copy[0].toUpperCase() + copy.slice(1).toLowerCase()
    }
    return db.many('SELECT firstname,lastname,teamname,playerid FROM players JOIN teams ON players.teamid=teams.teamid where location=$1', [word])
}

function getTeamDraftPicks(teamName) {
    return db.many('SELECT * FROM draft_picks WHERE current_owner =$1', [teamName])
}
function getTeamInfo(teamName) {
    return db.many('SELECT * FROM teams JOIN teamrecords ON teams.abbreviation=teamrecords.abbreviation WHERE teams.teamname =$1', [teamName])
}

function getAllDraftPicks() {
    return db.many('SELECT * FROM draft_picks')
}


//Free Agent Queries
function getPotentialFreeAgents() {
    return db.many(`SELECT * FROM player_salaries WHERE _2018_19 IS  NULL OR option_year = '2018'`)
}

function getSpecificTeam(teamName) {
    return db.many(`SELECT * FROM teams JOIN player_salaries ON teams.abbreviation=player_salaries.tm WHERE abbreviation = $1`, [teamName])
}
function getFreeAgentInfo(playerName) {
    return db.many(`SELECT * FROM player_salaries WHERE player = $1`, [playerName])
}

// Draft Queries
function getDraftOrder() {
    return db.many(`SELECT * FROM draft_order`)
}
function getAllDraftProspects(playerName) {
    return db.many(`SELECT * FROM draft_prospects`)
}




//STATS TEST 
async function scrapeStats() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.basketball-reference.com/leagues/NBA_2018_per_game.html');
    await page.screenshot({ path: 'example.png' });

    const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('table tr'))
        return tds.map(td => td.innerText)
    });
    await browser.close();
    return data
}


//

module.exports = {
    //Player Functions
    getAllPlayers,
    getPlayerByFirstName,
    getPlayerWithName,
    getPlayerByLastName,
    getPlayerContracts,

    //Team Functions
    getAllTeams,
    getTeamInfo,
    getTeamByCityName,
    getPlayersByTeam,
    getTeamByTeamName,
    getAllMoney,
    getTeamCap,
    getSalariesByTeam,
    getTeamDraftPicks,
    getAllDraftPicks,

    // Free Agent functions
    getPotentialFreeAgents,
    getSpecificTeam,
    getFreeAgentInfo,

    getDraftOrder,
    getAllDraftProspects,

    //Stats test
    scrapeStats
};