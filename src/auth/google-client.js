'use strict';

const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.GoogleAuth({ scopes: SCOPES });
const getClientPromise = new Promise(async function (resolve) {
  try {
    const authClient = await auth.getClient();
    return resolve(authClient);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});

exports.getClientAsync = function () {
  return getClientPromise;
}

const getProjectIdPromise = new Promise(async function (resolve) {
  try {
    const projectId = await auth.getProjectId();
    return resolve(projectId);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});

exports.getProjectIdAsync = function () {
  return getProjectIdPromise;
}
