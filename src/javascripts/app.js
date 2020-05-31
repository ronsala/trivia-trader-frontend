// For higher level things like attaching event listeners.

class App {

  constructor() {
    this.adapter = new Adapter();
  }

  static renderHomePage() {
    let boxTop = document.querySelector('.box-top');
    let p = document.createElement('p');
    p.textContent = 'Q: What do you want to do?';
    boxTop.appendChild(p);
  }

  attachEventListeners() {
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
