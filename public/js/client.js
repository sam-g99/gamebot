//literally just a redirect

window.addEventListener('load', () =>{    
    const btn = document.querySelector('#join-server');

    btn.addEventListener('click', () =>{

        window.open('https://discordapp.com/api/oauth2/authorize?client_id=654088226369437756&permissions=0&scope=bot', '_blank');
    });
});
