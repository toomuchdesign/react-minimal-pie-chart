const path = require('path');
const ROOT = path.join(process.cwd());

module.exports = ({ config, mode }) => {
  // Manually add "svg-partial-circle" to the paths to be transpiled
  config.module.rules.map(rule => {
    if (rule.test.test('.jsx')) {
      if (!Array.isArray(rule.include)) {
        rule.include = [];
      }
      rule.include.push(path.join(ROOT, 'node_modules', 'svg-partial-circle'));
    }
    return rule;
  });
  return config;
};
