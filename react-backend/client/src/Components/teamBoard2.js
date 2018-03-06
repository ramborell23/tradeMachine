
import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";


const TeamBoard2 = ({ teamsArr, tradeArr,teamTradeArr2, value , handleChange,teamState,handleChange2 }) => {
    return (
        <div className=''><br />
            {/* <label> */}
                <select 
                    
                    // value={value}
                    name='teamArraySelect2'
                    onChange={handleChange}>
                    {teamsArr.map(option => (
                        <option value={option}>{option}</option>
                    ))}
                </select>
                <br/>   
                Players<br />
                {/* <ul> */}
                    {teamState.map((item, index) => (
                        // <li>
                            <button 
                            value={index} 
                            onClick={handleChange2}>
                            
                                {item[3]}<br />
                                {item[11]}<br />
                                {item[5]}<br />
                                {item[6]}<br />
                            </button>
                        // </li>
                        
                    ))}<br/>
               
        </div>
    )
}

export default TeamBoard2