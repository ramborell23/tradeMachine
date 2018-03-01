

import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
// import FanDuel from './FanDuel'
// import DraftKings from './DraftKings'
// import NBA from './NBA'
import TeamBoard from './teamBoard'
import TeamBoard2 from './teamBoard2'
import TradeList from './tradeList'
import './calc.css';

const axios = require("axios");

const nameJoinForFetch = teamStateName => {
    const newName = teamStateName.split(' ').join('')
    return newName
};

const teams = {
    AtlantaHawks: 1610612737,
    BostonCeltics: 1610612738,
    BrooklynNets: 1610612751,
    CharlotteHornets: 1610612766,
    ChicagoBulls: 1610612741,
    ClevelandCavelers: 1610612739,
    DallasMavericks: 1610612742,
    DenverNuggets: 1610612743,
    DetroitPistons: 1610612765,
    GoldenStateWarriors: 1610612744,
    HoustonRockets: 1610612745,
    IndianaPacers: 1610612754,
    LosAngelesClippers: 1610612746,
    LosAngelesLakers: 1610612746,
    MemphisGrizzles: 1610612763,
    MiamiHeat: 1610612748,
    MilwaukeeBucks: 1610612749,
    MinniesotaTimberwolves: 1610612750,
    NewOrleansPelicans: 1610612740,
    NewYorkKnicks: 1610612752,
    OklahomaCityThunder: 1610612760,
    OrlandoMagic: 1610612753,
    Philedelphia76ers: 1610612755,
    PhoenixSuns: 1610612756,
    PortlandTrailBlazers: 1610612757,
    SacrementoKings: 1610612756,
    SanAntonioSpurs: 1610612759,
    TorontoRaptors: 1610612761,
    UtahJazz: 1610612762,
    WashingtonWizards: 1610612764,
};

class Calc extends React.Component {
    constructor() {
        super()
        this.teamsArray = ['',
            'Atlanta Hawks',
            'Boston Celtics',
            'Brooklyn Nets',
            'Charlotte Hornets',
            'Chicago Bulls',
            'Cleveland Cavelers',
            'Dallas Mavericks',
            'Denver Nuggets',
            'Detroit Pistons',
            'Golden State Warriors',
            'Houston Rockets',
            'Indiana Pacers',
            'Los Angeles Clippers',
            'Los Angeles Lakers',
            'Memphis Grizzles',
            'Miami Heat',
            'Milwaukee Bucks',
            'Minniesota Timberwolves',
            'New Orleans Pelicans	',
            'New York Knicks',
            'Oklahoma City Thunder',
            'Orlando Magic',
            'Philadelphia 76ers',
            'Phoenix Suns',
            'Portland Trail Blazers',
            'Sacramento Kings',
            'San Antonio Spurs',
            'Toronto Raptors',
            'Utah Jazz',
            'Washington Wizards',
        ]

        this.names = ["FanDuel", "DraftKings", "NBA"]
        this.state = {
            modeState: '',
            // teamState: '',
            // teamState2: '',
            teamArraySelect: '',
            teamArraySelect2: '',
            teamState: [],
            teamState2: [],
            playerSelect: '',
            teamTradeArr: [],
            teamTradeArr2: [],
            users: [],
        }
        this.teamsArray2 = this.teamsArray
    }

    componentDidMount() {
        fetch('http://localhost:3100/players/all')
          .then(res => res.json())
          .then((users) => {
              console.log(users.data)
            let data = users.data;
            this.setState({ users: data })}
            
          );
        //   console.log("Right Place")
          console.log("BIG FUCKING PROBLEM 1")
      }
    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleBrandSelection = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRemoveFromList = e => {
        const { teamTradeArr2 } = this.state
        let place = e.target.id
        teamTradeArr2.splice(place, 1)
        this.setState({
            teamTradeArr2: [...teamTradeArr2]
        })
    }
    handleAddToTrade = e => {
        const { teamState, teamTradeArr } = this.state
        console.log('Team Trade 2', teamState)
        let player = teamState[e.target.value]
        // console.log(teamTradeArr2)

        if (teamTradeArr) {
            console.log('76t8tfghjvkgjkg8yi')
          
            console.log(teamTradeArr, "<======== JUST CHECKING ")
            this.setState({
                teamTradeArr: [...teamTradeArr, player]
            })
        }
        console.log('Being Traded:', this.state.teamTradeArr2)

    }
    handleAddToTrade2 = e => {
        const { teamState2, teamTradeArr2 } = this.state
        console.log('Team Trade 2', teamState2)
        let player = teamState2[e.target.value]
        // teamTradeArr2.push(player)
        console.log('Team Trade 34342', teamState2)
        console.log('Check this out ', typeof player)
        console.log('Check this out 2 ', player)
        console.log('pop:    ', teamState2[player])
        // console.log(teamTradeArr2)

        if (teamTradeArr2) {
            for (var i = 0; i < teamTradeArr2.length; i++) {
                console.log('II', teamTradeArr2[i][teamTradeArr2.length - 1])
                console.log('popopoopopopopopop')
            }
            console.log(teamTradeArr2, "<======== JUST CHECKING ")
            this.setState({
                teamTradeArr2: [...teamTradeArr2, player]
            })
        }
        console.log('Being Traded:', this.state.teamTradeArr2)

    }

    getTeamRoster = () => {
        const { teamArraySelect } = this.state
        axios
            .get(`https://stats.nba.com/stats/commonteamroster/?Season=2017-18&TeamID=${teams[nameJoinForFetch(teamArraySelect)]}`)
            .then(response => {
                this.setState({
                    teamState: response.data.resultSets[0].rowSet,
                    teamTradeArr: []
                });
            })
            .catch(err => {
                console.log("error fetching image");
                console.log(err);
            });
    };
    getTeamRoster2 = () => {
        const { teamArraySelect2 } = this.state
        axios
            .get(`https://stats.nba.com/stats/commonteamroster/?Season=2017-18&TeamID=${teams[nameJoinForFetch(teamArraySelect2)]}`)
            .then(response => {
                this.setState({
                    teamState2: response.data.resultSets[0].rowSet,
                    teamTradeArr2: []
                });
            })
            .catch(err => {
                console.log("error fetching image");
                console.log(err);
            });
    };

    render() {
        const { modeState, teamState, teamArraySelect, teamArraySelect2, playerSelect, teamState2, teamTradeArr, teamTradeArr2,users } = this.state
        console.log(modeState)
        console.log('Trade Bait     ', teamTradeArr)
        console.log("Team  ARR ", teamState)
        console.log("Users ==>>>>", users)

        return (
            <div className='page'>
                <div className='main_container'><br />
                    <label>
                        <button
                            value='NBA'
                            onClick={this.getTeamRoster}
                        >NBA
                                </button>
                        Team 1<br />
                    </label>
                    <TeamBoard
                        teamsArr={this.teamsArray}
                        teamState={teamState}
                        // name='teamArraySelect2'
                        value={teamArraySelect}
                        handleChange={this.handleBrandSelection}
                        handleChange2={this.handleAddToTrade}
                    />
                </div>
                <div className='main_container'>
                    <TradeList
                        teamTradeArr={teamTradeArr}
                        handleCloseButton={this.handleRemoveFromList}
                    />
                </div>
                <div className='main_container'>
                    <TradeList
                        teamTradeArr={teamTradeArr2}
                        handleCloseButton={this.handleRemoveFromList}
                    />
                </div>
                <div className='main_container'><br />
                    <label>
                        <button
                            value='NBA'
                            onClick={this.getTeamRoster2}
                        >
                            NBA
                        </button>
                        Team 2<br />
                    </label>
                    <TeamBoard2
                        teamsArr={this.teamsArray}
                        teamState={teamState2}
                        // name='teamArraySelect2'
                        value={teamArraySelect2}
                        handleChange={this.handleBrandSelection}
                        handleChange2={this.handleAddToTrade2}
                    />
                    {/* <br />
                    <br />
                    <br />
                    <br /> */}
                </div>
            </div>

        )
    }
}

export default Calc



/*
THINGS TO ADD:

Salary thru SQL
Complete trade feature 

Possible Adds:
Team cap
Get More Team Info
*/