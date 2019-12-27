const fs = require('fs'),
file = fs.readFileSync('../questions.json'),
qs = file.questions;


module.exports = {
    draw: (username, guess) =>{
        let rand = Math.floor(Math.random() * qs.length);

        console.log(`${qs[rand].q} : ${qs[rand].a}`);
        return {q: qs[rand].q, a: qs[rand].a}

    }
}