const https = require('https');

module.exports = {
    keepawake: () =>{
        https.get('https://dscrd-gm-bot.herokuapp.com');
    }
}