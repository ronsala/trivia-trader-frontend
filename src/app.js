// For higher level things like attaching event listeners.

class App {

  constructor() {
    this.adapter = new Adapter();
  }

  attachEventListeners() {
    document.querySelector('#signup-button').addEventListener('click', e => {
      User.renderNewForm();
    });

    // const createUserForm = document.querySelector("#create-user-form");

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
