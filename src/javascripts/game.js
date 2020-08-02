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
        App.renderMiddleBox(game.id, game.title);
        let gameId = `box_${game.id}`;
        document.getElementById(gameId).addEventListener('click', e => Question.fetchQuestions(game.id));
      });
    })
    .catch(error => console.error(error));
  }

  // NEW
  static renderNewForm() {
    window.box_top_p.textContent = "Q: What is your game's info?";
    window.hero.remove();
    window.button_home.style.display = 'block';
    window.boxes.remove();
    App.renderBoxes();

    let f = document.createElement('form');
    f.setAttribute('id', 'new_game_form');

    // Title
    let it = document.createElement('input');
    App.setAttributes(it, {
      'id': 'input_title',
      'class': 'box-middle',
      'type': 'text', 
      'name': 'title', 
      'placeholder': "Q: What is your game's title?"
    });

    // Category
    App.renderMiddleBox('category', "Q: What is your game's category?");
    
    fetch('http://localhost:3000/api/v1/categories')
    .then(response => response.json())
    .then(categories => {
      categories.data.forEach(category => {
        let newCategory = new Category(category, category.attributes);
        let catButton = document.createElement('input');
        App.setAttributes(catButton, {
          'id': newCategory.id,
          'type': 'radio',
          'name': 'category',
          'value': newCategory.id,
        });
        let label = document.createElement('label');
        label.htmlFor = newCategory.id;
        let desc = document.createTextNode(newCategory.name);
        label.append(desc);
        window.box_category.append(label);
        label.insertAdjacentElement('afterend', catButton);
        let br = document.createElement('br');
        window.box_category.append(br);
      });
    });

    // Questions
    let questionNumbers = ['q1', 'q2', 'q3', 'q4', 'q5'];
    
    let q1 = document.createElement('input');
    App.setAttributes(q1, {
      'id': 'input_q1',
      'class': 'box-middle',
      'type': 'text', 
      'name': 'q1', 
      'placeholder': "Q: What is the first question?"
    });
    let br = document.createElement('br');

    f.append(it, window.box_category, br, q1);

    let answerLetters = ['A', 'B', 'C', 'D'];
    answerLetters.forEach(answerLetter => {
      let answer = document.createElement('input');
      App.setAttributes(answer, {
        'id': `input_${q1.name}_${answerLetter}`,
        'class': 'box-middle',
        'type': 'text', 
        'name': `${q1.name}_${answerLetter}`, 
        'placeholder': `Q: What is answer ${answerLetter}?`
      });
      f.append(answer);
    });

    // Answer A
    // let q1aa = document.createElement('input');
    // App.setAttributes(q1aa, {
    //   'id': 'input_q1aa',
    //   'class': 'box-middle',
    //   'type': 'text', 
    //   'name': 'q1aa', 
    //   'placeholder': "Q: What is answer A?"
    // });

    f.addEventListener('submit', e => { this.handleCreateForm(e);});
    boxes.appendChild(f);
  }
}

Game.all = [];
Game.corrects = 0;
Game.questionsPlayed = 0;
