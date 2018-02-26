
import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";


const TradeList = ({ teamTradeArr, handleCloseButton }) => {
    let copy = teamTradeArr
    let nums = [1, 2, 3, 4, 5, 6, 7]
    return (
        <div>
            {''} Trading {''}
            {console.log('the right team==>', teamTradeArr)}
            <ul>
                {/* { teamTradeArr} */}
                {nums}
                {teamTradeArr.map((number, index) =>
                    <li key = {number[0]}>{number[3]} <button  id={index}onClick={handleCloseButton} className="close">x</button></li>
                )}
            </ul>
            <br />
            <div>
                
            </div>
        </div>
    )
}
export default TradeList