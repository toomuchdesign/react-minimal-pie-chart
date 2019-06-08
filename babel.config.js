const test = process.env.NODE_ENV === 'test';
module.exports = api => {
  api.cache(false);
  return {
    presets: [
      [
        '@babel/env',
        {
          modules: test ? 'cjs' : false,
          loose: true,
        },
      ],
    ],
    plugins: ['@babel/plugin-transform-react-jsx'],
  };
};
