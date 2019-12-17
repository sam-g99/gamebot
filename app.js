const {Client, RichEmbed} = require('discord.js'),
client = new Client(),
fs = require('fs'),
prefix = process.env.PREFIX,
api = require('./core/api.module.js'),
express = require('express'), //used for the fancy redirect
app = express(),
cmd = require('./core/commands.module.js'),
utlity = require('./utliity/awken.module.js');

app.use(express.static('public'));

app.get('/', (req, res) =>{
    if(fs.readFileSync(`${__dirname}/redirect.html`)) {
        res.sendFile(`${__dirname}/redirect.html`);
    } else {
        res.status(404).res.send(`404 Error. Page not found`);
    }
});

client.on('ready', () =>{
    console.log(`Logged on as ${client.user.tag}`);
})

client.on('message', async msg =>{
    cmd.command(client, msg, prefix, RichEmbed);
    
});

client.on('guildMemberAdd', member =>{
    console.log(`${member.user.username} has joined.`)
});
client.login(process.env.TOKEN);

app.listen(process.env.PORT || 3000, (err) =>{
    if(err) console.log(err);
    console.log(`Listening for redirect`);
});

//bypass herokus shitty policy for putting apps to sleep due to inactivity
setInterval(() =>{
    utlity.keepawake();
}, 60000);