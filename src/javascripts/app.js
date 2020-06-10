// For higher level things like attaching event listeners.

class App {

  constructor() {
    this.adapter = new Adapter();
  }

  static renderHomePage() {
    let boxes = document.querySelector('.boxes');

    let boxTop = document.createElement('div');
    boxTop.className = 'box-top';
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
      console.log('boxA clicked', e);
    });

    let boxB = document.createElement('div');
    boxB.className = 'box-middle';
    boxB.id = 'box-b';
    let boxBP = document.createElement('p');
    boxBP.textContent = 'B: Create game.';
    boxB.appendChild(boxBP);
    boxes.appendChild(boxB);
    boxB.addEventListener('click', e => {
      console.log('boxB clicked', e);
    });

    let boxC = document.createElement('div');
    boxC.className = 'box-middle';
    boxC.id = 'box-a';
    let boxCP = document.createElement('p');
    boxCP.textContent = 'C: Learn more about TriviaTrader.';
    boxC.appendChild(boxCP);
    boxes.appendChild(boxC);
    boxC.addEventListener('click', e => {
      console.log('boxC clicked', e);
    });
  }
}
