
import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";


const TeamBoard = ({ teamsArr, value , handleChange,handleChange2, teamState }) => {
    return (
        <div className=''><br />
            {/* <label> */}
                <select 
                    
                    // value={value}
                    name='teamArraySelect'
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
                            
                                {/* {item[0]}<br />
                                {item[1]}<br />
                                {item[2]}<br /> */}
                                {item[3]}<br />
                                {item[4]}<br />
                            </button>
                        // </li>
                        
                    ))}<br/>
                    {/* {''} Trading {''} */}
                    {/* {teamTradeArr2.map( player => {
                    <ul>
                        <li>
                            {player[0]}
                        </li>
                    </ul>

                    })} */}
                {/* </ul> */}
            {/* </label> */}
            {/* <br />
            <br /> */}
        </div>
    )
}

export default TeamBoard