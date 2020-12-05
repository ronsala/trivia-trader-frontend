// const { currentUserId } = require("./user");

class Game {

  constructor(game, gameAttributes) {
    this.id = game.id;
    this.title = gameAttributes.title;
    this.category_id = gameAttributes.category_id;
    this.user_id = gameAttributes.user_id;
    this.complete = gameAttributes.complete;
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
    if(User.currentUserId) {
      let favButton = document.createElement('button');
      App.setAttributes(favButton, {
        'id': 'fav_button',
        'name': 'fav_button',
        'value': categoryId
      });
      favButton.textContent = 'Make this category a favorite.';
      window.content.insertBefore(favButton, box_top);
      window.fav_button.addEventListener('click', e => {User.addFavorite(User.currentUserId, categoryId);});
    }

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
      let playableCategoryGames = categoryGames.filter(game => game.complete == true);
      playableCategoryGames.forEach(game => {
        App.renderMiddleBox(game.id, game.title);
        let gameId = `box_${game.id}`;
        document.getElementById(gameId).addEventListener('click', e => Question.fetchQuestions(game.id));
      });
    })
    .catch(error => console.error(error));
  }

  static renderUserGames(userId) {
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
      let userGames = allGames.filter(game => game.user_id == userId);      
      let playableUserGames = userGames.filter(game => game.complete == true);

      if (playableUserGames.length != 0) {
        playableUserGames.forEach(game => {
          App.renderMiddleBox(game.id, game.title);
          let gameId = `box_${game.id}`;
          document.getElementById(gameId).addEventListener('click', e => Question.fetchQuestions(game.id));
          if(game.user_id == User.currentUserId) {
            App.renderButton(`edit_${game.id}`, 'Edit', game);
            let editId = `button_edit_${game.id}`;
            document.getElementById(editId).addEventListener('click', e => { this.renderUpdateForm(game);});
            App.renderButton(`delete_${game.id}`, 'Delete', game);
            let deleteId = `button_delete_${game.id}`;
            document.getElementById(deleteId).addEventListener('click', e => { this.deleteGame(game);});
          }
        });
      } else {
        App.renderMiddleBox('no_games', 'No games yet.');
      }      
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
      'name': 'input_title', 
      'value': `${game.title}`, 
      'class': 'box-middle'});

    // Category
    App.renderMiddleBox('category', "Category");
    
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
        if (catButton.id == game.category_id) {
          catButton.checked = true;
        }
      });
    });

    f.append(it, window.box_category);

    // Submit
    let is = document.createElement('input');
    App.setAttributes(is, {
      'id': 'create_button',
      'class': 'submit',
      'type': 'submit',
      'value': 'Next'
    });
    f.append(is);

    f.addEventListener('submit', e => { this.handleUpdateForm(e, game);});
    boxes.appendChild(f);
  }

  // UPDATE
  static handleUpdateForm(e, game) {
    e.preventDefault();
    let titleInput = window.input_title.value;
    let categoryInput;
    document.querySelectorAll('input').forEach(input => {
      if (input.checked) {
        categoryInput = input.value;
      }
    });
    this.updateGame(game, titleInput, categoryInput);
  }

  static updateGame(game, title, category_id) {
    const bodyData = {game: {title, category_id}};    
    
    fetch(`http://localhost:3000/api/v1/games/${game.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    },
      body: JSON.stringify(bodyData)
    })
    .then(response => {
      if(response.ok) {
        response.json()
        .then(game => {
          let gameId = game.data.id;          
          Question.questionNumber = 0;
          Question.fetchUpdateQuestions(gameId);
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

  static markGameComplete(gameId, complete) {
    const bodyData = {game: {complete}};
    fetch(`http://localhost:3000/api/v1/games/${gameId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    },
      body: JSON.stringify(bodyData)
    })
    .then(response => {
      if(response.ok) {
        response.json()
        .then(game => {
          window.box_top_p.textContent = `Game updated!`;
          window.boxes.remove();
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

  // DESTROY
  static deleteGame(game) {
    let user = User.findById(User.currentUserId);
    fetch(`http://localhost:3000/api/v1/games/${game.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
      })
      .then(User.renderUser(user))
      .catch(error => console.error('Error:', error));
  }
}

Game.all = [];
Game.corrects = 0;
Game.questionsPlayed = 0;
