const filterFreeAgents = (freeAgentValue, arrOfFreeAgents) =>{
    
    if (freeAgentValue === 'Player'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            console.log('freeAgentValue', freeAgentValue)
            console.log('arrOfFreeAgents', arrOfFreeAgents)
            return player.option_ === 'Player' && player.option_year === '2018'
        })
        console.log(sortedArrOfPlayers)
        return sortedArrOfPlayers

    } else if(freeAgentValue === 'Unrestricted'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            console.log('freeAgentValue', freeAgentValue)
            console.log('arrOfFreeAgents', arrOfFreeAgents)
            return player._2018_19 === null && player.option_ === null
        })
        console.log(sortedArrOfPlayers)
        return sortedArrOfPlayers

    } else if(freeAgentValue === 'Team'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            console.log('freeAgentValue', freeAgentValue)
            console.log('arrOfFreeAgents', arrOfFreeAgents)
            return player.option_ === 'Team'
        })
        console.log(sortedArrOfPlayers)
        
        return sortedArrOfPlayers
    }else if(freeAgentValue === 'Restricted'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            console.log('freeAgentValue', freeAgentValue)
            console.log('arrOfFreeAgents', arrOfFreeAgents)
            return player.option_ === 'RFA'
        })
        console.log(sortedArrOfPlayers)
        
        return sortedArrOfPlayers
    }else{
        return arrOfFreeAgents
    }
       
}

const getSpecificTeam = (team)=>{
    
}


export default {
    filterFreeAgents,
};