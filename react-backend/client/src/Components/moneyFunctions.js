

var currencyFormatter = require('currency-formatter');




const moneyFormatter = (amount) => {
    console.log(typeof amount)
    let temp  = Number(amount.slice(1))
    //  temp  = "0"+ temp
    //  temp =  temp.match(/.{1,3}/g)
    //  temp = temp.slice(1)
    temp = currencyFormatter.format(temp, { code: 'USD' })
    return  (temp.slice(0,-3))

}





module.exports = {
    //Player Functions
    moneyFormatter,
};