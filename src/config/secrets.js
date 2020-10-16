'use strict';

const path = require('path');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const googleClient = require(path.resolve('src/auth/google-client'));
const client = new SecretManagerServiceClient();

const SECRET_KEYS = {
  CREDENTIALS_JSON: 'secrets/credentials-json/versions/1',
  ENV_FILE: 'secrets/env-file/versions/1',
  DEBUG_SECRET_ONE: 'secrets/debug-secret-one/versions/3',
  DEBUG_SECRET_TWO: 'secrets/debug-secret-two/versions/latest',
}
exports.SECRET_KEYS = SECRET_KEYS;


async function getSecretName(keySuffix) {
  const projectId = await googleClient.getProjectIdAsync();

  return `projects/${projectId}/${keySuffix}`
}

exports.getCredentialsAsync = async function() {
  const payload = await exports.getValueAsync(SECRET_KEYS.CREDENTIALS_JSON);
  return payload;
}

exports.getEnvAsync = async function() {
  const payload = await exports.getValueAsync(SECRET_KEYS.ENV_FILE);
  return payload;
}

exports.getValueAsync = async function(keySuffix) {
  const name = await getSecretName(keySuffix);
  const [secret] = await client.accessSecretVersion({ name });

  const payload = secret.payload.data.toString('utf8');
  return payload
}