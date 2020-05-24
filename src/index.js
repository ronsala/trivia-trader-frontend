const endPoint = "http://localhost:3000/api/v1/users";

document.addEventListener('DOMContentLoaded', () => {
  getUsers();

  const createUserForm = document.querySelector("#create-user-form");

  createUserForm.addEventListener("submit", (e) => createFormHandler(e));

  const userContainer = document.querySelector('#user-container');

  userContainer.addEventListener('click', e => {
    const id = parseInt(e.target.dataset.id);
    const user = User.findById(id);
    console.log('userContainer.addEventListener parseInt(e.target.dataset.id)', parseInt(e.target.dataset.id));
  });
});

function createFormHandler(e) {
  e.preventDefault();
  const usernameInput = document.querySelector('#input-username').value;
  const emailInput = document.querySelector('#input-email').value;
  postFetch(usernameInput, emailInput);
}

function postFetch(username, email) {
  const bodyData = {username, email};

  fetch(endPoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(user => {
    const userData = user.data;
    let newUser = new User(userData, userData.attributes);

    document.querySelector('#user-container').innerHTML += newUser.renderUserCard();
  });
}

function getUsers() {
  fetch(endPoint)
  .then(response => response.json())
  .then(users => {
    users.data.forEach(user => {
      let newUser = new User(user, user.attributes);
      document.querySelector('#user-container').innerHTML += newUser.renderUserCard();
    });
  });
}
