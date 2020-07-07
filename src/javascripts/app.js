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
    window.box_a.addEventListener('click', e => {this.renderSignupSignin();});

    this.renderMiddleBox('b', 'B) Make game.');
    window.box_b.addEventListener('click', e => {});

    this.renderMiddleBox('c', 'C) Learn more about TriviaTrader.');
    window.box_c.addEventListener('click', e => {this.renderAbout();});
  }

  static renderMiddleBox(id, text) {
    let boxName = `box_${id}`;
    window[boxName] = document.createElement('div');
    window[boxName].className = 'box-middle';
    window[boxName].id = boxName;
    let boxP = document.createElement('p');
    let pID = `${boxName}_p`;
    boxP.id = pID;
    boxP.textContent = text;
    window[boxName].appendChild(boxP);
    console.log("boxName:", boxName)
    console.log("window[boxName]:", window[boxName])
    let boxes = document.getElementById('boxes');
    boxes.appendChild(window[boxName]);
  }

  static renderSignupSignin() {
    window.hero.remove();
    window.boxes.remove();
    window.button_home.style.display = 'block';
    window.box_top_p.textContent = 'Q: Have you signed up for TriviaTrader?';
    this.renderBoxes();

    this.renderMiddleBox('a', 'A) Yes');
    // TODO: Switch the event listener to login after fixing auth.
    window.box_a.addEventListener('click', e => {User.renderSigninForm();});

    this.renderMiddleBox('b', 'B) No');
    window.box_b.addEventListener('click', e => {User.renderNewForm();});
  }
}
