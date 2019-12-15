//TODO: move commands to their own module
//TODO: fix the shitty variable naming convention.
//TODO: make db.module actually useful
//TODO: remove config.json for production (gotta use those ENV variables)
//TODO: consolidate everything into the general information RichEmbed

const {Client, RichEmbed} = require('discord.js'),
client = new Client(),
fs = require('fs'),
prefix = process.env.PREFIX,
api = require('./core/api.module.js'),
express = require('express'), //used for the fancy redirect
app = express();

app.use(express.static('public'));

app.get('/', (req, res) =>{
    if(fs.readFileSync(`${__dirname}/redirect.html`)) {
        res.sendFile(`${__dirname}/redirect.html`);
    } else {
        res.status(404).res.send(`404 Error. Page not found`);
    }
});

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

client.on('ready', () =>{
    console.log(`Logged on as ${client.user.tag}`);
})

client.on('message', async msg =>{
    if(msg.content.indexOf(prefix) !== 0) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'gb') {
        let rand = Math.floor(Math.random() * colors.length);
        const query = args.join(' ');
        const game = await api.search(query);

        const developers = await api.developers(game.results[0].guid);
        const review = `${developers.results.reviews ? developers.results.reviews[0].site_detail_url : 'Not Available'}`;

        const embed = new RichEmbed()
            .setTitle(game.results[0].name)
            .setColor(colors[rand])
            .setDescription(game.results[0].deck)
            .setImage(game.results[0].image.small_url)
            .addField('Developer', developers.results.developers[0].name, true)
            .addField('Publisher', developers.results.publishers[0].name, true)
            .addBlankField()
            .addField('User Reviews', developers.results.number_of_user_reviews, true)
            .addField('GiantBomb Review', review, true)
        msg.channel.send(embed);
    }

    if(command === 'gb-r') {
        let rand = Math.floor(Math.random() * colors.length);
        const query = args.join(' ');
        const rawg = await api.gmrev(query);
        const rawgembed = new RichEmbed() //FIXME: should be declared the same as the others
            .setTitle(rawg.results[0].name)
            .setColor(colors[rand])
            .setImage(rawg.results[0].background_image)
            .addField('Review Count', rawg.results[0].reviews_count, true)
            .addField('Score', Math.round(rawg.results[0].score), true)
            .addField('Rating', `${rawg.results[0].rating}/5`, true);
        msg.channel.send(rawgembed);
    }

    if(command === 'gb-v') {
        let rand = Math.floor(Math.random() * colors.length);
        const query = args.join(' ');
        const rawg = await api.gmrev(query); 
        const rawgembed = new RichEmbed() //FIXME: should be declared the same as the others
            .setTitle(`${rawg.results[0].name} Vidoes`)
            .setColor(colors[rand])
            .setThumbnail(rawg.results[0].background_image)
            .addField('Clip', `Video [link](${rawg.results[0].clip.clips.full})`)
        msg.channel.send(rawgembed);
    }

    if(command === 'gb-help' || command === 'gb-h') {
        const embed = new RichEmbed()
            .setTitle('Game Bot Commands')
            .setColor(colors[1])
            .setDescription('Quickly search a few databases to find everything you need to know about a specific video game.')
            .addField('General Information', '!gb [query]', true)
            .addField('Reviews & Ratings', '!gb-r [query]', true)
            .addField('Clips & Videos', '!gb-v [query]', true);
        msg.channel.send(embed);
    }
});

client.login(process.env.TOKEN);

app.listen(process.env.PORT || 3000, (err) =>{
    if(err) console.log(err);
    console.log(`Listening for redirect`);
});