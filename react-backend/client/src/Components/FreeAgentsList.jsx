import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import moneyFunctions from './moneyFunctions'
import freeAgentsFunctions from '../Functions/freeAgentsFunctions'
import PlayerPage from "./playerPage";

const FreeAgentsList = ({  arrOfNBATeams, teamArraySelect, arrOfFreeAgents, arrOfFreeAgentChoices,
    typeOfFreeAgentSelect, teamState, teamCap, teamName, arrOfPositions, freeAgentPositionSelect,
    teamDraftPicks, arrOfTeamAssetsChoices, teamAssetsSelect  }) => {
    let newArrOfFreeAgents = freeAgentsFunctions.filterFreeAgents(typeOfFreeAgentSelect, arrOfFreeAgents)
    newArrOfFreeAgents = freeAgentsFunctions.filterFreeAgentsByPosition(freeAgentPositionSelect, newArrOfFreeAgents)
   
   
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

    const playersUnderContractNextYear = (arrofPlayers) => {
        let playersUnderContract = arrofPlayers.filter(player => {
            return player._2018_19 !== null
        })
        return playersUnderContract
    }
  
    let data = []
    return (
        <div className='lol' >
               
            <div className='main_freeAgents_container'>
            
                {newArrOfFreeAgents.map((option, index) => (
                    <label className='freeagent_player' >
                        <img className='freeagent_pic' src={option.photo} alt='player photo' />
                        <Link to={`/freeagents/${option.player}`}> <h3>{option.player}</h3>{' '}</Link>
                        Position: {option.position}{' '}<br/>
                        Last Team {' '}: {' '}{option.tm}{' '}<br/>
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
