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
    window.box_top_p.textContent = 'Q: Which game do you want to play?';
    window.boxes.remove();
    App.renderBoxes();

    fetch('http://localhost:3000/api/v1/games')
    .then(response => response.json())
    .then(games => {
      games.data.forEach(game => {
        new Game(game, game.attributes);
      });
    })
    .then(() => {
      let allGames = Game.all;
      let categoryGames = allGames.filter(el => el.category_id == categoryId);

      categoryGames.forEach(game => {
        App.renderMiddleBox(game.id, game.title);
        let gameId = `box_${game.id}`;
        document.getElementById(gameId).addEventListener('click', e => console.log(`${game.title} clicked`));
      });
    })
    .catch(error => console.error(error));
  }
}

Game.all = [];