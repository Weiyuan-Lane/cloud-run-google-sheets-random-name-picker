'use strict';

const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');
const secrets = require(path.resolve('src/config/secrets'));
const eventEmitter = new EventEmitter();

Promise.all([
  secrets.getEnvAsync().then(function(env) {
    fs.writeFileSync('.env', env);
  }),
  secrets.getCredentialsAsync().then(function(creds) {
    fs.writeFileSync('.tmp/credentials.json', creds);
  }),
]).then(function() {
  eventEmitter.emit('finish');
})

eventEmitter.on('finish', function() {});
