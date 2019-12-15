const {Client, RichEmbed} = require('discord.js'),
client = new Client(),
fs = require('fs'),
prefix = process.env.PREFIX,
api = require('./core/api.module.js'),
express = require('express'), //used for the fancy redirect
app = express(),
cmd = require('./core/commands.module.js');

app.use(express.static('public'));

app.get('/', (req, res) =>{
    if(fs.readFileSync(`${__dirname}/redirect.html`)) {
        res.sendFile(`${__dirname}/redirect.html`);
    } else {
        res.status(404).res.send(`404 Error. Page not found`);
    }
});



function randColor(colors) {
    const rand = Math.floor(Math.random() * colors.length);

    return colors[rand];
}

client.on('ready', () =>{
    console.log(`Logged on as ${client.user.tag}`);
})

client.on('message', async msg =>{
    cmd.command(client, msg, prefix, RichEmbed);
    
});

client.login(process.env.TOKEN);

app.listen(process.env.PORT || 3000, (err) =>{
    if(err) console.log(err);
    console.log(`Listening for redirect`);
});