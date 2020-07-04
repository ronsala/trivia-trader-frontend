// TODO: rm this sample code from https://blog.logrocket.com/a-quick-and-complete-guide-to-mocha-testing-d0e0ea09f09d/.

const md5 = require('./md5');

module.exports = (string) => new Promise(
  (resolve, reject) => {
    md5(string, (err, hash) => {
      return err ? reject(err) : resolve(hash)
    })
  }
)
