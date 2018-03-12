
import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import moneyFunctions from './moneyFunctions'

const TeamBoard = ({ teamsArr, tradeArr,teamTradeArr2, value , handleChange,teamState,handleChange2 }) => {
    return (
        <div className=''><br />
            {/* <label> */}
                <select       
                    // value={value}
                    name='teamArraySelect'
                    onChange={handleChange}>
                    {teamsArr.map(option => (
                        <option value={option.abbreviation}>{option.teamname}</option>
                    ))}
                </select>
                <br/>   
                Players<br />
                {/* <ul> */}
                
                {console.log(teamState)}
                    {teamState.map((player, index) => (
                        // <li>
                            <button 
                            value={index} 
                            onClick={handleChange2}>
                            
                                {player.player}<br />
                                {player.position}<br />
                                {moneyFunctions.moneyFormatter(player['_2017_18'])}<br />
                                
                            </button>
                        // </li>
                        
                    ))}
                    <br/>
               
        </div>
    )
}

export default TeamBoard