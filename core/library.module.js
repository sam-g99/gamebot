//module to help with creating a game library
const db = require('./db.module.js'),
api = require('./api.module.js');

module.exports = {
    add: async (username, query) =>{
        let data = await db.fetchLib(username);        
        let library = data.library;
        const res = await api.search(query);

       const game = {
            title: res.results[0].name,
            image: res.results[0].image.small_url
        };

        //FIXME: need to break out of the for loop once a result returns true, or false. however the check is written. probably best to check for false rather than true.

        for(let i = 0; i < library.length; i++) {
            if(library[i].title.indexOf(game.title) >= 0) {
                console.log('game already exists.');
            }  
            library.push(game);
    
            db.lib(username, library);
            
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