//module to help with creating a game library
const db = require('./db.module.js'),
api = require('./api.module.js');

module.exports = {
    add: async (username, query) =>{
        let data = db.fetchLib(username);
        
        console.log(data);

        const res = await api.search(query);
        const json = await res.json();

        const game = {
            title: json.results[0].name,
            image: json.results[0].image.small_url
        };

        library.push(game);
        
        db.lib(username, library);
    }
}