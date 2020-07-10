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
    window.boxes.remove();
    window.box_top_p.textContent = 'Q: What is your info?';
    App.renderBoxes();
    let form = document.createElement('div');
    form.innerHTML =  `
      <form id="create_user_form">
        <input id="input_username" type="text" autocomplete="username" name="username" value="" placeholder="Enter a username..." class="boxes box-middle">

        <input id="input_email" type="text" autocomplete="email" name="email" value="" placeholder="Enter your email..." class="boxes box-middle">

        <input id="input_password" type="password" autocomplete="new-password" name="password" value="" placeholder="Enter a password..." class="boxes box-middle">

        <input id="input_password_confirm" type="password" autocomplete="new_password" name="password_confirm" value="" placeholder="Retype password..." class="boxes box-middle">

        <input class="btn" id="create_button" type="submit" name="submit" value="Sign Up" class="submit">
      </form>
    `;
    boxes.appendChild(form);
    document.querySelector('#create_user_form').addEventListener('submit', e => { this.handleCreateForm(e);});
  }

  // CREATE
  static handleCreateForm(e) {
    e.preventDefault();
    // const usernameInput = document.querySelector('#input_username').value;
    const usernameInput = window.input_username.value;
    const emailInput = window.input_email.value;
    const passwordInput = window.input_password.value;
    const passwordConfirmInput = window.input_password_confirm.value;

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
    window.boxes.remove();
    window.box_top_p.textContent = `Q: Who is ${user.username}?`;
    App.renderBoxes();
    App.renderMiddleBox('username', `Username: ${user.username}`);
    App.renderMiddleBox('email', `Email: ${user.email}`);
    App.renderButton('edit', 'Edit', user);
    window.button_edit.addEventListener('click', e => { this.renderUpdateForm(user);});
  }

  // EDIT
  static renderUpdateForm(user) {
    window.box_top_p.textContent = "Q: What's your new info?";
    window.boxes.remove();
    App.renderBoxes();

    let form = document.createElement('div');
    form.innerHTML =  `
      <form id="edit_user_form" "data-id=${user.id} >
        <label>Username</label>
        <p><input id='input_username' type="text" name="username" value="${user.username}" class="boxes box-middle"></p>

        <label>Email</label>
        <input id='input_email' type="text" name="email" value="${user.email}" class="boxes box-middle">
        <br>

        <input id='submit' type="submit" value="Save" class="submit">
      </form>
    `;
    boxes.appendChild(form);
    form.addEventListener('submit', e => { this.handleUpdateForm(e, user);});
  }

  // UPDATE
  static handleUpdateForm(e, user) {
    e.preventDefault();
    const username = e.target.querySelector('#input_username').value;
    const email = e.target.querySelector('#input_email').value;
    this.fetchUpdatedUser(user, username, email);
  }

  static fetchUpdatedUser(user, username, email) {
    document.getElementById('edit_user_form').style.display = 'none';
    const bodyJSON = { username, email };
    fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyJSON)
      })
      .then(res => res.json())
      .then(user => {
        const userData = user.data;
        let newUser = new User(userData, userData.attributes);
        this.renderUser(newUser);
      });
  }

  // TODO
  // DESTROY

  // SIGNIN
  static renderSigninForm() {
    let boxes = document.querySelector('.boxes');

    document.querySelector('#box_top_p').textContent = 'Q: What is your info?';
    document.querySelector('#box_a').style.display = 'none';
    document.querySelector('#box_b').style.display = 'none';
    let form = document.createElement('div');
    form.innerHTML =  `
      <form id="signin-user-form">

        <input id="input-email" type="text" autocomplete="email" name="email" value="" placeholder="Enter your email..." class="boxes box-middle">

        <input id="input-password" type="password" autocomplete="password" name="password" value="" placeholder="Enter your password..." class="boxes box-middle">

        <input id="create-button" type="submit" name="submit" value="Sign In" class="submit">
      </form>
    `;
    boxes.appendChild(form);
    document.querySelector('#create-user-form').addEventListener('submit', e => { this.handleSigninForm(e); });
  }

  static handleSigninForm(e) {
    e.preventDefault();
    const emailInput = document.querySelector('#input-email').value;
    const passwordInput = document.querySelector('#input-password').value;

    this.fetchAuthUser(emailInput, passwordInput);
  }

  // static fetchAuthUser(email, password) {

  //   const bodyData = {"auth": {"email": email, "password": password}};

  //   fetch("http://localhost:3000/api/v1/user_token", {
  //     method: "POST",
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify(bodyData)
  //   })
  //   .then(response => response.json())
  //   .then(console.log(response))
  //   // .then(user => {
  //     // const userData = user.data;
  //     // let newUser = new User(userData, userData.attributes);

  //     // this.renderUser(newUser);
  //   // });
  // }
}
// }

User.all = [];

module.exports = User;