class Game {

  constructor(game, gameAttributes) {
    this.id = game.id;
    this.title =gameAttributes.title;
    Game.all.push(this);
  }

  // INDEX
  static renderGames() {
    document.querySelector('#box-top-p').textContent = 'Q: Which game do you want to play?';

    document.querySelectorAll('.box-middle').forEach(box => {
      box.style.display = 'none';
    });

    fetch('http://localhost:3000/api/v1/games')
    .then(response => response.json())
    .then(games => {

      games.data.forEach(game => {
        let newGame = new Game(game, game.attributes);
        let div = document.createElement('div');
        div.className = "box-middle";
        div.innerHTML = `<p>${newGame.title}</p>`;
        div.addEventListener('click', e => console.log(`${newGame.name} clicked`))
        document.querySelector('#boxes').appendChild(div);
      });
    });
  }
}

Game.all = [];