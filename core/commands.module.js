const api = require('./api.module.js'),
db = require('./db.module.js'),
lib = require('./library.module.js');

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
    /*
        If you add a command, add it to "commands.json"
    */
    command: async (client, msg, prefix, RichEmbed) =>{
        if(msg.content.indexOf(prefix) !== 0) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if(command === 'gb') {
            const color = randColors(colors);
            
            const query = args.join(' ');
            const game = await api.search(query);

            const developers = await api.developers(game.results[0].guid);
            const review = `${developers.results.reviews ? developers.results.reviews[0].site_detail_url : 'Not Available'}`;

            const embed = new RichEmbed()
                .setTitle(game.results[0].name)
                .setColor(color)
                .setDescription(game.results[0].deck)
                .setImage(game.results[0].image.small_url)
                .addField('Developer', developers.results.developers[0].name, true)
                .addField('Publisher', developers.results.publishers[0].name, true)
                .addBlankField()
                .addField('User Reviews', developers.results.number_of_user_reviews, true)
                .addField('GiantBomb Review', review, true);
            msg.channel.send(embed);
        }
        if(command === 'gbr') {
            const color = randColors(colors);
            const query = args.join(' ');
            const rawg = await api.gmrev(query);
            const embed = new RichEmbed()
                .setTitle(rawg.results[0].name)
                .setColor(color)
                .setImage(rawg.results[0].background_image)
                .addField('Review Count', rawg.results[0].reviews_count, true)
                .addField('Score', Math.round(rawg.results[0].score), true)
                .addField('Rating', `${rawg.results[0].rating}/5`, true);
            msg.channel.send(embed);
        }
        if(command === 'gbhelp' || command === 'gbh') {
            const color = randColors(colors);
            const embed = new RichEmbed()
                .setTitle('Game Bot Commands')
                .setColor(color)
                .setDescription('Quickly search a few databases to find everything you need to know about a specific video game.')
                .addField('General Information', '!gb [query]', true)
                .addField('Reviews & Ratings', '!gb-r [query]', true)
                .addField('Clips & Videos', '!gb-v [query]', true);
            msg.channel.send(embed);
        }

        if(command === 'gb-create') {
            const user = msg.author.username;
            console.log(`${user} sent a message.`);

            msg.channel.send('You have been added to the database. Use !gb-add to add a game.');

            db.save(user);
        }
        if(command === 'gb-add') {
            console.log(`Adding game.`);

            const query = args.join(' ');

            lib.add(msg.author.username, query);
            msg.channel.send(`${query.toUpperCase()} has been added to your library.`);
        }

        if(command === 'gb-share') {
            const library = await lib.share(msg.author.username);
            const json =  JSON.stringify(library);
           

            msg.channel.send(json);

        }

        
    }
        
}