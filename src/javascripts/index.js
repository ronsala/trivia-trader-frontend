// Entry point to front end.

const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  App.renderHome();
});
