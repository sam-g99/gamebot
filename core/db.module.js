const mongoose = require('mongoose');
const uri = `mongodb+srv://gamebot:XmqJ4rsTxRKdWodR@flustercuck-qelop.gcp.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(uri); //FIXME: "MongoNetworkError" (see error log)

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
    },
    fetchLib: (username) =>{
        const data = User.find({name: username});
        return data;
    },
    lib: (username, library) =>{
        User.update({name: username}, {
            library: library,
        }, (err) =>{
            if(err) console.error(err);
            console.log(`${username} has updated their library`);
        });
    },
    fave: (username, favorite) =>{
        User.update({name: username}, {
            favorite: favorite
        }, (err) => {
            if(err) console.error(err);
            console.llg(`${username} has updated their favorite game`);
        });
    }
}