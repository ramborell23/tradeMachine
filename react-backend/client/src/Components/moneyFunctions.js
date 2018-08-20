
var currencyFormatter = require('currency-formatter');

const moneyFormatter = (amount) => {
    let temp = Number(amount)
    temp = currencyFormatter.format(temp, { code: 'USD' })
    return (temp.slice(0, -3))
}

const moneyFormatter2 = (amount) => {
    let temp = Number(amount)
    temp = currencyFormatter.format(temp, { code: 'USD' })
    return (temp.slice(0, -3))
}

const moneyFormatterForCapString = (teamCap, softCap) => {
    let newTeamCap = Number(teamCap)
    console.log('newTeamCap newTeamCap', teamCap)
    newTeamCap = softCap - newTeamCap
    if (newTeamCap === 99000000) {
        return ''
    } else {
        newTeamCap = currencyFormatter.format(newTeamCap, { code: 'USD' })
        return (newTeamCap.slice(0, -3))
    }
}

const moneyFormatterForCapNumber = (amount, softCap) => {
    let temp = Number(amount)
    softCap = softCap - temp
    if (softCap === 99000000) {
        return ''
    } else {
        return softCap
    }
}

const capNumberAfterTrade = (teamCap, releaseContracts, receivingContracts) => {
    let total = (teamCap - receivingContracts)
    total = total + releaseContracts
    return total
}

const totalOfContractsString = (teamTradeArr) => {
    let startingNum = 0
    let totalOfContracts = teamTradeArr.map(element => {
        return (startingNum + Number((element['_2017_18'])))
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalOfContracts = totalOfContracts.reduce(reducer, 0)
    return totalOfContracts = currencyFormatter.format(totalOfContracts, { code: 'USD' })
}
const totalOfContractsNumber = (teamTradeArr) => {
    let startingNum = 0
    let totalOfContracts = teamTradeArr.map(element => {
        let value = startingNum + Number((element['_2017_18']))
        if (value === undefined) {
            return 1000000
        }
        return value
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalOfContracts = totalOfContracts.reduce(reducer, 0)
    return totalOfContracts
}

const tradeApproval = (arrOfTeam, arrOfTeam2, teamCap, teamCap2) => {
    let teamOneTotalContracts = totalOfContractsNumber(arrOfTeam)
    let teamTwoTotalContracts = totalOfContractsNumber(arrOfTeam2)
    // let teamOneMaxCap = teamOneTotalContracts * 1.25 + 100000
    // let teamTwoMaxCap = teamTwoTotalContracts * 1.25 + 100000
    // let softCap = 99093000
    let luxuryTax = 119266000
    let teamOneCap = Number(teamCap)
    let teamTwoCap = Number(teamCap2)

    let teamOneApproved;
    let teamTwoApproved;

    if (teamOneTotalContracts === 0 || teamTwoTotalContracts === 0) {
        return ''
    } else {

        if ((teamOneCap + teamTwoTotalContracts) < luxuryTax) { //New Cap would be under the Luxury tax
            console.log('New Cap under luxury tax team one ')
            if (teamOneTotalContracts <= 6533333) {     //Outgoing Salary
                teamOneApproved = teamTwoTotalContracts <= teamOneTotalContracts * 1.75 + 100000
                
            } else if (6533334 <= teamOneTotalContracts <= 19600000) {
                teamOneApproved = teamTwoTotalContracts <= teamOneTotalContracts + 5000000
                
            } else if (teamOneTotalContracts > 19600000) {
                teamOneApproved = teamTwoTotalContracts <= teamOneTotalContracts * 1.25 + 100000 
            }

        } else if ((teamOneCap + teamTwoTotalContracts) > luxuryTax) { //New Cap would be over the Luxury tax
            teamOneApproved = teamTwoTotalContracts <= teamOneTotalContracts * 1.25 + 100000
        }
        
        
        if ((teamTwoCap + teamOneTotalContracts) < luxuryTax) { //New Cap would be under the Luxury tax
            console.log('New Cap under luxury tax team two ')
            if (teamTwoTotalContracts <= 6533333) {     //Outgoing Salary
                teamTwoApproved = teamOneTotalContracts <= teamTwoTotalContracts * 1.75 + 100000
                
            } else if (6533334 <= teamOneTotalContracts <= 19600000) {
                teamTwoApproved = teamOneTotalContracts <= teamTwoTotalContracts + 5000000

            } else if (teamOneTotalContracts > 19600000) {
                teamTwoApproved = teamOneTotalContracts <= teamTwoTotalContracts * 1.25 + 100000

            }
        } else if ((teamTwoCap + teamTwoTotalContracts) > luxuryTax) { //New Cap would be over the Luxury tax
            teamTwoApproved = teamOneTotalContracts <= teamTwoTotalContracts * 1.25 + 100000
        }
        let amountTeamOneOverCap = (teamOneTotalContracts * 1.25 + 100000) -  teamTwoTotalContracts ;
        let amountTeamTwoOverCap = (teamTwoTotalContracts * 1.25 + 100000) -  teamOneTotalContracts ;
        console.log('TEAM one totsal',  teamOneTotalContracts)
        console.log('TEAM TWO MAX ALLOWED',  teamOneTotalContracts * 1.25 + 100000)
        console.log('TEAM TWO MAX ALLOWED',  teamTwoTotalContracts * 1.25 + 100000)
        console.log('TEAM TWo needs to incoming by' , amountTeamOneOverCap)
        console.log('TEAM TWo needs to incoming by' ,  amountTeamTwoOverCap)
        let teamOverValue = [amountTeamOneOverCap, amountTeamTwoOverCap].sort()
        if(teamOneApproved && teamTwoApproved){
            return (``)
        }else{
            return (`needs to cut ${ moneyFormatter(teamOverValue[0])} from the incoming trade total. Or add ${ moneyFormatter(Math.abs(teamOverValue[0]))} to their outgoing trade total.`)
        }
        // if ((teamOneCap > softCap) && (teamTwoCap > softCap)) {
        //     if ((teamOneMaxCap >= teamTwoTotalContracts) && (teamTwoMaxCap >= teamOneTotalContracts)) {
        //         return (`League Approved!!!!!!!!`)
        //     } else {
        //         return (`League Denied!!!!!!!! ${ teamOneMaxCap >= teamTwoTotalContracts ? `Team One is approved`: `Team One is NOT approved ${teamOneMaxCap} ${teamTwoTotalContracts}`}
        //        ----- ${teamTwoMaxCap >= teamOneTotalContracts  ? `Team two is approved`: `Team two is NOT approved ${teamTwoMaxCap} ${teamOneTotalContracts}`}
        //         ${teamTwoMaxCap}`)
        //     }

        // } else if ((teamOneCap > softCap)) {
        //     if ((teamOneMaxCap >= teamTwoTotalContracts)) {
        //         return (`League Approved!!!!!!!!`)
        //     } else {
        //         return (`League Denied!!!!!!!! ${teamTwoTotalContracts}
        //         ${teamOneMaxCap}`)
        //     }

        // } else if ((teamTwoCap > softCap)) {
        //     if ((teamTwoMaxCap >= teamOneTotalContracts)) {
        //         return (`League Approved!!!!!!!!`)
        //     } else {
        //         return (`League Denied!!!!!!!! ${teamOneTotalContracts}
        //         ${teamTwoMaxCap}`)
        //     }

        // } else {
        //     return (`League Denied!!!!!!!!`)
        // }
    }
}




module.exports = {
    //Player Functions
    moneyFormatter,
    moneyFormatter2,
    totalOfContractsString,
    totalOfContractsNumber,
    tradeApproval,
    moneyFormatterForCapString,
    moneyFormatterForCapNumber,
    capNumberAfterTrade
};