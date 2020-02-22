'use strict';

const path = require('path');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const googleClient = require(path.resolve('src/auth/google-client'));
const client = new SecretManagerServiceClient();

const SECRET_KEYS = {
  CREDENTIALS_JSON: 'secrets/credentials-json/versions/1',
  ENV_FILE: 'secrets/env-file/versions/1'
}

async function getSecretName(keySuffix) {
  const projectId = await googleClient.getProjectIdAsync();

  return `projects/${projectId}/${keySuffix}`
}

exports.getCredentialsAsync = async function() {
  const name = await getSecretName(SECRET_KEYS.CREDENTIALS_JSON);
  const [secret] = await client.accessSecretVersion({ name });

  const payload = secret.payload.data.toString('utf8');
  return payload
}

exports.getEnvAsync = async function() {
  const name = await getSecretName(SECRET_KEYS.ENV_FILE);
  const [secret] = await client.accessSecretVersion({ name });

  const payload = secret.payload.data.toString('utf8');
  return payload
}