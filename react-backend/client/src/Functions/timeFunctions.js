const moment = require("moment");
moment().format();

const subtractTime = (currentTime, articleTime) => {
    let timeDiffernce = 0;
    currentTime = moment(currentTime);
    articleTime = moment(articleTime).fromNow();

    // timeDiffernce = currentTime.diff(articleTime)
    console.log(articleTime)
}

export default {
    subtractTime
};