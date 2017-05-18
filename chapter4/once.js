var events = require('events')
var proxy = new events.EventEmitter()
var status = 'ready'
var myEvent = function ( callback ) {
  proxy.once('eventName', callback)
  if(status === 'ready') {
    status = 'pending'
    setTimeout(function(){
      let result = 'ko'
      proxy.emit('eventName', result)
      status = 'ready'
    }, 2000)
  }
}

myEvent(x=>console.info(1, x))
myEvent(x=>console.info(2, x))
myEvent(x=>console.info(3, x))
 
// 2秒后，得到result，然后myEvent中录入的事件队列全部执行 
