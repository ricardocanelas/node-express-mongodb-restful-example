# 😃 Node.js - Express - MongoDB - RESTful

Simple RESTful API implementation on Node.js + Express + MongoDB.

Depedencies:

- ✔️ Express *4.16*
- ✔️ Mongoose *5.3*
- ✔️ Passport *0.4*
- ✔️ Babel *7.1*
- ✔️ Mocha *5.2*
- ✔️ Chai *4.2*
- ✔️ Nyc *13.1*
- ✔️ Husky *1.1.3*
- ✔️ Eslint *5.8*
- ✔️ Prettier *1.14*

---

## 👉🏻 Prerequisites

### MongoDB

- [Step by Step](https://docs.mongodb.com/manual/administration/install-community/)
- [Download](https://www.mongodb.com/download-center/community)
- [Guide](https://mongoosejs.com/docs/guide.html)
- [Mongo Compass](https://www.mongodb.com/products/compass)
- [Tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)

Do not forget to add location of MongoDB's bin folder to PATH env variable.

```bash
mongod --version
```

### NodeJs

- [Download](https://nodejs.org/en/)

```bash
node --version
```

### Yarn

```
npm install -g yarn
```

---

## 👉🏻 Getting Started

Run *mongod* in a separate shell to keep an instance of the MongoDB Daemon running

```bash
mongod
```

Clone the repo and use `yarn` to install dependecies

```bash
git clone https://github.com/ricardocanelas/node-express-mongodb-restful-example
cd node-express-mongodb-restful-example
yarn install
```

Start server

```
yarn start
```

Then visit `http://localhost:3001/api/posts` for example.

**Test**

```
# Run tests
yarn test

# Run test along with code coverage
yarn test:coverage
```

**Lint**

```
# Lint code with ESLint
yarn lint

# Run lint on any file change
yarn lint:fix
```

**Deployment**

```
yarn build
yarn serve
```

**Seed**

```
yarn seed
```

* email: admin@mail.com
* password: secret

---

## 👉🏻 API Endpoint

POSTS

* `GET api/posts` - Get all of the posts
* `GET api/posts/count` - Get the quantity of the posts
* `GET api/posts/:id` - Get the details of a single post
* `POST api/posts/` - Add a new post.
* `PUT api/posts/:id` - Edit the details of an existing post
* `DELETE api/posts/:id` - Delete a single post

USERS

* `POST api/signin` - Sign In
* `POST api/signup` - Sign Up
* `GET api/users` - Get All of the users **(required auth)**
* `GET api/users/count` - Get the quantity of the users
* `GET api/users/:id` -  Get the details of an user
* `PUT api/users/:id` - Edit the details of an existing user
* `DELETE api/users/:id` - Delete an user

---

### 👏 My Inspirations


Demos

- https://florianholzapfel.github.io/express-restify-mongoose/#express-4-app
- https://github.com/DavideViolante/Angular-Full-Stack
- https://github.com/kunalkapadia/express-mongoose-es6-rest-api
- https://github.com/madhums/node-express-mongoose-demo
- https://github.com/diegohaz/rest-api

Documentations

- https://bocoup.com/blog/documenting-your-api
- https://github.com/udacity/reactnd-project-readable-starter
- https://gist.github.com/rxaviers/7360908

Tests

- https://dev.to/bnorbertjs/my-nodejs-setup-mocha--chai-babel7-es6-43ei
- https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
- https://medium.com/@hdeodato/teste-automático-de-api-rest-usando-com-node-js-mocha-chai-6aec4613d100
- https://imasters.com.br/back-end/desenvolvendo-tdd-em-node-js-com-mocha-chai

Validations

- https://github.com/leepowellcouk/mongoose-validator
- https://github.com/chriso/validator.js


Authentication

- https://medium.freecodecamp.org/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e
- https://github.com/AntonioErdeljac/passport-tutorial