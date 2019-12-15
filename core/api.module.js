const fetch = require('node-fetch'),
fs = require('fs'),
config = JSON.parse(fs.readFileSync('config.json'));

module.exports = {
    search: async (query) =>{
        const url = config.GiantBomb.search;
        const key = process.env.GIANTBOMB;

        const res = await fetch(`${url}?api_key=${key}&format=json&query=${query}&resources=game`);
        const json = await res.json();

        return json;
    },
    developers: async (query) =>{
        const url = config.GiantBomb.game;
        const key = process.env.GIANTBOMB;

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