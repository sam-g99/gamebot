const mongoose = require('mongoose');
const uri = `mongodb+srv://gamebot:XmqJ4rsTxRKdWodR@flustercuck-qelop.gcp.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});//FIXME: "MongoNetworkError" (see error log)

const db = mongoose.connection;

db.once('open', () =>{
    console.log(`Connected to the database`);
});

const userSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    library: Array,
    favorite: String
});
const User = mongoose.model('user', userSchema);

module.exports = {
    save: (username) =>{
        console.log('-----------------------');
        console.log('Adding user to database.');
        let user = new User({name: username});
        user.save((err, username) =>{
            if(err) return console.error(err);
            console.log(`Saved ${username} to database.`);
        });
    },
    fetchLib: async (username) =>{
        const query = User.find({name: username});
        const promise = query.exec();
        const data = promise.then((res) =>{
            res.forEach((e) =>{
                console.log(e.library);
                return e.library;
            });
        });

        console.log(data);

        

    
                
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