const mongoose = require('mongoose'),
fs = require('fs'),
config = JSON.parse(fs.readFileSync('db.config.json'));

module.exports = {
    db: async () =>{
        mongoose.connect(config.dev);
        let db = mongoose.connection;

        db.once('open', () =>{
            console.log('Successfully connected to the Game Bot DB');
        });
    }
}