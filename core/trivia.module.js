const fs = require('fs'),
file = fs.readFileSync(`${__dirname}/questions.json`),
qs = JSON.parse(file);


module.exports = {
    draw: (username, guess) =>{
        let rand = Math.floor(Math.random() * qs.questions.length);

        let question = {
            q: qs.questions[rand].q,
            a: qs.questions[rand].a
        };

        console.log(question);


    }
}