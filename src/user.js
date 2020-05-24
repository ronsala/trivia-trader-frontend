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
    return this.all.find(user => user.id == id);
  }

  renderUpdateForm() {
    return `
      <form data-id=${this.id} >
        <h3>Edit User</h3>

        <label>Username</label>
        <input id='input-username' type="text" name="username" value="${this.username}" class="input-text">
        <br>

        <label>Email</label>
        <input id='input-email' type="text" name="email" value="${this.email}" class="input-text">
        <br>

        <input id='edit-button' type="submit" value="Edit User" class="submit">
      </form>
    `;
  }
}
User.all = [];