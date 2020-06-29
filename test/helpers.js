// Adapted from https://github.com/learn-co-students/fewpjs-oo-static-methods-lab-v-000
const sinon = require('sinon');
const chai = require('chai');
global.expect = chai.expect;
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