const User = require('../src/javascripts/user');

describe('User', () => {
  it('should exist', function() {
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

describe("User constructor", () => {
  it('creates a user', () => {
    const newUser1 = new User(user1, user1.attributes);
    expect(newUser1).to.be.an('object');
    expect(newUser1.id).to.equal('1');
    expect(newUser1.username).to.equal('Andy');
    expect(newUser1.email).to.equal('andy@ex.io');
    const newUser2 = new User(user2, user2.attributes);
    expect(newUser2).to.be.an('object');
    expect(newUser2.id).to.equal('2');
    expect(newUser2.username).to.equal('Jenny');
    expect(newUser2.email).to.equal('jenny@ex.com');
  });
});

describe('User.findById', () => {
  it('should exist', function() {
    expect(User.findById).to.not.be.undefined;
  })
})

describe('User.findById', () => {
  it('finds a user', () => {
    expect(User.findById(1).username).to.match(/Andy/);
    expect(User.findById(1).username).to.not.match(/Connie/);
    expect(User.findById(2).username).to.match(/Jenny/);
    expect(User.findById(2).username).to.not.match(/Connie/);
  });
});
