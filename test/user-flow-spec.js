// const { expect } = require("chai");
// require('chromedriver');
// const webdriver = require('selenium-webdriver');
// const { By, until } = webdriver;
// const express = require('express');
// const app = express();
// const sinon = require('sinon');
// const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
// const driver = new webdriver.Builder().forBrowser('chrome').build();

// describe('User flow', done => {
//   before(done => {
//     console.log('In User flow');
//     driver.get('http://localhost:3003')
//     .then(function(res) {
//       driver
//       .findElement(By.id('box-a'))
//       .click()
//       .then(() => {
//         driver.wait(until.elementLocated(By.id('button-home')))
//         .then(() => {
//           done();
//         });
//       });
//     });
//   });

//   it("shows 'Q: Have you signed up for TriviaTrader?' after clicking 'Play Game'", () => {
//     console.log('In shows button-home');
//     return expect(driver.findElement(By.id('box-top')).getAttribute('innerHTML')).to.eventually.contain('Q: Have you signed up for TriviaTrader?'
//     );
//   });
// });