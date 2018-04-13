
import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import moneyFunctions from './moneyFunctions'

const TeamBoard = ({ teamsArr, tradeArr, value, handleChange, teamState, handleChange2, handleToGetTeam }) => {
    return (
        <div className=''><br />
            <select
                // value={value}
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
            Players<br />

            {console.log(teamState)}
            {teamState.map((player, index) => (

                <button
                    key={index}
                    className=''
                    value={index}
                    onClick={handleChange2}>
                    {player.player}{' - '}
                    {player.position}<br />
                    {moneyFunctions.moneyFormatter(player['_2017_18'])}<br />
                    {/* <br/> */}
                </button>
                // </li>
            ))}
            <br />

        </div>
    )
}

export default TeamBoard