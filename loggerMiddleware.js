function log (req, res, next) {
  console.log('Logging...')
  next() // This is remarkable to use. If not the app will stay hanging down
}

module.exports = log