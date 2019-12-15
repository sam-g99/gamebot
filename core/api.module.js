const fetch = require('node-fetch'),
fs = require('fs'),
config = JSON.parse(fs.readFileSync('config.json'));

module.exports = {
    search: async (query) =>{
        const url = config.GiantBomb.search;
        const key = config.GiantBomb.key;

        const res = await fetch(`${url}?api_key=${key}&format=json&query=${query}&resources=game`);
        const json = await res.json();

        return json;
    },
    developers: async (query) =>{
        const url = config.GiantBomb.game;
        const key = config.GiantBomb.key;

        const res = await fetch(`${url}${query}/?api_key=${key}&format=json&fields=developers,publishers`);
        const json = await res.json();

        return json;
    },
    gmrev: async (query) =>{
        const url = `https://api.rawg.io/api/games?search=${query}`;

        const res = await fetch(url, {});
        const json = await res.json();

        return json;
        
    }
}