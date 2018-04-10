
import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import moneyFunctions from './moneyFunctions'

const TeamBoard2 = ({ teamsArr, tradeArr, teamTradeArr2, value, handleChange, teamState, handleChange2 }) => {
    return (
        <div className='list_of_players'><br />
            <select
                name='teamArraySelect2'
                onChange={handleChange}>
                {teamsArr.map(option => (
                    <option value={option.abbreviation}>
                    <img src='https://fadeawayworld.com/wp-content/uploads/2017/08/nba_0602nbaplayoffs_1296x518.jpeg' alt='team logo'/>
                    {option.teamname}</option>
                ))}
            </select>
            <br />
            Players<br />
            {/* <ul> */}
            {console.log(teamState)}
            {teamState.map((player, index) => (
                // <br/>
                // <li>
                <button
                    className=''
                    value={index}
                    onClick={handleChange2}>
                    {player.player}{' - '}
                    {player.position}<br />
                    {/* {console.log(moneyFunctions.moneyFormatter(player))} */}
                    {moneyFunctions.moneyFormatter(player['_2017_18'])}<br />
                    {/* <br/> */}
                </button>
                // </li>
            ))}
            <br />
        </div>
    )
}

export default TeamBoard2