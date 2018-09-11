

import React from 'react';
import TeamBoard from './teamBoard'
import TeamBoard2 from './teamBoard2'
import TradeList from './tradeList'
import TradeList2 from './tradeList'
import Modal from './Modal';
import Modal2 from './Modal2';
import "../SASS/main.css";
import moneyFunctions from './moneyFunctions'
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
Charts(FusionCharts);

// Load module after Highcharts is loaded
// require('highcharts/modules/exporting')(Highcharts);

const axios = require("axios");


class Calc extends React.Component {
    constructor(props) {
        super(props)
        this.names = ["FanDuel", "DraftKings", "NBA"]
        this.state = {
            modeState: '',
            isOpen: false,
            isOpen2: false,
            isOpen3: false,
            playerStats:
                {
                    PtsPerGame: {
                        '#text': 'points per game'
                    },
                    AstPerGame: {
                        '#text': 'points per game'
                    },
                    RebPerGame: {
                        '#text': 'points per game'
                    },

                },
            playerInfo:
                {
                    FirstName: '',
                    LastName: '',
                    Position: '',
                }


            ,
            playerContract: [],
            playerImg: '',
            // teamState: '',
            // teamState2: '',
            teamArraySelect: '',
            teamArraySelect2: '',
            teamState: [],
            teamState2: [],
            teamOneDraftPick: [],
            teamTwoDraftPick: [],
            playerSelect: '',
            teamTradeArr: [],
            teamTradeArr2: [],
            users: [],
            arrOfNBATeams: [],
            //
            teamName: '',
            teamLogo: 'http://logok.org/wp-content/uploads/2015/01/NBA-logo-880x655.png',
            holdTeamCap: '',
            holdName: '',
            holdlogo: '',
            teamCap: '',
            holdStyling: '',
            styling: '',


            holdTeamCap2: '',
            holdName2: '',
            holdlogo2: '',
            holdStyling2: '',
            teamCap2: '',
            team2Name: '',
            team2Logo: 'http://logok.org/wp-content/uploads/2015/01/NBA-logo-880x655.png',
            styling2: '',
        }
        this.teamsArray2 = this.teamsArray
    }

    componentDidMount() {
  
        fetch('http://localhost:3100/teams')
            .then(res => res.json())
            .then((users) => {
                let data = users.data;
                this.setState({ arrOfNBATeams: ['', ...data] })
            }
            );
    }


    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleModal2 = () => {
        this.setState({
            isOpen2: !this.state.isOpen2
        });
    }
    toggleModal3 = () => {
        this.setState({
            isOpen3: !this.state.isOpen3
        });
    }

    handlePlayerStatsAndModal = (e) => {
        const { isOpen2 } = this.state
        this.setState({
            playerImg: e.target.id
        })

        this.getPlayerStats(e) 

        
            setTimeout(function () {
                console.log('Break for Modal to open')
                this.setState({
                    isOpen2: !isOpen2
                });
            }.bind(this), 150)
        
    }

    handlePlayerContractsAndModal = (e) => {
        const { isOpen3 } = this.state
        this.setState({
            playerImg: e.target.id
        })
        this.getPlayerContract(e) 
        
            setTimeout(function () {
                console.log('Break for Modal to open')
                this.setState({
                    isOpen3: !isOpen3
                });
            }.bind(this), 350)
        
    }

    handleInputteamArraySelect = e => {
        const { arrOfNBATeams } = this.state
        const rightPhoto = arrOfNBATeams.filter(team => {
            if (team.abbreviation === e.target.value) {
                this.setState({
                    teamArraySelect: e.target.value,
                    holdName: team.teamname,
                    holdlogo: team.teamlogo,
                    holdTeamCap: team._2017_18,
                    holdStyling: team.abbreviation
                })
            } else {
                console.log("WOWNOT")
            }
        })
    }

    handleInputteamArraySelect2 = e => {
        const { arrOfNBATeams } = this.state
        const rightPhoto = arrOfNBATeams.filter(team => {
            if (team.abbreviation === e.target.value) {
                this.setState({
                    teamArraySelect2: e.target.value,
                    holdName2: team.teamname,
                    holdlogo2: team.teamlogo,
                    holdTeamCap2: team._2017_18,
                    holdStyling2: team.abbreviation
                })
            } else {
                console.log("WOWNOT")
            }
        })
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleRemoveFromList = e => {
        const { teamTradeArr } = this.state
        let place = e.target.id
        console.log('place', place)
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
        let player = teamState[e.target.value]
        if (teamTradeArr.includes(player)) {
            console.log('Player is already being traded')
        } else if (player === undefined) {
            console.log('Player is undefined')
        } else {
            this.setState({
                teamTradeArr: [...teamTradeArr, player]
            })
        }
    }


    handleAddToTrade2 = e => {
        const { teamState2, teamTradeArr2 } = this.state
        let player = teamState2[e.target.value]
        if (teamTradeArr2.includes(player)) {
            console.log('Player is already being traded')
        } else if (player === undefined) {
        } else {
            this.setState({
                teamTradeArr2: [...teamTradeArr2, player]
            })
        }
    }

    getPlayerStats = (e) => {
        let player = e.target.name
        let config = {
            headers: { "Authorization": "Basic " + btoa("rell23" + ":" + "Great22!") }
        };
        let playerName = player.replace(/[^a-zA-Z ]/g, "")
        playerName = playerName.split(' ').join('-').toLowerCase()
        console.log(playerName)

        axios
            .get(`https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/cumulative_player_stats.json?player=${playerName}`, config)
            .then(response => {
                this.setState({
                    playerStats: response.data.cumulativeplayerstats.playerstatsentry[0].stats,
                    playerInfo: response.data.cumulativeplayerstats.playerstatsentry[0].player,
                });
            })
            .catch(err => {
                console.log("error fetching stats");
                console.log(err);
            });
    };

    getPlayerContract = (e) => {
        let playerName = e.target.name
        console.log('We have our name here', playerName)
        axios
            .get(`http://localhost:3100/players/contract/${playerName}`)
            .then(response => {
                this.setState({
                    playerContract: response.data.data[0],
                });
            })
            .catch(err => {
                console.log("error fetching stats");
                console.log(err);
            });
    };

    getTeamRoster = () => {
        const { teamArraySelect, holdlogo, teamName, holdTeamCap, holdStyling } = this.state
        axios
            .get(`http://localhost:3100/players/salary/${teamArraySelect}`)
            .then(response => {
                this.setState({
                    teamState: response.data.data,
                    teamTradeArr: [],
                    teamLogo: holdlogo,
                    teamName: teamName,
                    teamCap: holdTeamCap,
                    styling: holdStyling
                });
            })
            .catch(err => {
                console.log("error fetching team");
                console.log(err);
            });
        axios
            .get(`http://localhost:3100/teams/draftpicks/${teamArraySelect}`)
            .then(response => {
                this.setState({
                    teamOneDraftPick: response.data.data,
                });
            })
            .catch(err => {
                console.log("error fetching team");
                console.log(err);
            });

    };

    getTeamDraftPicks = () => {
        const { teamArraySelect } = this.state
        console.log(teamArraySelect)
        axios
            .get(`http://localhost:3100/teams/draftpicks/${teamArraySelect}`)
            .then(response => {
                this.setState({
                    teamOneDraftPick: response.data.data,
                });
                console.log('First Draft pics', this.state.teamOneDraftPick)
            })
            .catch(err => {
                console.log("error fetching team");
                console.log(err);
            });
    };

    getTeamRoster2 = () => {
        const { teamArraySelect2, holdlogo2, team2Name, holdTeamCap2, holdStyling2 } = this.state
        axios
            .get(`http://localhost:3100/players/salary/${teamArraySelect2}`)
            .then(response => {
                this.setState({
                    teamState2: response.data.data,
                    teamTradeArr2: [],
                    team2Logo: holdlogo2,
                    team2Name: team2Name,
                    teamCap2: holdTeamCap2,
                    styling2: holdStyling2
                });
            })
            .catch(err => {
                console.log("error fetching team");
                console.log(err);
            });
    };


    render() {
        const {  teamState, teamArraySelect,
            teamArraySelect2, teamState2,
            teamTradeArr, teamTradeArr2, arrOfNBATeams,
            teamLogo, team2Logo, team2Name,
            teamCap2, teamCap, styling2, styling, playerImg, playerContract } = this.state
        const softCap = 99000000

        let diffInMoneyAftTrade = moneyFunctions.capNumberAfterTrade(moneyFunctions.moneyFormatterForCapNumber(teamCap, softCap), moneyFunctions.totalOfContractsNumber(teamTradeArr), moneyFunctions.totalOfContractsNumber(teamTradeArr2))
        let diffInMoneyAftTrade2 = moneyFunctions.capNumberAfterTrade(moneyFunctions.moneyFormatterForCapNumber(teamCap2, softCap), moneyFunctions.totalOfContractsNumber(teamTradeArr2), moneyFunctions.totalOfContractsNumber(teamTradeArr))
        let validTrade = moneyFunctions.tradeApproval(teamTradeArr, teamTradeArr2, teamCap, teamCap2)
        let deniedTeam = ' ';
        function showTeamThatsDenied() {
            if (((moneyFunctions.totalOfContractsNumber(teamTradeArr) * 1.25 + 100000) - moneyFunctions.totalOfContractsNumber(teamTradeArr2)) < 0) {
                deniedTeam = teamArraySelect
                console.log('denied 404', deniedTeam)
            } else if (((moneyFunctions.totalOfContractsNumber(teamTradeArr2) * 1.25 + 100000) - moneyFunctions.totalOfContractsNumber(teamTradeArr)) < 0) {
                deniedTeam = teamArraySelect2
                console.log('denied¿Team 404', deniedTeam)
            } else {
                deniedTeam = ''
            }
        }
        showTeamThatsDenied()
        let approvalMessage = validTrade === `` ? 'League Approved!!!!!!!!' : 'League Denied!!!!!!!!'
        console.log('denied¿Team', deniedTeam)
        console.log('deniedTeam3333', teamArraySelect2)

        switch (validTrade) {
            case 'Trade Approved!!!!!!!!':
                validTrade = <h3 className='approval'>Appoved!!! </h3>
                break;
            case 'Trade Declined!!!!!!!!':
                validTrade = <h3 className='declined'> Declined!!!!</h3>
                break;
            default:
                break;
        }

        // Test TRADE LOGIC


        return (
            <div >
                <div className='page'>
                    <div className={'maincolor' + styling}><br />
                        <label>
                            <br />
                            Cap Space Remaining<br /> {moneyFunctions.moneyFormatterForCapString(teamCap, softCap)}<br />
                            <img className='teamLogo' src={teamLogo} alt='team logo' >
                            </img>
                        </label>
                        <TeamBoard
                            teamsArr={arrOfNBATeams}
                            teamState={teamState}
                            value={teamArraySelect}
                            handleChange={this.handleInputteamArraySelect}
                            handleChange2={this.handleAddToTrade}
                            handleToGetTeam={this.getTeamRoster}
                            handleToGetTeamDraftPIcks={this.getTeamDraftPicks}
                            getPlayerStats={this.handlePlayerStatsAndModal}
                            getPlayerSalaries={this.handlePlayerContractsAndModal}
                        />
                    </div>
                    <div className='main_container'>
                        {/* {teamTradeArr.length === 0 ? '' : `Trading to ${teamTradeArr2.length===0 ? '':teamTradeArr[0].tm}`} */}
                        {teamTradeArr.length === 0 ? '' : `${teamTradeArr2.length === 0 ? '' : 'Trading to ' + teamTradeArr2[0].tm}`}
                        <TradeList
                            teamTradeArr={teamTradeArr}
                            handleCloseButton={this.handleRemoveFromList}
                        />
                    </div>
                    <div className='main_container'>
                        {teamTradeArr2.length === 0 ? '' : `${teamTradeArr.length === 0 ? '' : 'Trading to ' + teamTradeArr[0].tm}`}
                        <TradeList2
                            teamTradeArr={teamTradeArr2}
                            handleCloseButton={this.handleRemoveFromList2}
                        />
                    </div>
                    <div className={'maincolor' + styling2}><br />
                        <label>
                            {team2Name}<br />
                            Cap Space Remaining<br /> {moneyFunctions.moneyFormatterForCapString(teamCap2, softCap)}<br />
                            <img className='teamLogo' src={team2Logo} alt='team logo' />
                        </label>
                        <TeamBoard2
                            teamsArr={arrOfNBATeams}
                            teamState={teamState2}
                            name='teamArraySelect2'
                            value={teamArraySelect2}
                            handleChange={this.handleInputteamArraySelect2}
                            handleChange2={this.handleAddToTrade2}
                            handleToGetTeam={this.getTeamRoster2}
                            getPlayerStats={this.handlePlayerStatsAndModal}
                            getPlayerSalaries={this.handlePlayerContractsAndModal}
                        />
                    </div>
                    <br />
                </div>
                <div className='result_div'>

                </div>
                <div className='trade_button'>
                <button  onClick={this.toggleModal}>
                    Test Trade
                </button>
                </div>
                {/* {(teamTwoTotalContracts * 1.25 + 100000) -  teamOneTotalContracts} */}
                <Modal show={this.state.isOpen}
                    onClose={this.toggleModal}>
                    <br />

                    {teamTradeArr.length === 0 || teamTradeArr2.length === 0 ? '' : approvalMessage}
                    <br/>
                    {deniedTeam}{' '}{validTrade}<br />
                    <span className='modal_text'>{teamArraySelect}   ------   {teamArraySelect2}</span><br />
                    <span className='modal_text'>{moneyFunctions.moneyFormatter2(diffInMoneyAftTrade)}   ------   {moneyFunctions.moneyFormatter2(diffInMoneyAftTrade2)}</span>
                    <br />
                    <br />
                    <br />
                    <div className='modal_trade_container'>
                        <div className='modal_list_one'>
                            <ul>
                                {teamTradeArr.map(player => (
                                    <li className='traded_player_modal'>
                                        {player.player}<img className='modal_trade_photo' src={player.photo} alt='' />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='modal_divider'>
                        <i class="fas fa-arrow-left"></i>
                        <i class="fas fa-arrow-right"></i>
                        </div>
                        <div className='modal_list_two'>
                            <ul>
                                {teamTradeArr2.map(player => (
                                    <li className='traded_player_modal'>
                                        {player.player}<img className='modal_trade_photo' src={player.photo} alt='' />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Modal>
                <Modal2 show={this.state.isOpen2}
                    onClose={this.toggleModal2}>
                    <img className='modal_photo' src={playerImg} alt='Player' /><br />
                    Player Stats:<br />
                    Name : {this.state.playerInfo.FirstName}{' '}{this.state.playerInfo.LastName}<br />
                    Points : {this.state.playerStats.PtsPerGame['#text']}<br />
                    Assists : {this.state.playerStats.AstPerGame['#text']}<br />
                    Rebounds : {this.state.playerStats.RebPerGame['#text']}<br />
                </Modal2>


                <Modal2
                    className='contract_modal'
                    show={this.state.isOpen3}
                    onClose={this.toggleModal3}>
                    <img className='modal_photo' src={playerImg} alt='Player' /><br />
                    <div className='player_chart'>
                        <label className='player_chart'>
                            {this.state.playerContract.player}'s Remaining Contract:
                        <br />
                            <br />
                            {playerContract._2017_18 === null ? '' : <label>2017-18 : {moneyFunctions.moneyFormatter2(playerContract._2017_18)}<br /></label>}
                            {playerContract._2018_19 === null ? '' : <label>2018-19 : {moneyFunctions.moneyFormatter2(playerContract._2018_19)}<br /></label>}
                            {playerContract._2019_20 === null ? '' : <label>2019-20 : {moneyFunctions.moneyFormatter2(playerContract._2019_20)}<br /></label>}
                            {playerContract._2020_21 === null ? '' : <label>2020-21 : {moneyFunctions.moneyFormatter2(playerContract._2020_21)}<br /></label>}
                            {playerContract._2021_22 === null ? '' : <label>2021-22 : {moneyFunctions.moneyFormatter2(playerContract._2021_22)}<br /></label>}
                            {playerContract.option_ === null ? '' : <label>Option : {playerContract.option_}<br /></label>}
                            {playerContract.option_year === null ? '' : <label>Option Year: {playerContract.option_year}<br /></label>}
                        </label>

                        <br />
                        <br />

                    </div>
                </Modal2>
                <br />

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