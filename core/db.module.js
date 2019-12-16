/*
    Currently I'm using MongoDB. For a few reasons. While SQL may be a much better alternative, in general. MongoDB offers a better way to manipulate data in the form of a JSON. Very little parsing needs to be done to get the data from point A to point B. Though, MongoDB IS scalable, I plan on moving to SQl in the near future.
*/
const mongoose = require('mongoose');

mongoose.connect(process.env.DB); //FIXME: "MongoNetworkError" probably due to a bad url or related to the url in some way.

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