// For higher level things like attaching event listeners.

class App {

  constructor() {
    this.adapter = new Adapter();
  }

  static renderHomePage() {
    let boxTop = document.querySelector('.box-top');
    let boxTopP = document.createElement('p');
    boxTopP.textContent = 'Q: What do you want to do?';
    boxTop.appendChild(boxTopP);

    let boxA = document.querySelector('#box-a');
    let boxAP = document.createElement('p');
    boxAP.textContent = 'A: Play game.';
    boxA.appendChild(boxAP);
    boxA.addEventListener('click', e => {
      console.log('boxA clicked', e)
    }
    );

    let boxB = document.querySelector('#box-b');
    let boxBP = document.createElement('p');
    boxBP.textContent = 'B: Create game.';
    boxB.appendChild(boxBP);
    boxB.addEventListener('click', e => {
      console.log('boxB clicked', e)
    }
    );

    let boxC = document.querySelector('#box-c');
    let boxCP = document.createElement('p');
    boxCP.textContent = 'C: See leader board.';
    boxC.appendChild(boxCP);
    boxC.addEventListener('click', e => {
      console.log('boxC clicked', e)
    }
    );

    let boxD = document.querySelector('#box-d');
    let boxDP = document.createElement('p');
    boxDP.textContent = 'D: Learn more about TriviaTrader.';
    boxD.appendChild(boxDP);
    boxD.addEventListener('click', e => {
      console.log('boxD clicked', e)
    }
    );

    let boxBottom = document.querySelector('.box-bottom');
    let boxBottomP = document.createElement('p');
    boxBottomP.textContent = 'Bottom: Play game.';
    boxBottom.appendChild(boxBottomP);
    boxBottom.addEventListener('click', e => {
      console.log('boxBottom clicked', e)
    }
    );
  }

  static attachEventListeners() {
    // document.querySelector('#signup-button').addEventListener('click', e => {
    //   User.renderNewForm();
    // });

    // const createUserForm = document.querySelector(".form-container");

    // createUserForm.addEventListener("submit", (e) => createFormHandler(e));

    // const userContainer = document.querySelector('#user-container');

    // // Render edit form once button is clicked.
    // userContainer.addEventListener('click', e => {
    //   const id = parseInt(e.target.dataset.id);
    //   const user = User.findById(id);
    //   document.querySelector('#update-user').innerHTML = user.renderUpdateForm();
    // });

    // // Listen for the submit event of the edit form and handle the data.
    // document.querySelector('#update-user').addEventListener('submit', e => updateFormHandler(e));
  }
}
