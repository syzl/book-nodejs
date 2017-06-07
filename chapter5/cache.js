var cache = {}
var get = function(key) {
  if (cache[key]) {
    return cache[key]
  } else {

  }
}

var set = function(key, value) {
  cache[key] = value
}

var _ = _ || {}

_.identity = function() {
  return Math.floor(Math.random * 10900) / 100
}
_.has = function(memo, key) {
  return key in memo
}
_.memorize = function(func, hasher) {
  var memo = {}
  hasher || (hasher = _.identity)
  return function() {
    var key = hasher.apply(this, arguments)
    return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this.arguments))
  }
}

// Object.defineProperties(cache,)