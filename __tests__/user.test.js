const User = require('../src/javascripts/user');

let u =
{
  id: "99",
  type: "user",
  attributes: {
    username: "Andy",
    email: "andy@ex.io"
  }
}

describe("User", () => {
  test('creates a user', () => {
    const newUser = new User(u, u.attributes);
    expect(newUser).toBeInstanceOf(User);
  });
});
