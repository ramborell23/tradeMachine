const moment = require("moment");
moment().format();

const subtractTime = (currentTime, articleTime) => {
    let timeDiffernce = 0;
    currentTime = moment(currentTime);
    articleTime = moment(articleTime).fromNow();

    // timeDiffernce = currentTime.diff(articleTime)
    console.log(articleTime)
}

// Signup functions
const signupMessage = (returnedMessage) => {
    console.log('message chk', returnedMessage)
    switch (returnedMessage) {
        case 'Registration Failed: error: duplicate key value violates unique constraint "users_username_key" ':
        return "This username already exits. Please choose another username.";
        break;
        case 'Registration Failed: error: duplicate key value violates unique constraint "users_email_key" ':
        return "This email is already in use. Please choose another email.";
        break;
      default:
        return "Our check on function22";
    }
}

export default {
  subtractTime,
  signupMessage,
};