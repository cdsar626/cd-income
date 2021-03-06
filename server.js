const path = require('path');
const fs = require('fs');
const static = require('fastify-static'); // serve static files
const routesLoader = require('fastify-loader'); // load all routes from directory
const compress = require('fastify-compress'); // compress responses
const helmet = require('fastify-helmet'); // Important security headers
const mongodb = require('fastify-mongodb'); // mongodb driver
const cookieSess = require('fastify-secure-session');
const prefastify = require('fastify');
const sslRedirect = require('heroku-ssl-redirect');
const { updateCountryData, updateAllCountries } = require('./functions.js');



const fastify = prefastify({
  logger: {
    level: 'warn',
    //file: 'logs.txt',
  },
  trustProxy: true,
});

fastify.register(static, { root: path.join(__dirname, 'dist'), wildcard: false });

fastify.register(mongodb, {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  //url: mongodb://user:pass@host:port/database
  url: process.env.mongodbURI,
});
fastify.ready(function() {
  try {
    updateAllCountries('data07', 7, fastify.mongo.db);
    updateAllCountries('data30', 30, fastify.mongo.db);
    updateAllCountries('data365', 365, fastify.mongo.db);
    updateAllCountries('alltime', 999, fastify.mongo.db);

  } catch(err) {
    console.error(err);
  }
})
fastify.register(cookieSess, {
  key: fs.readFileSync(path.join(__dirname, 'secret-key')),
  cookie: {
    path: '/',
    maxAge: 60 * 60 * 24 * 3, // 3 days in seconds
    HttpOnly: true,
    secure: process.env.NODE_ENV === "production",
  }
})
fastify.register(helmet);
fastify.register(compress);
fastify.decorate('env', process.env);
fastify.register(routesLoader, { paths: ['./routes/*.js'] });
//fastify.register(sslRedirect);


fastify.get('/*', (req, reply) => {
  reply.sendFile('index.html');
})

const start = async () => {
  let port = process.env.PORT || 5000;
  let host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
  try {
    await fastify.listen(port, host);
    console.log(`Listening in ${host}:${port}`);
  } catch(err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
