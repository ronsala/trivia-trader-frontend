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

    // let buttonHome = document.querySelector('#button_home');
    // let buttonHome = window.button_home;
    // if (buttonHome != null) {
    //   buttonHome.style.display = 'none';
    // }

    let boxTop = document.createElement('div');
    boxTop.className = 'box-top';
    boxTop.id = 'box-top';
    let boxTopP = document.createElement('p');
    boxTopP.id = 'box-top-p';
    boxTopP.textContent = 'Q: What do you want to do?';
    boxTop.appendChild(boxTopP);
    window.content.appendChild(boxTop);

    this.renderBoxes();

    let boxA = document.createElement('div');
    boxA.className = 'box-middle';
    boxA.id = 'box-a';
    let boxAP = document.createElement('p');
    boxAP.id = 'box-a-p';
    boxAP.textContent = 'A) Play game.';
    boxA.appendChild(boxAP);
    boxes.appendChild(boxA);
    boxA.addEventListener('click', e => {this.renderSignupSignin();});

    let boxB = document.createElement('div');
    boxB.className = 'box-middle';
    boxB.id = 'box-b';
    let boxBP = document.createElement('p');
    boxBP.id = 'box-b-p';
    boxBP.textContent = 'B) Make game.';
    boxB.appendChild(boxBP);
    boxes.appendChild(boxB);
    // boxB.addEventListener('click', e => {});

    let boxC = document.createElement('div');
    boxC.className = 'box-middle';
    boxC.id = 'box-c';
    let boxCP = document.createElement('p');
    boxCP.id = 'box-c-p';
    boxCP.textContent = 'C) Learn more about TriviaTrader.';
    boxC.appendChild(boxCP);
    boxes.appendChild(boxC);
    boxC.addEventListener('click', e => {
      console.log('clicked');
      this.renderAbout();
    });
    window.content.appendChild(boxes);
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
