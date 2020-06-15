class Game {

  constructor(game, gameAttributes) {
    this.id = game.id;
    this.title = gameAttributes.title;
    this.category_id = gameAttributes.category_id;
    this.user_id = gameAttributes.user_id;
    Game.all.push(this);
  }

  // INDEX
  static renderGames(categoryId) {
    document.querySelector('#box-top-p').textContent = 'Q: Which game do you want to play?';

    document.querySelectorAll('.box-middle').forEach(box => {
      box.style.display = 'none';
    });

    fetch('http://localhost:3000/api/v1/games')
    .then(response => response.json())
    .then(games => {
      games.data.forEach(game => {
        let newGame = new Game(game, game.attributes);
      });
    })
    .then(() => {
      let allGames = Game.all;
      let categoryGames = allGames.filter(el => el.category_id == categoryId);

      categoryGames.forEach(categoryGame => {
        let div = document.createElement('div');
        div.className = "box-middle";
        div.innerHTML = `<p>${categoryGame.title}</p>`;
        div.addEventListener('click', e => console.log(`${categoryGame.title} clicked`))
        document.querySelector('#boxes').appendChild(div);
      });
    })
    .catch(error => console.error(error));
  }
}



Game.all = [];