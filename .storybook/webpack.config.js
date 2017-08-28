const path = require('path');
const ROOT = path.join(process.cwd());

module.exports = (baseConfig, env) => {
  // Manually add "svg-partial-circle" to the paths to be transpiled
  // if(env !== 'PRODUCTION'){
  //   return baseConfig;
  // }

  baseConfig.module.rules.map(rule => {
    if (rule.test.test('.jsx')) {
      if (Array.isArray(rule.include) === false) {
        rule.include = [];
      }
      rule.include.push(path.join(ROOT, 'node_modules', 'svg-partial-circle'));
      delete rule.exclude;
    }
    return rule;
  });
  return baseConfig;
};
