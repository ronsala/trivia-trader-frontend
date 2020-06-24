var expect = require('chai').expect;
const User = require('../src/javascripts/user');
describe('User', function() {
  debugger

  it('should exist', function() {
    var User = require('../src/javascripts/user.js');
    debugger
    expect(User).to.not.be.undefined;
  })
})

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
