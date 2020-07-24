class Game {

  constructor(game, gameAttributes) {
    this.id = game.id;
    this.title = gameAttributes.title;
    this.category_id = gameAttributes.category_id;
    this.user_id = gameAttributes.user_id;
    Game.all.push(this);
  }

  static calculateScore(correctness) {
    this.questionsPlayed ++;

    if(correctness  == 'correct') {
      this.corrects ++;
    }
  }

  static renderScore() {
    window.box_top_p.textContent = `You got ${this.corrects} out of ${this.questionsPlayed} right.`;
    window.boxes.remove();
    App.renderBoxes();
    App.renderMiddleBox('categories', 'Back To Categories');
    window.box_categories.addEventListener('click', e => {Category.renderCategories();});
  }

  // INDEX
  static renderGames(categoryId) {
    window.box_top_p.textContent = 'Q: Which game do you want to play?';
    window.boxes.remove();
    App.renderBoxes();
    Game.all = [];

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
        // debugger

        App.renderMiddleBox(game.id, game.title);
        let gameId = `box_${game.id}`;
        document.getElementById(gameId).addEventListener('click', e => Question.fetchQuestions(game.id));
      });
    })
    .catch(error => console.error(error));
  }
}

Game.all = [];
Game.corrects = 0;
Game.questionsPlayed = 0;