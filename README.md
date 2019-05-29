# Nuxt Basic Authentication

> An example project on how to use HTTP authorization in Nuxt.js

<img width="1147" alt="Nuxt Basic Authentication" src="https://user-images.githubusercontent.com/7046481/58576940-527c3b00-823d-11e9-8267-189d9a7ae71b.png">

## Files to look for
**config/authentication.js**
```js
const path = require('path')
const basicAuth = require('basic-auth')
const config = require(path.resolve( __dirname, './config.json'))
const isDev = !(process.env.NODE_ENV === 'production')
const login = {
  user: isDev && config ? config.AUTH_USER : process.env.AUTH_USER,
  pass: isDev && config ? config.AUTH_PASS : process.env.AUTH_PASS
}

const auth = (req, res, next) => {
  const user = basicAuth(req)
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    res.status(401).send('Authorization Required')
    return
  }
  if (user.name === login.user && user.pass === login.pass) {
    next()
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    res.status(401).send('Authorization Required')
    return
  }
}

module.exports = auth
```
**config/config.json**
```json
{
  "AUTH_USER": "admin",
  "AUTH_PASS": "secretpassword"
}
```
**server/index.js**
```js
// Authentication
app.get('/auth', auth, (req, res) => {
  res.redirect('/')
})

app.get('/logout', (req, res) => {
  res.set('Authorization', 'Basic xxx')
  res.status(401).send('Logged out')
})
```
**store/auth.js**
```js
export const state = () => ({
  authenticated: false,
  showAdminOverlay: false
})

export const mutations = {
  setAuthenticated(state, status) {
    state.authenticated = status
  },
  adminOverlay(state, status) {
    if (!status) {
      state.showAdminOverlay = !state.showAdminOverlay
      return
    }

    state.showAdminOverlay = status
  }
}

export const actions = {
  authenticate({ commit }, value) {
    commit('setAuthenticated', value)
  },
  logout({ commit }) {
    this.$axios.get(`/logout`)
      .then(() => {
        // Nothing to do here
        // It should fail
      })
      .catch(() => {
        commit('setAuthenticated', false)
      })
  }
}
```
**middleware/auth.js**
```js
export default function (context) {
  if (!context.req) {
    return
  }

  const CREDENTIALS_REGEXP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/
  const match = CREDENTIALS_REGEXP.exec(context.req.headers.authorization)

  if (!match) {
    context.store.dispatch('auth/authenticate', false)
    return
  }

  context.store.dispatch('auth/authenticate', true)
}
```
**nuxt.config.js**
```js
router: {
  middleware: 'auth'
}
````

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
