
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
    let num = totalOfContractsNumber(arr)
    let num2 = totalOfContractsNumber(arr2)
    let teamOneMaxCap = num * 1.25 + 100000
    let teamTwoMaxCap = num2 * 1.25 + 100000
    let softCap = 99000000
    let luxuryTax = 119000000
    let teamOneCap = Number(teamCap)
    let teamTwoCap = Number(teamCap2)
    if (num === 0 || num2 === 0) {
        return ''
    } else {
        console.log('We start here', (teamOneCap > softCap),(teamTwoCap > softCap) )
        if ((teamOneCap > softCap) && (teamTwoCap > softCap)) {
            if ((teamOneMaxCap >= num2) && (teamTwoMaxCap >= num)) {
                return ('Trade Approved!!!!!!!!')
            } else {
                return ('Trade Declined!!!!!!!!')
            }

        } else if ((teamOneCap > softCap)) {
            if ((teamOneMaxCap >= num2)) {
                return ('Trade Approved!!!!!!!!')
            } else {
                return ('Trade Declined!!!!!!!!')
            }

        } else if ((teamTwoCap > softCap)) {
            if ((teamTwoMaxCap >= num)) {
                return ('Trade Approved!!!!!!!!')
            } else {
                return ('Trade Declined!!!!!!!!')
            }

        } else {
            return ('Trade Declined!!!!!!!!')
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