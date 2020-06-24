const User = require('../src/javascripts/user');

describe('User', () => {
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
    const newUser = new User.constructor(user1, user1.attributes);
    console.log("newUser", newUser)
    expect(newUser).to.be.an('object');
    expect(newUser.id).to.equal('1');
    expect(newUser.type).to.equal('user');
    expect(newUser.attributes.username).to.equal('Andy');
    expect(newUser.attributes.email).to.equal('andy@ex.io');
  });
});

describe('findById', () => {
  it('finds a user', () => {
    const foundUser = User.findById(2);
    expect(foundUser.attributes.username).toMatch(/Jenny/);
  });
});
