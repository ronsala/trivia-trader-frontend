// For higher level things like attaching event listeners.

class App {

  constructor() {
    // this.adapter = new Adapter();
  }

  static renderAbout() {
    document.querySelector('.hero').style.display = 'none';
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
    this.renderMiddleBoxes(3);

    let box1 = window.box1;
    box1P.textContent = 'A) Play game.';
    box1.appendChild(box1P);
    box1.addEventListener('click', e => {this.renderSignupSignin();});

    // let boxB = document.createElement('div');
    // boxB.className = 'box-middle';
    // boxB.id = 'box-b';
    // let boxBP = document.createElement('p');
    // boxBP.id = 'box-b-p';
    // boxBP.textContent = 'B) Make game.';
    // boxB.appendChild(boxBP);
    // boxes.appendChild(boxB);
    // // boxB.addEventListener('click', e => {});

    // let boxC = document.createElement('div');
    // boxC.className = 'box-middle';
    // boxC.id = 'box-c';
    // let boxCP = document.createElement('p');
    // boxCP.id = 'box-c-p';
    // boxCP.textContent = 'C) Learn more about TriviaTrader.';
    // boxC.appendChild(boxCP);
    // boxes.appendChild(boxC);
    // boxC.addEventListener('click', e => {
    //   console.log('clicked');
    //   this.renderAbout();
    // });
    // window.content.appendChild(boxes);
  }

  // static renderMiddleBoxes(num) {
  //   let i;
  //   let boxName;
  //   for (let i = 1; i <= num; i++) {
  //     boxName = `box${i}`;
  //     window[boxName] = document.createElement('div');
  //     window[boxName].className = 'box-middle';
  //     window[boxName].id = boxName;
  //     let boxP = document.createElement('p');
  //     let pID = `${boxName}P`;
  //     boxP.id = pID;
  //     window[boxName].appendChild(boxP);
  //     window.boxes.appendChild(window[boxName]);
  //   }
  // }

  static renderMiddleBox(text) {
    let i;
    let boxName;
    for (let i = 1; i <= num; i++) {
      boxName = `box${i}`;
      window[boxName] = document.createElement('div');
      window[boxName].className = 'box-middle';
      window[boxName].id = boxName;
      let boxP = document.createElement('p');
      let pID = `${boxName}P`;
      boxP.id = pID;
      window[boxName].appendChild(boxP);
      window.boxes.appendChild(window[boxName]);
    }
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
