const fs = require('fs'),
file = fs.readFileSync(`${__dirname}/core/questions.json`),
qs = JSON.parse(file);


module.exports = {
    draw: (username, guess) =>{
        let rand = Math.floor(Math.random() * qs.length);

        console.log(`${qs.questions[rand].q} : ${qs.questions[rand].a}`);
        return {q: qs.questions[rand].q, a: qs.questions[rand].a}

    }
}