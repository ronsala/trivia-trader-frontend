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

  static findById(id) {
    console.log('findById(id) id', id);
    console.log('return', this.all.find(user => user.id == id));
    return this.all.find(user => user.id == id);
  }
}
User.all = [];