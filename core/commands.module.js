const api = require('./api.module.js');

const colors = [
    'f5ad42',
    '42f55d',
    '42d1f5',
    '6942f5',
    'f542dd',
    'f5427e',
    'ff6b6b',
    '6bffc9'
];

const randColors = (colors) =>{
    const rand = Math.floor(Math.random() * colors.length);

    return colors[rand];
}

module.exports = {
    command: async (client, msg, prefix, RichEmbed) =>{
        console.log(msg.content);
        if(msg.content.indexOf(prefix) !== 0) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if(command === 'gb') {
            const color = randColors(colors);
            
            const query = args.join(' ');
            const game = await api.search(query);

            const developers = await api.developers(game.results[0].guid);
            const review = `${deverlopers.results.reviews ? developers.results.reviews[0].site_detail_url : 'Not Available'}`;

            const embed = new RichEmbed()
                .setTitle(game.results[0].name)
                .setColor(color)
                .setDescription(game.results[0].deck)
                .setImage(game.results[0].image.small_url)
                .addField('Developer', developers.results.developers[0].name, true)
                .addField('Publisher', developers.results.publishers[0].name, true)
                .addBlankField()
                .addField('User Reviews', developers.restuls.number_of_user_reviews, true)
                .addField('GiantBomb Review', review, true);
            return msg.channel.send(embed);
        }
    }
}