const User = require('../src/javascripts/user');
let user1 =
{
  id: "1",
  type: "user",
  attributes: {
    username: "Andy",
    email: "andy@ex.io"
  }
};

let user2 =
{
  id: "2",
  type: "user",
  attributes: {
    username: "Jenny",
    email: "jenny@ex.com"
  }
};

User.all.push(user1, user2);

describe("constructor", () => {
  it('creates a user', () => {
    const newUser = new User(user1, user1.attributes);
    expect(newUser).toBeInstanceOf(User);
  });
});

describe('findById', () => {
  it('finds a user', () => {
    const foundUser = User.findById(2);
    expect(foundUser.attributes.username).toMatch(/Jenny/);
  });
});

describe('fetchNewUser', () => {
  it('posts to create a user', () => {
    // TODO: Complete
    return false
  });
});
