
import React from 'react';
import moneyFunctions from './moneyFunctions'

const TeamBoard = ({ teamsArr, tradeArr, value, handleChange, teamState, handleChange2, handleToGetTeam, photo, getPlayerStats, getPlayerSalaries, handleToGetTeamDraftPIcks }) => {
    return (
        <div >
            <br />
            <select
                name='teamArraySelect'
                onChange={handleChange}>
                {teamsArr.map((option, index) => (
                    <option
                        key={index}
                        value={option.abbreviation}>{option.teamname}
                    </option>
                ))}
            </select>

            <button
                onClick={handleToGetTeam}>
                Get Team
            </button>

            <br />
            Players
            <br />
            <div className='list_of_players'>
                {console.log(teamState)}
                {teamState.map((player, index) => (
                    <button
                        key={index}
                        className='board_button'
                        value={index}
                        onClick={handleChange2}
                    >
                        <img className='buttonphoto' src={`${player.photo}`} alt='Player' />
                        {player.player}{' - '}
                        {player.position}<br />
                        {moneyFunctions.moneyFormatter(player['_2017_18'])}<br />
                        <button
                            onClick={getPlayerStats}
                            name={player.player}
                            id={player.photo}
                        >
                            Stats
                        </button>

                        <button
                            onClick={getPlayerSalaries}
                            name={player.player}
                            id={player.photo}
                        >
                            $
                        </button>
                    </button>
                ))}
            </div>
            <br />
        </div>
    )
}

export default TeamBoard