#! usr/bin/env node

const ppk = require('./lib');

module.exports = ppk.process;
module.exports.process = ppk.process;
module.exports.fromFile = ppk.fromFile;
