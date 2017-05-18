

process.nextTick(produce('第一次 nextTick'))
console.info('1正常')

setImmediate(produce('第1次 immediate '))
console.info('2正常')

process.nextTick(produce('第二次 nextTick'))
console.info('3正常')

setImmediate(produce('第2次 immediate '))
console.info('4正常')

setImmediate(function(){
  produce('第3次 immediate')()
  process.nextTick(produce('immediate中插入的nextTick'))
})
console.info('5正常')

setImmediate(produce('第4次 immediate '))
console.info('6正常')



function produce( str ){
  return function () {
    console.info(str,' - 执行')
  }
}
