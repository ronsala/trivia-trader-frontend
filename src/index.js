const endPoint = "http://localhost:3000/api/v1/users";

document.addEventListener('DOMContentLoaded', () => {
  getUsers();

  const createUserForm = document.querySelector("#create-user-form");

  createUserForm.addEventListener("submit", (e) => createFormHandler(e));
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
    const userData = user.data.attributes;
    const userMarkup = `
    <div data-id=${user.id}>
      <h3>${userData.username}</h3>
      <p>${userData.email}</p>
      <button data-id=${userData.id}>edit</button>
    </div>
    <br>`;

    document.querySelector('#user-container').innerHTML += userMarkup;
  });
}

function getUsers() {
  fetch(endPoint)
  .then(response => response.json())
  .then(users => {
    users.data.forEach(user => {
      const userMarkup = `
        <div data-id=${user.id}>
          <h3>${user.attributes.username}</h3>
          <p>${user.attributes.email}</p>
          <button data-id=${user.id}>edit</button>
        </div>
        `;

        document.querySelector('#user-container').innerHTML += userMarkup;
    });
  });
}