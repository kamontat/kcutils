const { babel } = require("@kcinternal/configuration");

const config = babel(__dirname);
module.exports = function(api) {
  api.cache(true);

  return config.build();
}
