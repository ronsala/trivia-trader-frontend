class User {

  constructor(user, userAttributes) {
    this.id = user.id;
    this.username = userAttributes.username;
    this.email = userAttributes.email;
    User.all.push(this);
  }

  static findById(id) {
    return this.all.find(user => user.id == id);
  }

  // TODO
  // INDEX
  static renderUsers() {
    fetch('http://localhost:3000/api/v1/users')
    .then(response => response.json())
    .then(users => {
      users.data.forEach(user => {
        let newUser = new User(user, user.attributes);
        document.querySelector('#user-container').innerHTML += newUser.renderUserCard();
      });
    });
  }

  // NEW
  static renderNewForm() {
    let boxes = document.querySelector('.boxes');

    document.querySelector('#box-top-p').textContent = 'Q: What is your info?';
    document.querySelector('#box-a').style.display = 'none';
    document.querySelector('#box-b').style.display = 'none';
    let form = document.createElement('div');
    form.innerHTML =  `
      <form id="create-user-form">
        <input id="input-username" type="text" autocomplete="username" name="username" value="" placeholder="Enter a username..." class="boxes box-middle">

        <input id="input-email" type="text" autocomplete="email" name="email" value="" placeholder="Enter your email..." class="boxes box-middle">

        <input id="input-password" type="password" autocomplete="new-password" name="password" value="" placeholder="Enter a password..." class="boxes box-middle">

        <input id="input-password-confirm" type="password" autocomplete="new-password" name="password_confirm" value="" placeholder="Retype password..." class="boxes box-middle">

        <input id="create-button" type="submit" name="submit" value="Sign Up" class="submit">
      </form>
    `;
    boxes.appendChild(form);
    document.querySelector('#create-user-form').addEventListener('submit', e => { this.handleCreateForm(e);} );
  }

  // CREATE
  static handleCreateForm(e) {
    e.preventDefault();
    const usernameInput = document.querySelector('#input-username').value;
    const emailInput = document.querySelector('#input-email').value;
    const passwordInput = document.querySelector('#input-password').value;
    const passwordConfirmInput = document.querySelector('#input-password-confirm').value;

    if (passwordInput != passwordConfirmInput) {
      alert("Passwords do not match. Please try again");
      return false;
    }

    this.fetchNewUser(usernameInput, emailInput, passwordInput);
  }

  static fetchNewUser(username, email, password) {

    const bodyData = {username, email, password};

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(user => {
      const userData = user.data;
      let newUser = new User(userData, userData.attributes);

      this.renderUser(newUser);
    });
  }

  // SHOW
  static renderUser(user) {
    document.querySelector("#create-user-form").style.display = 'none';

    let boxes = document.querySelector('#boxes');

    let q = `<p>Q: Who is ${user.username}?</p>`;
    document.querySelector('#box-top-p').innerHTML = q;

    let boxA = document.querySelector('#box-a');
    boxA.style.display = 'block';
    boxA.innerHTML = `<p>Username: ${user.username}</p>`;

    let boxB = document.querySelector('#box-b');
    boxB.style.display = 'block';
    boxB.innerHTML = `<p>Email: ${user.email}</p>`;

    let editButton = document.createElement('div');
    editButton.innerHTML = `<button data-id=${user.id}>edit</button>`;
    boxes.appendChild(editButton);
  }

  // EDIT
  renderUpdateForm() {
    return `
      <form data-id=${this.id} >
        <h3>Edit User</h3>

        <label>Username</label>
        <input id='input-username' type="text" name="username" value="${this.username}" class="input-text">
        <br>

        <label>Email</label>
        <input id='input-email' type="text" name="email" value="${this.email}" class="input-text">
        <br>

        <input id='edit-button' type="submit" value="Edit User" class="submit">
      </form>
    `;
  }

  // UPDATE
  static handleUpdateForm(e) {
    e.preventDefault();
    const id = parseInt(e.target.dataset.id);
    const user = User.findById(id);
    const username = e.target.querySelector('#input-username').value;
    const email = e.target.querySelector('#input-email').value;
    fetchUpdatedUser(user, username, email);
  }

  fetchUpdatedUser(user, username, email) {
    const bodyJSON = { username, email };
    fetch(`${endPoint}/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyJSON)
      })
      .then(res => res.json())
      .then(updatedUser => console.log(updatedUser));
  }

  // TODO
  // DESTROY
}

User.all = [];

module.exports = User;