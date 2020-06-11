// For higher level things like attaching event listeners.

class App {

  constructor() {
    this.adapter = new Adapter();
  }

  static renderAbout() {
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.button-home').style.display = 'block';
    document.querySelector('#box-top').textContent = 'About TriviaTrader';
    document.querySelector('#box-a').textContent = "TODO: Text Here";
    document.querySelector('#box-b').style.display = 'none';
    document.querySelector('#box-c').style.display = 'none';
  }

  static renderHome() {
    document.querySelector('.button-home').style.display = 'none';

    let boxes = document.querySelector('.boxes');

    let boxTop = document.createElement('div');
    boxTop.className = 'box-top';
    boxTop.id = 'box-top';
    let boxTopP = document.createElement('p');
    boxTopP.textContent = 'Q: What do you want to do?';
    boxTop.appendChild(boxTopP);
    boxes.appendChild(boxTop);

    let boxA = document.createElement('div');
    boxA.className = 'box-middle';
    boxA.id = 'box-a';
    let boxAP = document.createElement('p');
    boxAP.textContent = 'A: Play game.';
    boxA.appendChild(boxAP);
    boxes.appendChild(boxA);
    boxA.addEventListener('click', e => {
      this.renderSignupSignin();
    });
    boxA.addEventListener('click', e => {this.renderSignupSignin();});

    let boxB = document.createElement('div');
    boxB.className = 'box-middle';
    boxB.id = 'box-b';
    let boxBP = document.createElement('p');
    boxBP.textContent = 'B: Create game.';
    boxB.appendChild(boxBP);
    boxes.appendChild(boxB);
    boxB.addEventListener('click', e => {
    });

    let boxC = document.createElement('div');
    boxC.className = 'box-middle';
    boxC.id = 'box-c';
    let boxCP = document.createElement('p');
    boxCP.textContent = 'C: Learn more about TriviaTrader.';
    boxC.appendChild(boxCP);
    boxes.appendChild(boxC);
    boxC.addEventListener('click', e => {
      console.log('clicked');
      this.renderAbout();
    });
  }

  static renderSignup() {

  }

  static renderSignupSignin() {
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.button-home').style.display = 'block';
    document.querySelector('#box-top').textContent = 'Q: Have you signed up for TriviaTrader?';
    let boxA = document.querySelector('#box-a');
    boxA.removeEventListener('click', e => {this.renderSignupSignin();});
    boxA.addEventListener('click', e => {this.renderSignup();});
    boxA.textContent = "A) Yes";
    document.querySelector('#box-b').textContent = "B) No";
    document.querySelector('#box-c').style.display = 'none';
  }

}
