export default {
  scripts: ['lint'],
  devDependencies: [
    'babel-eslint',
    'eslint',
    'eslint-config-standard',
    'eslint-friendly-formatter',
    'eslint-loader',
    'eslint-plugin-html',
    'eslint-plugin-promise',
    'eslint-plugin-standard'
  ],
  files: {
    'webpack.base.conf.js': [
      `{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },`
    ]
  }
}
