/**
 * Babel config with optional React Compiler plugin.
 * In CI or environments where babel-plugin-react-compiler isn't available,
 * we gracefully skip enabling it.
 */

const reactCompilerPlugin = () => {
  if (process.env.DISABLE_REACT_COMPILER === '1') return [];
  try {
    require.resolve('babel-plugin-react-compiler');
    return [[
      'babel-plugin-react-compiler',
      { runtimeModule: '#react-compiler-runtime' },
    ]];
  } catch {
    return [];
  }
};

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 12,
          browsers: [
            'last 2 chrome versions',
            'last 2 firefox versions',
            'last 2 safari versions',
            'last 2 edge versions',
          ],
        },
      },
    ],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
  overrides: [
    {
      test: ['packages/keystatic/src/**/*', 'design-system/pkg/src/**/*'],
      exclude: ['packages/keystatic/src/form/fields/document/**/*'],
      plugins: reactCompilerPlugin(),
    },
  ],
};

