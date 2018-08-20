
import React from 'react';
import moneyFunctions from './moneyFunctions'




const TradeList = ({ teamTradeArr, handleCloseButton }) => {
    return (
        <div>
            {teamTradeArr.length === 0 ?'':`Total : ${moneyFunctions.totalOfContractsString(teamTradeArr).slice(0,-3)}`}
            <ul className='trade_list'>
                {teamTradeArr.map((player, index) =>
                    <li key={player[0]}>
                        < img  className='buttonphoto2' src ={`${player.photo}`} alt = 'Player'/>
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