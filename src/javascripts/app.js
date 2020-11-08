class App {

  constructor() {
    // this.adapter = new Adapter();
  }

  static renderAbout() {
    window.hero.style.display = 'none';
    window.button_home.style.display = 'block';
    window.box_top.textContent = 'About TriviaTrader';
    window.boxes.remove();
    App.renderBoxes();
    this.renderMiddleBox('box_a', 'TriviaTrader is your place to show your trivia knowledge. Play games and create your own to stump your friends.');
  }

  static renderBoxes() {
    let boxes = document.createElement('div');
    boxes.class = 'boxes';
    boxes.id = 'boxes';
    window.content.appendChild(boxes);
  }

  static renderButton(id, text, model) {
    let b = document.createElement('button');
    b.id = `button_${id}`;
    b.setAttribute('data-id', `${model.id}`);
    b.innerHTML = text;
    window.boxes.appendChild(b);
  }

  static renderHome() {
    let loginStatus = document.createElement('p');
    loginStatus.id = 'login_status';
    window.content.prepend(loginStatus);

    if (window.localStorage.getItem('jwt_token')) {
      User.getCurrentUser();
    }

    let hero = document.createElement('div');
    hero.className = 'hero';
    hero.id = 'hero';
    let heroImage = document.createElement('img');
    heroImage.src = 'src/images/trivia-trader-hero.png';
    heroImage.id = 'hero_image';
    hero.appendChild(heroImage);
    window.content.appendChild(hero);

    let buttonHome = document.createElement('div');
    let buttonHomeA = document.createElement('a');
    buttonHomeA.href = '/';
    let buttonHomeImage = document.createElement('img');
    buttonHomeImage.src = 'src/images/button-home.png';
    buttonHomeImage.id = 'button_home';
    buttonHomeA.appendChild(buttonHomeImage);
    buttonHome.appendChild(buttonHomeA);
    window.content.appendChild(buttonHome);
    window.button_home.style.display = 'none';

    let boxTop = document.createElement('div');
    boxTop.className = 'box-top';
    boxTop.id = 'box_top';
    let boxTopP = document.createElement('p');
    boxTopP.id = 'box_top_p';
    boxTopP.textContent = 'Q: What do you want to do?';
    boxTop.appendChild(boxTopP);
    window.content.appendChild(boxTop);

    this.renderBoxes();

    this.renderMiddleBox('a', 'A) Play game.');
    window.box_a.addEventListener('click', e => {Category.renderCategories();});

    this.renderMiddleBox('b', 'B) Make game.');
    window.setTimeout(() => {
      if (window.localStorage.getItem('jwt_token')) {
        window.box_b.addEventListener('click', e => {Game.renderNewForm();});
      } else {
        window.box_b.addEventListener('click', e => {App.renderSignupLogin();});
      }
    }, 250);

    this.renderMiddleBox('c', 'C) See users.');
    window.box_c.addEventListener('click', e => {User.renderUsers();});

    this.renderMiddleBox('d', 'D) Learn more about TriviaTrader.');
    window.box_d.addEventListener('click', e => {this.renderAbout();});

    window.setTimeout(this.selectLoggingBox, 750);
}

  static renderMiddleBox(id, text) {
    let boxId = `box_${id}`;
    window[boxId] = document.createElement('div');
    window[boxId].className = 'box-middle';
    window[boxId].id = boxId;
    let boxP = document.createElement('p');
    let pID = `${boxId}_p`;
    boxP.id = pID;
    boxP.textContent = text;
    window[boxId].appendChild(boxP);
    let boxes = document.getElementById('boxes');
    boxes.append(window[boxId]);
  }

  static renderSignupLogin() {
    window.hero.remove();
    window.boxes.remove();
    window.button_home.style.display = 'block';
    window.box_top_p.textContent = 'Q: Have you signed up for TriviaTrader?';
    this.renderBoxes();

    this.renderMiddleBox('a', 'A) Yes');
    window.box_a.addEventListener('click', e => {User.renderLoginForm();});

    this.renderMiddleBox('b', 'B) No');
    window.box_b.addEventListener('click', e => {User.renderNewForm();});
  }

  static selectLoggingBox() {
    if(window.login_status.textContent) {
      App.renderMiddleBox('e', 'E) Log out.');
      window.box_e.addEventListener('click', e => {User.logout();});
    } else {
      App.renderMiddleBox('e', 'E) Sign up/Log in.');
      window.box_e.addEventListener('click', e => {App.renderSignupLogin();});
    }
  }

  static setAttributes(el, attrs) {
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
}
