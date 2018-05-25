
import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import moneyFunctions from './moneyFunctions'


var currencyFormatter = require('currency-formatter');


const TradeList = ({ teamTradeArr, handleCloseButton }) => {
    return (
        <div>
            {''} Trading {''}<br/>
            Total:{' '}{moneyFunctions.totalOfContractsString(teamTradeArr).slice(0,-3)}
            <ul>
                {/* { teamTradeArr} */}
                {teamTradeArr.map((player, index) =>
                    <li key={player[0]}>
                        < img  className='buttonphoto2' src ={`${player.photo}`} alt = 'Player Photo'/>
                        {player.player}<br />
                        {player.position}<br />
                        {moneyFunctions.moneyFormatter(player['_2017_18'])}<br />      
                        <button id={index} onClick={handleCloseButton} className="close">x</button></li>
                )}
            </ul>
            <br />
            <div>

            </div>
        </div>
    )
}
export default TradeList