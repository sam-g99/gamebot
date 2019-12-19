//module to help with creating a game library
const db = require('./db.module.js'),
api = require('./api.module.js');

module.exports = {
    add: async (username, query) =>{
        let data = await db.fetchLib(username);        
        let library = data.library;
        const res = await api.search(query);

        //FIXME: fix the ability to add the same game more than once
        /*
            example solution
            if(library.indexOf(query) => 0)
            {
                msg.channel.send('Hey bro, looks like you already have that game in your library.');
                return;
            } else {
                    db.lib(username, library);
            }
        */

       const game = {
            title: res.results[0].name,
            image: res.results[0].image.small_url
        };

        for(let i = 0; i < library.length; i++) {
            if(library[i].title.indexOf(game.title)) {
                return;
            } else {
                library.push(game);
        
                db.lib(username, library);
            }
        }

        

        

        
    },
    share: async (username) =>{
        let data = await db.fetchLib(username);
        let library = data.library;

        return library;
    },
    remove: async (username, query) =>{
        let data = await db.fetchLib(username);
        let library = data.library;
        const res = await api.search(query);

        const title = res.results[0].name;

        for(let i = 0; i < library.length; i++) {
            if(library[i].title.indexOf(title) >= 0) {
                library.splice(i, 1);
            }
        }

        db.lib(username, library);


        
    }
}