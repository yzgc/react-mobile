// https://github.com/michael-ciniawsky/postcss-load-config
debugger
module.exports = {
  plugins: {
    // to edit target browsers: use "browserlist" field in package.json
    'postcss-px2rem': { remUnit: 100 },
    'autoprefixer': {browsers: 'last 5 version'}
  }
}
