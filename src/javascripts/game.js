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
    .then(response => {
      if(response.ok) {
        response.json()
        .then(game => {
          let gameData = game.data;
          let newGame = new Game(gameData, gameData.attributes);
          Question.renderNewForm(newGame);
        });
      } else {
        response.json()
        .then(errors => {
          errors.errors.forEach(error => {
            window.alert(error);
          });
        });
      }
    })
    .catch(error => console.error('Error:', error));
  }

  // EDIT
  static renderUpdateForm(game) {
    window.box_top_p.textContent = `Review ${game.title}`;
    window.boxes.remove();
    App.renderBoxes();

    let f = document.createElement('form');
    App.setAttributes(f, {
      'id': 'edit_game_form',
      'data-id': `${game.id}`
    });

    // Title
    let lt = document.createElement('label');
    lt.textContent = 'Title';
    let it = document.createElement('input');
    App.setAttributes(it, {
      'id': 'input_title', 
      'type': 'text', 
      'name': 'username', 
      'value': `${game.title}`, 
      'class': 'box-middle'});

    // Category
    App.renderMiddleBox('category', "");
    let categoryLabel = document.createElement('label');
    categoryLabel.htmlFor = box_category;

    Category.all.forEach(category => {
      let catButton = document.createElement('input');
      App.setAttributes(catButton, {
        'id': category.id,
        'type': 'radio',
        'name': 'category',
        'value': category.id,
      });

      if (catButton.id == game.category_id) {
        catButton.checked = true;
      }

      let label = document.createElement('label');
      label.htmlFor = category.id;
      let desc = document.createTextNode(category.name);
      label.append(desc);
      window.box_category.append(label);
      window.box_category.append(catButton);
      let br = document.createElement('br');
      window.box_category.append(br);
    });

    f.append(lt, it, categoryLabel, window.box_category);

    let is = document.createElement('input');
    App.setAttributes(is, {
      'id': 'create_button',
      'class': 'submit',
      'type': 'submit',
      'value': 'Next'
    });
    f.append(is);

    f.addEventListener('submit', e => { this.handleUpdateForm(e);});
    boxes.appendChild(f);
  }

  // UPDATE
  static handleUpdateForm(e, game) {
    console.log('in Game.handleUpdateForm()')
    e.preventDefault();
    // const username = e.target.querySelector('#input_username').value;
    // const email = e.target.querySelector('#input_email').value;
  }
}

Game.all = [];
Game.corrects = 0;
Game.questionsPlayed = 0;
