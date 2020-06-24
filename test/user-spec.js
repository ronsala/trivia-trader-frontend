"use strict";
var expect = require('chai').expect;

describe('User', function() {
  it('should exist', function() {
    var User = require('./src/javascripts/user.js');
    expect(User).to.not.be.undefined;
  })
})