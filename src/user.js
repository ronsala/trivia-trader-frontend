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

  static getUsers() {
    fetch(endPoint)
    .then(response => response.json())
    .then(users => {
      users.data.forEach(user => {
        let newUser = new User(user, user.attributes);
        document.querySelector('#user-container').innerHTML += newUser.renderUserCard();
      });
    });
  }

  static renderNewForm() {
    document.querySelector('.form-container').innerHTML =  `
      <form id="create-user-form">
        <h2>Sign Up</h2>

        <input id="input-username" type="text" name="username" value="" placeholder="Enter a username..." class="input-text">
        <br>
        <input id="input-email" type="text" name="email" value="" placeholder="Enter your email..." class="input-text">
        <br>
        <input id="create-button" type="submit" name="submit" value="Sign Up" class="submit">
      </form>
    `;
  }

  static createFormHandler(e) {
    e.preventDefault();
    const usernameInput = document.querySelector('#input-username').value;
    const emailInput = document.querySelector('#input-email').value;
    postFetch(usernameInput, emailInput);
  }

  renderUserCard() {
    return `
    <div data-id=${this.id}>
      <h3>${this.username}</h3>
      <p>${this.email}</p>
      <button data-id=${this.id}>edit</button>
    </div>
    <br>
    `;
  }

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
}
User.all = [];