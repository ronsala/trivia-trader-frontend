const endPoint = "http://localhost:3000/api/v1/users";

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded");
  getUsers();
});

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