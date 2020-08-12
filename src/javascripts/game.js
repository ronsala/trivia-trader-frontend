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
      let categoryGames = allGames.filter(game => game.category_id == categoryId);
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

    f.append(it, window.box_category);

    // Questions
    // let questionNumbers = [1, 2, 3, 4, 5];
    // questionNumbers.forEach(questionNumber => {
    //   let question = document.createElement('input');
    //   App.setAttributes(question, {
    //     'id': `input_question_${questionNumber}`,
    //     'class': 'box-middle',
    //     'type': 'text', 
    //     'name': `input_question_${questionNumber}`, 
    //     'placeholder': `Q: What is question ${questionNumber}?`
    //   });
    //   let br = document.createElement('br');

    //   f.append(br, question);

    //   let answerLetters = ['A', 'B', 'C', 'D'];
    //   answerLetters.forEach(answerLetter => {
    //     let answer = document.createElement('input');
    //     App.setAttributes(answer, {
    //       'id': `input_${question.name}_${answerLetter}`,
    //       'class': 'box-middle',
    //       'type': 'text', 
    //       'name': `${question.name}_${answerLetter}`, 
    //       'placeholder': `What is answer ${answerLetter}?`
    //     });
    //     f.append(answer);
    //   });

    //   let correct = document.createElement('input');
    //   App.setAttributes(correct, {
    //     'id': `input_${question.name}_correct`,
    //     'class': 'box-middle',
    //     'type': 'text', 
    //     'name': `${question.name}_correct`, 
    //     'placeholder': `What is the letter of the correct answer?`
    //   });
    //   f.append(correct);

    //   let link = document.createElement('input');
    //   App.setAttributes(link, {
    //     'id': `input_${question.name}_link`,
    //     'class': 'box-middle',
    //     'type': 'text', 
    //     'name': `${question.name}_link`, 
    //     'placeholder': `What is a link that documents the correct answer?`
    //   });
    //   f.append(link);
    // });

    let is = document.createElement('input');
    App.setAttributes(is, {
      'id': 'create_button',
      'class': 'submit',
      'type': 'submit',
      'value': 'Next'
    });
    f.append(is);

    f.addEventListener('submit', e => { this.handleCreateForm(e);});
    boxes.appendChild(f);
  }

    // CREATE
    static handleCreateForm(e) {
      e.preventDefault();
      let titleInput = window.input_title.value;
      let categoryInput;
      document.querySelectorAll('input').forEach(input => {
        if (input.checked) {
          categoryInput = input.value;
        }
      });
      let userId = User.currentUserId;
      this.postGame(titleInput, categoryInput, userId);
    }

    static postGame(title, category_id, user_id) {
      const bodyData = {game: {title, category_id, user_id}};
      fetch("http://localhost:3000/api/v1/games", {
        method: "POST",
        headers: {"Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
      },
        body: JSON.stringify(bodyData)
      })
      .then(response => response.json())
      .then(game => {
        const gameData = game.data;
        let newGame = new Game(gameData, gameData.attributes);
      })
      .catch(error => console.error('Error:', error));
    }
}

Game.all = [];
Game.corrects = 0;
Game.questionsPlayed = 0;
