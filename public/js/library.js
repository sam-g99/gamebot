const fragment = new DocumentFragment();


window.addEventListener('load', async () =>{

    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('username');

    const res = await fetch(`https://dscrd-gm-bot.herokuapp.com/query?username=${user}`);
    const json = await res.json();

    json.library.forEach((g) =>{
        game(g, document.querySelector('.library'));
    });

    document.title = `${user}'s Library`;

    
});

function game(data, parent) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const cardTitle = document.createElement('div');
    cardTitle.setAttribute('class', 'card-title');

    const h1 = document.createElement('h1');

    const title = document.createTextNode(data.title);
    h1.appendChild(title);
    cardTitle.appendChild(h1);

    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');

    const cardImage = document.createElement('img');
    cardImage.setAttribute('class', 'card-image');
    cardImage.setAttribute('src', data.image);
    cardBody.appendChild(cardImage);

    card.appendChild(cardBody);
    card.appendChild(cardTitle);

    fragment.appendChild(card);

    parent.appendChild(fragment);
}