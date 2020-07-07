// For higher level things like attaching event listeners.

class App {

  constructor() {
    // this.adapter = new Adapter();
  }

  static renderAbout() {
    window.hero.style.display = 'none';
    document.querySelector('#button_home').style.display = 'block';
    document.querySelector('#box-top').textContent = 'About TriviaTrader';
    document.querySelector('#box-a').textContent = "TODO: Text Here";
    document.querySelector('#box-b').style.display = 'none';
    document.querySelector('#box-c').style.display = 'none';
  }

  static renderBoxes() {
    let boxes = document.createElement('div');
    boxes.class = 'boxes';
    boxes.id = 'boxes';
    window.content.appendChild(boxes);
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
    boxTop.id = 'box-top';
    let boxTopP = document.createElement('p');
    boxTopP.id = 'box-top-p';
    boxTopP.textContent = 'Q: What do you want to do?';
    boxTop.appendChild(boxTopP);
    window.content.appendChild(boxTop);

    this.renderBoxes();

    this.renderMiddleBox('A', 'A) Play game.');
    window.boxA.addEventListener('click', e => {this.renderSignupSignin();});

    this.renderMiddleBox('B', 'B) Make game.');
    let boxB = window.boxB;
    // // boxB.addEventListener('click', e => {});

    this.renderMiddleBox('C', 'C) Learn more about TriviaTrader.');
    boxC.addEventListener('click', e => {this.renderAbout();});
  }

  static renderMiddleBox(id, text) {
      let boxName = `box${id}`;
      window[boxName] = document.createElement('div');
      window[boxName].className = 'box-middle';
      window[boxName].id = boxName;
      let boxP = document.createElement('p');
      let pID = `${boxName}P`;
      boxP.id = pID;
      boxP.textContent = text;
      window[boxName].appendChild(boxP);
      window.boxes.appendChild(window[boxName]);
  }

  static renderSignupSignin() {
    window.hero.remove();
    window.boxes.remove();
    window.button_home.style.display = 'block';
    document.querySelector('#box-top-p').textContent = 'Q: Have you signed up for TriviaTrader?';
    let boxA = document.querySelector('#box-a');
    boxA.removeEventListener('click', e => {this.renderSignupSignin();});
    // TODO: Switch the event listener to login after fixing auth.
    // boxA.addEventListener('click', e => {Category.renderCategories();});
    boxA.addEventListener('click', e => {User.renderSigninForm();});
    document.querySelector('#box-a-p').textContent = 'A) Yes';
    let boxB = document.querySelector('#box-b');
    boxB.addEventListener('click', e => {User.renderNewForm();});
    document.querySelector('#box-b-p').textContent = 'B) No';
    document.querySelector('#box-c').style.display = 'none';
  }
}
