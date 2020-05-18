class User {

  constructor(user, userAttributes) {
    this.id = user.id;
    this.username = userAttributes.username;
    this.email = userAttributes.email;
    User.all.push(this);
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
}

User.all = [];