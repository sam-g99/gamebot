//literally just a redirect

window.addEventListener('load', () =>{    
    const btn = document.querySelector('#join-server');
    const git = document.querySelector('#contribute');

    btn.addEventListener('click', () =>{
        window.open('https://discordapp.com/api/oauth2/authorize?client_id=654088226369437756&permissions=0&scope=bot', '_blank');
    });

    git.addEventListener('click', () =>{
        window.open('https://github.com/aboxofsox/gamebot');
    });
});
