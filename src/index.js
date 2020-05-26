// Entry point to front end.

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.attachEventListeners();
  User.getUsers();
});

// function updateFormHandler(e) {
//   e.preventDefault();
//   const id = parseInt(e.target.dataset.id);
//   const user = User.findById(id);
//   const username = e.target.querySelector('#input-username').value;
//   const email = e.target.querySelector('#input-email').value;
//   patchUser(user, username, email);
// }

// function patchUser(user, username, email) {
//   const bodyJSON = { username, email };
//   fetch(`${endPoint}/${user.id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(bodyJSON)
//     })
//     .then(res => res.json())
//     .then(updatedUser => console.log(updatedUser));
// }

// function postFetch(username, email) {
//   const bodyData = {username, email};

//   fetch(endPoint, {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify(bodyData)
//   })
//   .then(response => response.json())
//   .then(user => {
//     const userData = user.data;
//     let newUser = new User(userData, userData.attributes);

//     document.querySelector('#user-container').innerHTML += newUser.renderUserCard();
//   });
// }
