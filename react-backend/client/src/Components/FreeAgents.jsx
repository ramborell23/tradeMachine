import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import moneyFunctions from './moneyFunctions'
import freeAgentsFunctions from '../Functions/freeAgentsFunctions'
import '../Stylesheets/freeAgents.css';
import '../Stylesheets/western.css';
import '../Stylesheets/eastern.css';
import PlayerPage from "./playerPage";
import FreeAgentsList from "./FreeAgentsList";
import { LineChart, PieChart, Line, Pie, Legend, Tooltip } from 'recharts';
// const { PieChart,  } = Recharts;
// var PieChart = require("react-chartjs").Line;
// var myPieChart = new Chart(ctx[0]).Pie(data, options);

const axios = require("axios");

class FreeAgents extends React.Component {
    constructor() {
        super()
        this.state = {
            arrOfNBATeams: [],
            arrOfFreeAgents: [],
            arrOfFreeAgentChoices: ['', 'Unrestricted', 'Restricted', 'Player', 'Team'],
            typeOfFreeAgentSelect: '',
            arrOfPositions: ['', 'PG', 'SG', 'SF', 'PF', 'C'],
            freeAgentPositionSelect: '',
            teamArraySelect: '',
            teamState: [{ abbriviation: 'Home', player: '' }, { abbriviation: 'Home', player: '' }, { abbriviation: 'Home', player: '' }],
            teamCap: false,
            teamName: false,
            arrOfTeamAssetsChoices: ['', 'Team Draft picks', 'Upcoming Free Agents'],
            teamDraftPicks: [],
            teamAssetsSelect: '',

            // teamAssets:[]

        }
    }

    componentDidMount() {
        fetch('http://localhost:3100/teams')
            .then(res => res.json())
            .then((users) => {
                let data = users.data;
                this.setState({ arrOfNBATeams: ['', ...data] })
            });
        fetch('http://localhost:3100/players/freeAgents')
            .then(res => res.json())
            .then((users) => {
                let data = users.data;
                this.setState({ arrOfFreeAgents: [...data] })
            });
    }
    handleTeamSelect = (e) => {
        const { } = this.state
        this.setState({
            teamArraySelect: e.target.value,
        })
    }
    handleTypeOfFreeAgentSelect = (e) => {
        const { } = this.state
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    handleAssets = (e) => {
        const { teamAssetsSelect } = this.state
        this.setState({
            teamAssetsSelect: e.target.value,
        })
    }

    handleGetTeam = () => {
        const { teamArraySelect, holdlogo, teamName, holdTeamCap, holdStyling, teamDraftPicks } = this.state
        axios
            .get(`http://localhost:3100/teams/${teamArraySelect}`)
            .then(response => {
                this.setState({
                    teamState: response.data.data,
                    teamTradeArr: [],
                });
            })
            .catch(err => {
                console.log("error fetching team");
                console.log(err);
            });
        axios
            .get(`http://localhost:3100/teams/salary/${teamArraySelect}`)
            .then(response => {
                this.setState({
                    teamLogo: response.data.data[0].teamlogo,
                    teamName: response.data.data[0].teamname,
                    teamCap: response.data.data[0]._2017_18,
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
                    // teamState: response.data.data,
                    teamDraftPicks: response.data.data,
                });
            })
            .catch(err => {
                console.log("error fetching team");
                console.log(err);
            });
    }

    renderDogWithBreed = props => {
        const { player } = props.match.params;
        console.log(player)
        return (
            <div>
                {/* <h3>Free Agent Home232</h3> */}
                 
                <PlayerPage
                    player={player}
                />
       </div>

        )
    };

    renderBreeds = () => {
        const { arrOfNBATeams, teamArraySelect, arrOfFreeAgents, arrOfFreeAgentChoices,
            typeOfFreeAgentSelect, teamState, teamCap, teamName, arrOfPositions, freeAgentPositionSelect,
            teamDraftPicks, arrOfTeamAssetsChoices, teamAssetsSelect } = this.state;
        return (
            <div>
                {/* <h2> Free Agents Home </h2> */}
                <FreeAgentsList
                    arrOfNBATeams={arrOfNBATeams}
                    teamArraySelect={teamArraySelect}
                    arrOfFreeAgents={arrOfFreeAgents}
                    arrOfFreeAgentChoices={arrOfFreeAgentChoices}
                    typeOfFreeAgentSelect={typeOfFreeAgentSelect}
                    teamState={teamState}
                    teamCap={teamCap}
                    teamName={teamName}
                    arrOfPositions={arrOfPositions}
                    freeAgentPositionSelect={freeAgentPositionSelect}
                    teamDraftPicks={teamDraftPicks}
                    arrOfTeamAssetsChoices={arrOfTeamAssetsChoices}
                    teamAssetsSelect={teamAssetsSelect}
                />
            </div>
        );
    };


    render() {
        const { breed } = this.props;

        const { arrOfNBATeams, teamArraySelect, arrOfFreeAgents, arrOfFreeAgentChoices,
            typeOfFreeAgentSelect, teamState, teamCap, teamName, arrOfPositions, freeAgentPositionSelect,
            teamDraftPicks, arrOfTeamAssetsChoices, teamAssetsSelect } = this.state
        let newArrOfFreeAgents = freeAgentsFunctions.filterFreeAgents(typeOfFreeAgentSelect, arrOfFreeAgents)
        newArrOfFreeAgents = freeAgentsFunctions.filterFreeAgentsByPosition(freeAgentPositionSelect, newArrOfFreeAgents)
        const teamUpcomingFreeAgents = (arrofPlayers) => {
            let freeAgents = arrofPlayers.filter(player => {
                return player._2018_19 === null
            })
            return freeAgents
        }
        // console.log('teamCap', teamCap)
        // console.log('Team State', teamState)
        // console.log('Team State', teamDraftPicks)
        let teamAssets = []
        function setTeamAssets(teamAssetsSelect) {
        }
        if (teamAssetsSelect === 'Team Draft picks') {
            teamAssets = teamDraftPicks
        } else if (teamAssetsSelect === 'Upcoming Free Agents') {
            teamAssets = teamUpcomingFreeAgents(teamState)
        }
        // setTeamAssets(teamAssetsSelect)
        console.log('teamAssetsSelect', teamAssetsSelect)
        console.log('e.target.value', )
        console.log('teamAssets', teamAssets)
        console.log('teamDraftPicks', teamDraftPicks)
        console.log('teamUpcomingFreeAgents(teamState)', teamUpcomingFreeAgents(teamState))

        const playersUnderContractNextYear = (arrofPlayers) => {
            let playersUnderContract = arrofPlayers.filter(player => {
                return player._2018_19 !== null
            })
            return playersUnderContract
        }
      
        let data = []
        return (
            <div className='free_select_container'>
                {/* <div className='free_select_item'> */}
                <label className='free_select_item free_filter_text'>
                <h2 className=''>2018 Potential Free Agents</h2>
                    <label className=''>Filter By:<br/></label>
                    <br/>
                <label className=''>Type of Free Agent : </label>
                <select
                    name='typeOfFreeAgentSelect'
                    onChange={this.handleTypeOfFreeAgentSelect}>
                    {arrOfFreeAgentChoices.map((option, index) => (
                        <option
                        key={index}
                        value={option}>{option}
                        </option>
                    ))}
                </select>
                <br/>
                {''}Position : {' '}
                <select
                    name='freeAgentPositionSelect'
                    onChange={this.handleTypeOfFreeAgentSelect}>
                    {arrOfPositions.map((option, index) => (
                        <option
                        key={index}
                        value={option}>{option}
                        </option>
                    ))}
                </select>
                    </label>
                    {/* </div> */}

                
                <Switch>
                    <Route exact path="/freeagents" render={this.renderBreeds} />
                    <Route exact path="/freeagents/:player" render={this.renderDogWithBreed} />
                </Switch>
            </div>
        )
    }
}

export default FreeAgents