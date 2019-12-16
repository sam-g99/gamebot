const mongoose = require('mongoose');

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}); //FIXME: "MongoNetworkError" (see error log)

const db = mongoose.connection;

db.once('open', () =>{
    console.log(`Connected to the database`);
});

const userSchema = new mongoose.Schema({
    name: {type: String, unique: true}
});
const User = mongoose.model('user', userSchema);

module.exports = {
    save: (username) =>{
        
        let user = new User({name: username});
        user.save((err, username) =>{
            if(err) return console.error(err);
            console.log(`Saved ${username} to database.`);
        });
    }
}