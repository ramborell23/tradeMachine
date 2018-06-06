import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import moneyFunctions from './moneyFunctions'
import freeAgentsFunctions from '../Functions/freeAgentsFunctions'

const FreeAgentsList = ({  arrOfNBATeams, teamArraySelect, arrOfFreeAgents, arrOfFreeAgentChoices,
    typeOfFreeAgentSelect, teamState, teamCap, teamName, arrOfPositions, freeAgentPositionSelect,
    teamDraftPicks, arrOfTeamAssetsChoices, teamAssetsSelect  }) => {
    let newArrOfFreeAgents = freeAgentsFunctions.filterFreeAgents(typeOfFreeAgentSelect, arrOfFreeAgents)
    newArrOfFreeAgents = freeAgentsFunctions.filterFreeAgentsByPosition(freeAgentPositionSelect, newArrOfFreeAgents)
    
    // const teamUpcomingFreeAgents = (arrofPlayers) => {
    //     let freeAgents = arrofPlayers.filter(player => {
    //         return player._2018_19 === null
    //     })
    //     return freeAgents
    // }
   
    let teamAssets = []
    function setTeamAssets(teamAssetsSelect) {
    }
    if (teamAssetsSelect === 'Team Draft picks') {
        teamAssets = teamDraftPicks
    } else if (teamAssetsSelect === 'Upcoming Free Agents') {
        teamAssets = freeAgentsFunctions.teamUpcomingFreeAgents(teamState)
    }
    // setTeamAssets(teamAssetsSelect)
    console.log('teamAssetsSelect', teamAssetsSelect)
    console.log('e.target.value', )
    console.log('teamAssets', teamAssets)
    console.log('teamDraftPicks', teamDraftPicks)
    // console.log('teamUpcomingFreeAgents(teamState)', freeAgentsFunctions.teamUpcomingFreeAgents(teamState))

    const playersUnderContractNextYear = (arrofPlayers) => {
        let playersUnderContract = arrofPlayers.filter(player => {
            return player._2018_19 !== null
        })
        return playersUnderContract
    }
    // console.log('NOUN', teamState[0]['abbreviation'])
    // for (var i = 0; i < playersUnderContractNextYear(teamState).length; i++) {            console.log('LOGOGG', playersUnderContractNextYear(teamState)[i])
    //     let objForChart = {
    //         name: playersUnderContractNextYear(teamState)[i].player,
    //         value: playersUnderContractNextYear(teamState)[i]._2018_19,
    //     }
    //     chartData.push(objForChart)
    // }
    let data = []
    return (
        <div className='lol' >
            {/* Free Agents Home */}
            {/* <div className='free_team_container'> */}

                <div>
                    {/* <button
                        onClick={this.handleGetTeam}>
                        Get Team
            </button> */}
                    {/* <select
                        name='teamArraySelect'
                        onChange={this.handleTeamSelect}>
                        {arrOfNBATeams.map((option, index) => (
                            <option
                                key={index}
                                value={option.abbreviation}>{option.teamname}
                            </option>
                        ))}
                    </select> */}
                    {/* <div className={teamState.abbriviation !== 'Home' ? `free_team_container2 maincolor${teamState[0]['abbreviation']}` : 'free_team_container'}>
                        {teamState.length === 0 ? <img className='free_team_pic' src={teamState[0].teamlogo} alt='team logo' /> : ''}
                        {' '}
                        {teamCap ? `Total of contracts : ${moneyFunctions.moneyFormatter(teamCap)}` : ''}
                        {' '}
                        {teamName ? teamName : ''}
                        <br />

                        <div className='free_team_info_container'>
                            <select
                                name='teamAssetsSelect'
                                onChange={this.handleAssets}>
                                {arrOfTeamAssetsChoices.map((option, index) => (
                                    <option
                                        key={index}
                                        value={option}>{option}
                                    </option>
                                ))}
                            </select>
                            <ul>
                                n
                                {teamAssets.map(option => {
                                    <li>
                                        {option}
                                    </li>
                                })}
                            </ul>
                            <br />
                            {teamState ? <div >
                                Upcoming Free Agents{' '}
                                {freeAgentsFunctions.teamUpcomingFreeAgents(teamState).map(player => (
                                    <div>
                                        {player.player}
                                    </div>
                                ))}
                            </div> : ''}

                            {teamState.length !== 3 ? <div className='highest_paid_div'> Highest Paid Players:<br /> {teamState[0].player}<img className='free_highest_paid' src={teamState[0].photo} alt='player' /><br />
                                {teamState[1].player}<img className='free_highest_paid' src={teamState[1].photo} alt='player' /><br />
                                {teamState[2].player}<img className='free_highest_paid' src={teamState[2].photo} alt='player' /></div> : ''}
                            <br />
                            <br />
                        </div>
                    </div> */}
                </div>

            {/* </div> */}
            <div>
            </div>

            {/* Type of Free Agent:
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
            {''}Select Position{' '}
            <select
                name='freeAgentPositionSelect'
                onChange={this.handleTypeOfFreeAgentSelect}>
                {arrOfPositions.map((option, index) => (
                    <option
                        key={index}
                        value={option}>{option}
                    </option>
                ))}
            </select> */}

            <div className='main_freeAgents_container'>

                {newArrOfFreeAgents.map((option, index) => (
                    <label className='freeagent_player' >
                        <img className='freeagent_pic' src={option.photo} alt='player photo' />
                        <Link to={`/freeagents/${option.player}`}> <h3>{option.player}</h3>{' '}</Link>
                        {option.position}{' '}
                        Last Team {' '}: {' '}{option.tm}{' '}
                        Last Contract {' '}: {' '}{moneyFunctions.moneyFormatter2(option._2017_18)}{' '}
                    </label>
                ))}

            </div>
            <Switch>
                <Route exact path="/freeagents/:player" render={this.renderDogWithBreed} />
            </Switch>
        </div>
    )
}

export default FreeAgentsList;
