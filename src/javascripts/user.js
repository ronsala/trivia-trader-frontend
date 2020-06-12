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
        <input id="input-username" type="text" name="username" value="" placeholder="Enter a username..." class="boxes box-middle">
        <input id="input-email" type="text" name="email" value="" placeholder="Enter your email..." class="boxes box-middle">
        <input id="input-password" type="password" name="email" value="" placeholder="Enter a password..." class="boxes box-middle">
        <input id="input-password-confirm" type="password" name="email" value="" placeholder="Retype password..." class="boxes box-middle">
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
    this.fetchNewUser(usernameInput, emailInput);
  }

  static fetchNewUser(username, email) {

    const bodyData = {username, email};

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bodyData)
    })
    .then(response => console.log(response));
    // .then(response => response.json())
    // .then(user => {
    //   const userData = user.data;
    //   let newUser = new User(userData, userData.attributes);

    //   document.querySelector('#user-container').innerHTML += newUser.renderUserCard();
    // });
  }

  // SHOW
  renderUser() {
    return `
    <div data-id=${this.id}>
      <h3>${this.username}</h3>
      <p>${this.email}</p>
      <button data-id=${this.id}>edit</button>
    </div>
    <br>
    `;
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

  // DESTROY
  // TODO
}

User.all = [];