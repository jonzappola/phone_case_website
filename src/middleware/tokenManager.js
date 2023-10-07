// tokenManager.js

const revokedTokens = new Set();

const isTokenRevoked = (token) => {
  return revokedTokens.has(token);
};

const revokeToken = (token) => {
  revokedTokens.add(token);
};

module.exports = {
  isTokenRevoked,
  revokeToken,
};
