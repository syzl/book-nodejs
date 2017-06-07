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

var useMem = function() {
  var size = 20 * 1024 * 1024
  var arr = new Array(size).fill(0)
  return arr
}

var total = []
for (let j = 0; j < 15; j++) {
  showMem()
  total.push(useMem())
}