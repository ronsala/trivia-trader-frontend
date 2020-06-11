// For higher level things like attaching event listeners.

class App {

  constructor() {
    this.adapter = new Adapter();
  }

  static renderAbout() {
    document.querySelector('.hero').style.display = 'none';
    let buttonHomeDiv = document.createElement('div');
    buttonHomeDiv.id = 'button-home';
    let a = document.createElement('a');
    a.href = "/";
    buttonHomeDiv.appendChild(a);
    let buttonHome = document.createElement('img');
    buttonHome.src = "src/images/button-home.svg";
    a.appendChild(buttonHome);

    document.querySelector('.container').prepend(buttonHomeDiv);
    document.querySelector('#box-top').textContent = 'About TriviaTrader';
    document.querySelector('#box-a').textContent = "TODO: Text Here";
    document.querySelector('#box-b').style.display = 'none';
    document.querySelector('#box-c').style.display = 'none';
  }

  static renderHome() {
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
    boxC.id = 'box-c';
    let boxCP = document.createElement('p');
    boxCP.textContent = 'C: Learn more about TriviaTrader.';
    boxC.appendChild(boxCP);
    boxes.appendChild(boxC);
    boxC.addEventListener('click', e => {
      console.log('boxC clicked', e);
      this.renderAbout();
    });
  }


}
