
var currencyFormatter = require('currency-formatter');

const moneyFormatter = (amount) => {
    let temp = Number(amount.slice(1))
    temp = currencyFormatter.format(temp, { code: 'USD' })
    return (temp.slice(0, -3))
}

const totalOfContractsString = (teamTradeArr) => {
    let startingNum = 0
    let totalOfContracts = teamTradeArr.map(element => {
        return (startingNum + Number((element['_2017_18']).slice(1)))
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalOfContracts = totalOfContracts.reduce(reducer, 0)
    return totalOfContracts = currencyFormatter.format(totalOfContracts, { code: 'USD' })
}
const totalOfContractsNumber = (teamTradeArr) => {
    let startingNum = 0
    let totalOfContracts = teamTradeArr.map(element => {
        return (startingNum + Number((element['_2017_18']).slice(1)))
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
    let teamOneCap = Number(teamCap.slice(1))
    let teamTwoCap = Number(teamCap2.slice(1))
    console.log('Is team one over the cap', teamOneCap > softCap)
    console.log('Is team two over the cap', teamTwoCap > softCap)
    console.log('Team one Giving up this much salary', num)
    console.log('Here our teamOneMaxCap', teamOneMaxCap)
    console.log('Team two Giving up this much salary', num2)
    console.log('Here our teamTwoMaxCap', teamTwoMaxCap)
    if (num === 0 || num2 === 0) {
        return ''
    } else {
        console.log('We start here', (teamOneCap > softCap),(teamTwoCap > softCap) )
        if ((teamOneCap > softCap) && (teamTwoCap > softCap)) {
            console.log('Trying a trade with both over the cap')
            if ((teamOneMaxCap >= num2) && (teamTwoMaxCap >= num)) {
                return ('Trade Approved!!!!!!!!')
            } else {
                return ('Trade Declined!!!!!!!!')
            }

        } else if ((teamOneCap > softCap)) {
            console.log('Trying a trade with team one over the cap')
            if ((teamOneMaxCap >= num2)) {
                return ('Trade Approved!!!!!!!!')
            } else {
                return ('Trade Declined!!!!!!!!')
            }

        } else if ((teamTwoCap > softCap)) {
            console.log('Trying a trade with team two over the cap')
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
    totalOfContractsString,
    totalOfContractsNumber,
    tradeApproval,
};