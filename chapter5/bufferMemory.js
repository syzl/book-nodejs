var useMem = function() {
  var size = 20 * 1024 * 1024
  var buffer = new Buffer(size)
    // return [].map.call(buffer,v=>0)
  for (var i = 0; i < size; i++) {
    buffer[i] = 0
  }
  return buffer
}

var showMem = function() {
  var mem = process.memoryUsage()
  var format = function(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + 'MB'
  }
  var msg = 'Process:  '
  for (key in mem) {
    msg += `${key}: ${format(mem[key])}  `
  }
  console.info(msg)
}

var total = []
for (let j = 0; j < 15; j++) {
  showMem()
  total.push(useMem())
}