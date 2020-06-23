const User = require('../src/javascripts/user');

let x = 1;
console.log(x)
console.log(User.fetchNewUser)

// import { User.fetchNewUser } from "./src/javascripts/user.js";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: { attributes: { email: "milt@example.com", username: "Milt" }}})
  })
);

beforeEach(() => {
  fetch.mockClear();
});

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
  it('posts to create a user', async () => {
    // TODO: Complete
    debugger
    const createdUser = await User.fetchNewUser("Milt", "milt@example.com", "password");

    expect(createdUser.username)
  });
});
