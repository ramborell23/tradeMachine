const filterFreeAgents = (freeAgentValue, arrOfFreeAgents) =>{
    if (freeAgentValue === 'Player'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            return player.option_ === 'Player' && player.option_year === '2018'
        })
        return sortedArrOfPlayers
    } else if(freeAgentValue === 'Unrestricted'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            return player._2018_19 === null && player.option_ === null
        })
        return sortedArrOfPlayers
    } else if(freeAgentValue === 'Team'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            return player.option_ === 'Team'
        })        
        return sortedArrOfPlayers
    }else if(freeAgentValue === 'Restricted'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            return player.option_ === 'RFA'
        })        
        return sortedArrOfPlayers
    }else{
        return arrOfFreeAgents
    }  
}
const filterFreeAgentsByPosition = (freeAgentValue, arrOfFreeAgents) =>{
    if (freeAgentValue === 'C'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            return player.position === freeAgentValue 
        })
        return sortedArrOfPlayers
    } else if(freeAgentValue === 'PF'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            return player.position === freeAgentValue 
        })
        return sortedArrOfPlayers
    } else if(freeAgentValue === 'SF'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            return player.position === freeAgentValue 
        })        
        return sortedArrOfPlayers
    }else if(freeAgentValue === 'SG'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            return player.position === freeAgentValue 
        })        
        return sortedArrOfPlayers
    }else if(freeAgentValue === 'PG'){
        let sortedArrOfPlayers = arrOfFreeAgents.filter( player =>{
            return player.position === freeAgentValue 
        })        
        return sortedArrOfPlayers
    }else{
        return arrOfFreeAgents
    }  
}


const getTeamUpcomingFreeAgency = (team) =>{
    console.log(team.length)
    // let sortedArrOfPlayers = team.filter( player =>{
    //     return player._2018_19 !== null
    // })
    for(var i = 0; i < team.length; i++){
        console.log(team[i])
    }
    // let sortedArrOfPlayers = team.filter( player => {
    //     return player
    // })
}
const teamUpcomingFreeAgents = (arrofPlayers) => {
    let freeAgents = arrofPlayers.filter(player => {
        return player._2018_19 === null
    })
    return freeAgents
}


export default {
    filterFreeAgents,
    getTeamUpcomingFreeAgency,
    filterFreeAgentsByPosition,
    teamUpcomingFreeAgents,
};