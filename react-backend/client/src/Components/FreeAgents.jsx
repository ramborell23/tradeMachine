import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import moneyFunctions from './moneyFunctions'
import '../Stylesheets/freeAgents.css';
import freeAgentsFunctions from '../Functions/freeAgentsFunctions'

const axios = require("axios");

class FreeAgents extends React.Component {
    constructor() {
        super()
        this.state = {
            arrOfNBATeams: [],
            arrOfFreeAgents: [],
            arrOfFreeAgentChoices : ['','Unrestricted','Restricted','Player','Team'],
            teamArraySelect: '',
            typeOfFreeAgentSelect: '',
            teamState: false,
            teamCap: false,
            teamName: false,
            // teamTradeArr: [],
            // teamLogo: holdlogo,
            // teamName: teamName,
            // teamCap: holdTeamCap,
            // styling: holdStyling
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
            typeOfFreeAgentSelect: e.target.value,
        })
    }

    handleGetTeam = ()=>{
       
            const { teamArraySelect, holdlogo, teamName, holdTeamCap, holdStyling } = this.state
            axios
                .get(`http://localhost:3100/teams/${teamArraySelect}`)
                .then(response => {
                    this.setState({
                        teamState: response.data.data,
                        teamTradeArr: [],
                        // teamLogo: holdlogo,
                        // teamName: response.data.data[0].teamname,
                        // teamCap: response.data.data[0]._2017_18,
                        // styling: holdStyling
                    });
                })
                .catch(err => {
                    console.log("error fetching team");
                    console.log(err);
                });
            axios
                .get(`http://localhost:3100/teams/salary/${teamArraySelect}`)
                .then(response => {
                    console.log('LPLOLOLOLO',response.data.data[0])
                    this.setState({
                        // teamState: response.data.data,
                        // teamTradeArr: [],
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
    }

    render() {
        const { arrOfNBATeams, teamArraySelect, arrOfFreeAgents,arrOfFreeAgentChoices,
            typeOfFreeAgentSelect, teamState, teamCap, teamName} = this.state
        console.log('teamCap', teamCap)
        console.log('Team State',teamState)
        let positionTable = {}
        for(var i = 0; i < teamState.length; i++ ){
            if(positionTable.hasOwnProperty(teamState[i].position)){
                positionTable[teamState[i].position] += 1 
            } else {
                positionTable[teamState[i].position] = 1 
            }
            console.log(teamState[i].position)
        }
        console.log('Our table ',positionTable)
        let newArrOfFreeAgents = freeAgentsFunctions.filterFreeAgents(typeOfFreeAgentSelect, arrOfFreeAgents)

        return (
            <div>
                Free Agents Home
                <br />
                <br />
                <br />
                <div className='free_team_container'>
                    Team Hold
                    
                   {teamState ? <img className='free_team_pic' src={teamState[0].teamlogo} alt='team logo'/>:''}
                   <br/>
                   {teamName ? teamName:''}
                   <br/>
                   {teamCap ? `Total of contracts : ${moneyFunctions.moneyFormatter(teamCap)}`:''}
                    <br/>
                    C {' '}:{' '} {positionTable.C}<br/>
                    PF {' '}:{' '} {positionTable.PF}<br/>
                    SF {' '}:{' '} {positionTable.SF}<br/>
                    SG {' '}:{' '} {positionTable.SG}<br/>
                    PG {' '}:{' '} {positionTable.PG}<br/>

                  {teamState ?<div> Highest Paid Player : {teamState[0].player}<img src={teamState[0].photo} alt='player'/></div>: ''}
                </div>

                <div>
                </div>
                <button 
                onClick={this.handleGetTeam}>
                Get Team
                </button>
                <select
                    name='teamArraySelect'
                    onChange={this.handleTeamSelect}>
                    {arrOfNBATeams.map((option, index) => (
                        <option
                            key={index}
                            value={option.abbreviation}>{option.teamname}
                        </option>
                    ))}
                </select>
                Type of Free Agent:
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
                <br />
                <br />
                <div className='main_freeAgents_container'>
                    
                        {newArrOfFreeAgents.map((option, index) => (
                            <label className='freeagent_player' >
                                <img className='freeagent_pic' src={option.photo} alt='player photo' />
                                <h3>{option.player}</h3>{' '}
                                {option.position}{' '}
                                Last Team {' '}: {' '}{option.tm}{' '}
                                Last Contract {' '}: {' '}{moneyFunctions.moneyFormatter2(option._2017_18)}{' '}
                            </label>
                        ))}
                   
                </div>
            </div>
        )
    }
}

export default FreeAgents