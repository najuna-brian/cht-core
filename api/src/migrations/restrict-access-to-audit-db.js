const request = require('@medic/couch-request');
const url = require('url');
const environment = require('@medic/environment');

const addMemberToDb = () => {
  const securityObject = {
    admins: { names: [], roles: ['audit-writer'] },
    members: { names: [], roles: ['audit-writer'] }
  };
  return request.put({
    url: url.format({
      protocol: environment.protocol,
      hostname: environment.host,
      port: environment.port,
      pathname: `${environment.db}-audit/_security`,
    }),
    auth: {
      username: environment.username,
      password: environment.password
    },
    json: true,
    body: securityObject
  });
};

module.exports = {
  name: 'restrict-access-to-audit-db',
  created: new Date(2017, 5, 8),
  run: () => {
    return addMemberToDb().catch(err => {
      return Promise.reject(new Error('Failed to add member to audit db.' +
        JSON.stringify(err, null, 2)));
    });
  }
};
