// Adapted from https://github.com/learn-co-students/fewpjs-oo-static-methods-lab-v-000

const chai = require('chai')
global.expect = chai.expect
const fs = require('file-system')
const jsdom = require('mocha-jsdom')
const path = require('path')
const babel = require('babel-core');
const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');

const { JSDOM } = jsdom;

const babelResult = babel.transformFileSync(
  path.resolve(__dirname, '..', './src/javascripts/user.js')//, {
//     presets: ['env']
//   }
);

const src = babelResult.code

jsdom({
  html,
  src,
  url: "http://localhost"
});

const User = require('../src/javascripts/user');

const testFunction = require('../src/javascripts/user').testFunction;
console.log("testFunction", testFunction())


// const helpers = require('/test/helpers');

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
    const newUser = new User(user1, user1.attributes);
    console.log("newUser:", newUser)
    expect(newUser).to.be.an('object');
    expect(newUser.id).to.equal('1');
    expect(newUser.username).to.equal('Andy');
    expect(newUser.email).to.equal('andy@ex.io');
  });
});

describe('User.findById', () => {
  it('should exist', function() {
    expect(User.findById).to.not.be.undefined;
  })
})

// describe('findById', () => {
//   it('finds a user', () => {
//     // const foundUser = User.findById(2);
//     expect(User.findById(1).attributes.username).to.match(/Andy/);
//   });
// });
