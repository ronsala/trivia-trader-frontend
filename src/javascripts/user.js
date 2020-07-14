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

  // NEW
  static renderNewForm() {
    window.box_top_p.textContent = 'Q: What is your info?';
    window.boxes.remove();
    App.renderBoxes();

    let f = document.createElement('form');
    f.setAttribute('id', 'edit_user_form');

    let iu = document.createElement('input');
    App.setAttributes(iu, {
      'id': 'input_username',
      'class': 'box-middle',
      'type': 'text', 
      'autocomplete': 'username',
      'name': 'username', 
      'placeholder': 'Enter a username...'
    });

    let ie = document.createElement('input');
    App.setAttributes(ie, {
      'id': 'input_email', 
      'class': 'box-middle',
      'type': 'text', 
      'autocomplete': 'email',
      'name': 'email', 
      'placeholder': 'Enter your email...', 
    });

    let ip = document.createElement('input');
    App.setAttributes(ip, {
      'id': 'input_password', 
      'class': 'box-middle',
      'type': 'password', 
      'autocomplete': 'new-password',
      'name': 'password', 
      'placeholder': 'Enter a password...', 
    });

    let ipc = document.createElement('input');
    App.setAttributes(ipc, {
      'id': 'input_password_confirm', 
      'class': 'box-middle',
      'type': 'password', 
      'autocomplete': 'new-password',
      'name': 'password_confirm', 
      'placeholder': 'Retype password...', 
    });

    let is = document.createElement('input');
    App.setAttributes(is, {
      'id': 'create_button',
      'class': 'submit',
      'type': 'submit',
      'value': 'Sign Up'
    });

    f.append(iu, ie, ip, ipc, is);
    f.addEventListener('submit', e => { this.handleCreateForm(e);});
    boxes.append(f);
    //
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

    let f = document.createElement('form');
    App.setAttributes(f, {
      'id': 'edit_user_form',
      'data-id': `${user.id}`
    });

    let lu = document.createElement('label');
    lu.textContent = 'Username';

    let iu = document.createElement('input');
    App.setAttributes(iu, {
      'id': 'input_username', 
      'type': 'text', 
      'name': 'username', 
      'value': `${user.username}`, 
      'class': 'box-middle'});

    let le = document.createElement('label');
    le.textContent = 'Email';

    let ie = document.createElement('input');
    App.setAttributes(ie, {
      'id': 'input_email', 
      'type': 'text', 
      'name': 'email', 
      'value': `${user.email}`, 
      'class': 'box-middle'
    });

    let is = document.createElement('input');
    App.setAttributes(is, {
      'id': 'submit',
      'type': 'submit',
      'value': 'Save',
      'class': 'submit'
    });

    f.append(lu, iu, le, ie, is);
    f.addEventListener('submit', e => { this.handleUpdateForm(e, user);});
    boxes.append(f);
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