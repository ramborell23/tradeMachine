
import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import moneyFunctions from './moneyFunctions'


var currencyFormatter = require('currency-formatter');


const TradeList = ({ teamTradeArr, handleCloseButton }) => {
    let startingNum = 0
    let totalOfContracts = teamTradeArr.map(element => {
        return (startingNum + Number((element['_2017_18']).slice(1)) )
    });
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalOfContracts = totalOfContracts.reduce(reducer,0)
    totalOfContracts = currencyFormatter.format(totalOfContracts, { code: 'USD' })
    console.log('totalOfContracts', totalOfContracts)
    return (
        <div>
            {''} Trading {''}<br/>
            Total:{' '}{totalOfContracts.slice(0,-3)}
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