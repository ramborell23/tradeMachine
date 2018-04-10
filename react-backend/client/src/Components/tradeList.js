
import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import moneyFunctions from './moneyFunctions'


var currencyFormatter = require('currency-formatter');


const TradeList = ({ teamTradeArr, handleCloseButton }) => {
    return (
        <div>
            {''} Trading {''}<br/>
            Total:{' '}{moneyFunctions.totalOfContractsString(teamTradeArr).slice(0,-3)}
            {console.log('the right team==>', teamTradeArr)}
            <ul>
                {/* { teamTradeArr} */}
                {teamTradeArr.map((player, index) =>
                    <li key={player[0]}>
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