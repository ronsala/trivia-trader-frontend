// For higher level things like attaching event listeners.

class App {

  constructor() {
    // this.adapter = new Adapter();
  }

  static renderAbout() {
    window.hero.style.display = 'none';
    window.button_home.style.display = 'block';
    window.box_top.textContent = 'About TriviaTrader';
    // TODO:
    window.box_a.textContent = "TODO: Text Here";
    window.box_b.style.display = 'none';
    window.box_c.style.display = 'none';
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
    let destination = 'play';
    // TODO: Uncomment after JWT works:
    // window.box_a.addEventListener('click', e => {this.renderSignupSignin(destination);});
    // TODO: rm after JWT works:
    window.box_a.addEventListener('click', e => {Category.renderCategories();});

    this.renderMiddleBox('b', 'B) Make game.');
    window.box_b.addEventListener('click', e => {});

    this.renderMiddleBox('c', 'C) Learn more about TriviaTrader.');
    window.box_c.addEventListener('click', e => {this.renderAbout();});
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

  static renderSignupSignin(destination) {
    window.hero.remove();
    window.boxes.remove();
    window.button_home.style.display = 'block';
    window.box_top_p.textContent = 'Q: Have you signed up for TriviaTrader?';
    this.renderBoxes();

    this.renderMiddleBox('a', 'A) Yes');
    window.box_a.addEventListener('click', e => {User.renderSigninForm(destination);});

    this.renderMiddleBox('b', 'B) No');
    window.box_b.addEventListener('click', e => {User.renderNewForm();});
  }

  static setAttributes(el, attrs) {
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
}
