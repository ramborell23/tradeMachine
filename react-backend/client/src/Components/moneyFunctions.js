
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
    console.log('newTeamCap newTeamCap',teamCap)
    newTeamCap = softCap - newTeamCap
    if (newTeamCap === 99000000){
        return ''
    } else {
        newTeamCap = currencyFormatter.format(newTeamCap, { code: 'USD' })
        return (newTeamCap.slice(0, -3))
    }
}

const moneyFormatterForCapNumber = (amount, softCap) => {
    let temp = Number(amount)
    softCap = softCap - temp
    if (softCap === 99000000){
        return ''
    } else {
        return softCap
    }
}
const capNumberAfterTrade = (teamCap, releaseContracts, receivingContracts) => {
    let nums = [teamCap , releaseContracts].sort()
    let total  = (teamCap - receivingContracts) 
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
        if(value === undefined){
            return 1000000
        }
        return value 
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalOfContracts = totalOfContracts.reduce(reducer, 0)
    return totalOfContracts
}

const tradeApproval = (arr, arr2, teamCap, teamCap2) => {
    let teamOneTotalContracts = totalOfContractsNumber(arr)
    let teamTwoTotalContracts = totalOfContractsNumber(arr2)
    let teamOneMaxCap = teamOneTotalContracts * 1.25 + 100000
    let teamTwoMaxCap = teamTwoTotalContracts * 1.25 + 100000
    let softCap = 99000000
    let luxuryTax = 119000000
    let teamOneCap = Number(teamCap)
    let teamTwoCap = Number(teamCap2)
    if (teamOneTotalContracts === 0 || teamTwoTotalContracts === 0) {
        return ''
    } else {
        console.log('We start here', (teamOneCap > softCap),(teamTwoCap > softCap) )
        if ((teamOneCap > softCap) && (teamTwoCap > softCap)) {
            if ((teamOneMaxCap >= teamTwoTotalContracts) && (teamTwoMaxCap >= teamOneTotalContracts)) {
                return (`League Approved!!!!!!!!`)
            } else {
                return (`League Denied!!!!!!!! ${ teamOneMaxCap >= teamTwoTotalContracts ? `Team One is approved`: `Team One is NOT approved ${teamOneMaxCap} ${teamTwoTotalContracts}`}
               ----- ${teamTwoMaxCap >= teamOneTotalContracts  ? `Team two is approved`: `Team two is NOT approved ${teamTwoMaxCap} ${teamOneTotalContracts}`}
                ${teamTwoMaxCap}`)
            }

        } else if ((teamOneCap > softCap)) {
            if ((teamOneMaxCap >= teamTwoTotalContracts)) {
                return (`League Approved!!!!!!!!`)
            } else {
                return (`League Denied!!!!!!!! ${teamTwoTotalContracts}
                ${teamOneMaxCap}`)
            }

        } else if ((teamTwoCap > softCap)) {
            if ((teamTwoMaxCap >= teamOneTotalContracts)) {
                return (`League Approved!!!!!!!!`)
            } else {
                return (`League Denied!!!!!!!! ${teamOneTotalContracts}
                ${teamTwoMaxCap}`)
            }

        } else {
            return (`League Denied!!!!!!!!`)
        }
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