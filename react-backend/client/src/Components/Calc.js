

import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
// import FanDuel from './FanDuel'
// import DraftKings from './DraftKings'
// import NBA from './NBA'
import TeamBoard from './teamBoard'
import TeamBoard2 from './teamBoard2'
import TradeList from './tradeList'
import TradeList2 from './tradeList'
import './calc.css';
import moneyFunctions from './moneyFunctions'



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
    SacramentoKings: 1610612756,
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
            'New Orleans Pelicans',
            'New York Knicks',
            'Oklahoma City Thunder',
            'Orlando Magic',
            'Philedelphia 76ers',
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
            logo: [],
            //
            teamName : '',
            teamLogo : 'http://logok.org/wp-content/uploads/2015/01/NBA-logo-880x655.png',
            holdTeamCap:'',
            holdName : '',
            holdlogo:'',
            teamCap:'',

            holdTeamCap2:'',
            holdName2 : '',
            holdlogo2:'',
            teamCap2:'',
            team2Name : '',
            team2Logo : 'http://logok.org/wp-content/uploads/2015/01/NBA-logo-880x655.png',
        }
        this.teamsArray2 = this.teamsArray
    }

    componentDidMount() {
        fetch('http://localhost:3100/players/all')
            .then(res => res.json())
            .then((users) => {
                console.log(users.data)
                let data = users.data;
                this.setState({ users: data })
            }
            );
        fetch('http://localhost:3100/teams')
            .then(res => res.json())
            .then((users) => {
                let data = users.data;
                this.setState({ logo: ['', ...data] })
            }
            );
    }



    handleInputteamArraySelect = e => {
        const {logo} = this.state
        const rightPhoto = logo.filter(team =>{
            if(team.abbreviation === e.target.value){
                console.log(team)
                this.setState({
                    teamArraySelect: e.target.value,
                    holdName : team.teamname,
                    holdlogo : team.teamlogo,
                    holdTeamCap:team._2017_18

                })
            } else{
                console.log("WOWNOT")
            }
            console.log(this.state.teamLogo)
        })
    }
    handleInputteamArraySelect2 = e => {
        const {logo} = this.state
        const rightPhoto = logo.filter(team =>{
            if(team.abbreviation === e.target.value){
                console.log(team)
                this.setState({
                    teamArraySelect2: e.target.value,
                    holdName2 : team.teamname,
                    holdlogo2 : team.teamlogo,
                    holdTeamCap2:team._2017_18
                })
            } else{
                console.log("WOWNOT")
            }
            console.log(this.state.team2Logo)
        })
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
        const { teamTradeArr } = this.state
        let place = e.target.id
        teamTradeArr.splice(place, 1)
        this.setState({
            teamTradeArr: [...teamTradeArr]
        })
    }
    handleRemoveFromList2 = e => {
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
        // console.log('Team Trade 2', teamState2)
        let player = teamState2[e.target.value]
        // // teamTradeArr2.push(player)
        // console.log('Team Trade 34342', teamState2)
        // console.log('Check this out ', typeof player)
        // console.log('Check this out 2 ', player)
        // console.log('pop:    ', teamState2[player])
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
        const { teamArraySelect,holdlogo,teamName, holdTeamCap } = this.state
        console.log(nameJoinForFetch(teamArraySelect))
        axios
            .get(`http://localhost:3100/players/salary/${teamArraySelect}`)
            .then(response => {
                this.setState({
                    teamState: response.data.data,
                    teamTradeArr: [],
                    teamLogo: holdlogo,
                    teamName: teamName,
                    teamCap:holdTeamCap,
                });
            })
            .catch(err => {
                console.log("error fetching image");
                console.log(err);
            });
    };

    getTeamRoster2 = () => {
        const { teamArraySelect2 ,holdlogo2, team2Name, holdTeamCap2} = this.state
        axios
            .get(`http://localhost:3100/players/salary/${teamArraySelect2}`)
            .then(response => {
                console.log('WE HAVE A RESPONSE:===>', response.data)
                this.setState({
                    teamState2: response.data.data,
                    teamTradeArr2: [],
                    team2Logo: holdlogo2,
                    team2Name: team2Name,
                    teamCap2:holdTeamCap2,
                });
            })
            .catch(err => {
                console.log("error fetching image");
                console.log(err);
            });
    };

    render() {
        const { modeState, teamState, teamArraySelect, 
                teamArraySelect2, playerSelect, teamState2, 
                teamTradeArr, teamTradeArr2, users, logo,
                teamName, teamLogo, team2Logo, team2Name , teamCap2, teamCap} = this.state
        console.log("logo ==>>>>", logo)
        console.log("teamArraySelect2 ==>>>>", teamArraySelect2)
        var str = 'abcdefghijkl';
        // console.log(str.match(/.{1,3}/g));
        let cavs = users.filter(person => {
            return person.tm === 'CLE'
        })
        let gsw = users.filter(person => {
            return person.tm === 'GSW'
        })
        console.log(this.state.team2Logo)

        return (
            <div >
            <div className='page'>
                <div className='main_container'><br />
                    <label>
                        <button
                            value='NBA'
                            onClick={this.getTeamRoster}
                            >NBA
                                </button>
                       <br />
                       {/* {teamName}<br /> */}
                            {moneyFunctions.moneyFormatter(teamCap)}<br/>
                        <img className='teamLogo' src={teamLogo} alt='team logo' >
                        </img>
                    </label>
                    <TeamBoard
                        teamsArr={logo}
                        teamState={teamState}
                        // name='teamArraySelect2'
                        value={teamArraySelect}
                        handleChange={this.handleInputteamArraySelect}
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
                    <TradeList2
                        teamTradeArr={teamTradeArr2}
                        handleCloseButton={this.handleRemoveFromList2}
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
                        {team2Name}<br />
                        {moneyFunctions.moneyFormatter(teamCap2)}<br/>
                        <img className='teamLogo' src={team2Logo} alt='team logo' >
                        </img>
                    </label>
                    <TeamBoard2
                        teamsArr={logo}
                        teamState={teamState2}
                        name='teamArraySelect2'
                        value={teamArraySelect2}
                        handleChange={this.handleInputteamArraySelect2}
                        handleChange2={this.handleAddToTrade2}
                    />
                </div>
                <br/>
                
            
            </div>
            <div className='result_div'>
                Here
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