const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

const factory = require('./factory')

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/library.js', (req, res) => {
  const requestedComponents = req.query.components.split('|')

  let components = ''

  requestedComponents.forEach((component) => {
    components += factory(component)
  })

  res.send(`
  const alpineScript = document.createElement('script')
  alpineScript.src = 'https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js'
  document.head.appendChild(alpineScript)

  const parser = new DOMParser()
  ${components}`)
})

module.exports = app

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`))