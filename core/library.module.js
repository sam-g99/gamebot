//module to help with creating a game library
const db = require('./db.module.js'),
api = require('./api.module.js');

module.exports = {
    add: async (username, query) =>{
        let data = await db.fetchLib(username);
        console.log(data);
        
        
        let library = [];

        //console.log(data);

        const res = await api.search(query);
        //const json = await res.json();

        const game = {
            title: res.results[0].name,
            image: res.results[0].image.small_url
        };
        
        //db.lib(username, data);
    }
}