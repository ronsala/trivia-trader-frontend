// Adapted from https://github.com/learn-co-students/fewpjs-oo-static-methods-lab-v-000

// If using ES6 syntax:
// import { before, after, describe, it } from "mocha";
// import { expect, assert, should } from "chai";
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should();
const fs = require('file-system');
const jsdom = require('mocha-jsdom');
const path = require('path');
const babel = require('babel-core');
const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');

const { JSDOM } = jsdom;

const babelResult = babel.transformFileSync(
  path.resolve(__dirname, '..', './src/javascripts/user.js')//, {
//     presets: ['env']
//   }
);

const src = babelResult.code;

jsdom({
  html,
  src,
  url: "http://localhost"
});
