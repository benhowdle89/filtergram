const util = require("util");

exports.log = o => console.log(util.inspect(o, false, null, true));
