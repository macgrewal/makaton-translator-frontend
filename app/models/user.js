function User(opts) {
  if (!opts) opts = {};
  this.username = opts.username || '';
  this.displayName = opts.displayName || this.username;
  this.language = opts.language || 'english';
}

module.exports = User;
