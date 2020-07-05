// module.exports = {
  // sayHello: function(){
  //   return 'hello';
  // },
  // addNumbers: function(value1, value2){
  //   return value1 + value2;
  // },


class User {

  constructor(user, userAttributes) {
    this.id = user.id;
    this.username = userAttributes.username;
    this.email = userAttributes.email;
    User.all.push(this);
  }

  static testFunction() {
    return "this is a test";
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
    document.querySelector('#create-user-form').addEventListener('submit', e => { this.handleCreateForm(e);});
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

    let boxUsername = document.createElement('div');
    boxUsername.className = 'box-middle';
    boxUsername.id = 'box-username';
    let boxUsernameP = document.createElement('p');
    boxUsernameP.id = 'box-username-p';
    boxUsernameP.textContent = `Username: ${user.username}`;
    boxUsername.appendChild(boxUsernameP);
    boxes.appendChild(boxUsername);

    let boxEmail = document.createElement('div');
    boxEmail.className = 'box-middle';
    boxEmail.id = 'box-email';
    let boxEmailP = document.createElement('p');
    boxEmailP.id = 'box-email-p';
    boxEmailP.textContent = `Email: ${user.email}`;
    boxEmail.appendChild(boxEmailP);
    boxes.appendChild(boxEmail);

    let editButtonDiv = document.querySelector('#edit-button-div');

    if(editButtonDiv == null) {
      let editButtonDiv = document.createElement('div');
      editButtonDiv.id = "edit-button-div";
      editButtonDiv.innerHTML = `<button id="edit-button" data-id=${user.id}>Edit</button>`;
      boxes.appendChild(editButtonDiv);
      let editButton = document.getElementById('edit-button');
      editButton.addEventListener('click', e => { this.renderUpdateForm(user);});
    } else {
      editButtonDiv.style.display = 'block';
    }

    let editUserForms = document.querySelectorAll('#edit-user-form');

    if(editUserForms.length != 0) {
      editUserForms.forEach( form => {
        form.style.display = 'none';
      });
    }
  }

  // EDIT
  static renderUpdateForm(user) {
    let boxes = document.querySelector('.boxes');

    document.querySelector('#box-top-p').textContent = "Q: What's your new info?";
    document.querySelector('#box-a').style.display = 'none';
    document.querySelector('#box-b').style.display = 'none';
    document.querySelector('#edit-button-div').style.display = 'none';
    let form = document.createElement('div');
    form.innerHTML =  `
      <form id="edit-user-form" "data-id=${user.id} >
        <label>Username</label>
        <p><input id='input-username' type="text" name="username" value="${user.username}" class="boxes box-middle"></p>

        <label>Email</label>
        <input id='input-email' type="text" name="email" value="${user.email}" class="boxes box-middle">
        <br>

        <input id='submit' type="submit" value="Save" class="submit">
      </form>
    `;
    form.style.display = 'block';
    boxes.appendChild(form);
    // document.querySelector('#edit-user-form').addEventListener('submit', e => { this.handleUpdateForm(e, user);});
    form.addEventListener('submit', e => { this.handleUpdateForm(e, user);});
  }

  // UPDATE
  static handleUpdateForm(e, user) {
    e.preventDefault();
    const username = e.target.querySelector('#input-username').value;
    const email = e.target.querySelector('#input-email').value;
    this.fetchUpdatedUser(user, username, email);
  }

  static fetchUpdatedUser(user, username, email) {
    document.getElementById('edit-user-form').style.display = 'none';
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

    document.querySelector('#box-top-p').textContent = 'Q: What is your info?';
    document.querySelector('#box-a').style.display = 'none';
    document.querySelector('#box-b').style.display = 'none';
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