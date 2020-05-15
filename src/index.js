const endPoint = "http://localhost:3000/api/v1/users";

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded");
  getUsers();
});

function getUsers() {
  fetch(endPoint)
  .then(response => response.json())
  .then(users => {
    console.log(users);
  });
}