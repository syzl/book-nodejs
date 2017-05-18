# 异步编程 

1. 高阶函数  
   函数作为输入与输出，非常灵活。
   underscore的after() 是偏函数的应用  
   本身有一定的误导性，具体描述在 chapter4/after.js
2. 事件队列  
    EventEmitter 有once方法
   示例代码 chapter4/once.js
3. 多异步事件协作
   使用哨兵变量。  
   使用偏函数，类似 \_.after() 方法， 在方法中加上每次调用传入的参数即可。  
   由多对一扩展成多对多时，变为事件发布/订阅方式即可。即，原本callback 是 \_.after(fn),变成proxy.emit('eventName',\_.after(fn))
   朴大写的模块 EventProxy ，可以监听多个事件名，不需要在每个回掉的地方添加指定的emit。  
   我想到的，每个事件的重要程度不一样，一些事件缺失，也可以返回一定有效性的结果，事件优先级的策略管理，可以增加一些逻辑。
4. Promise/Deferred 模式
   Deferred 没有用过。改造deferred支持链式调用。批量 promise 化看起来比较抽象，代码量却很少（操作了args）。

5. 流程控制，尾触发与中间件
  connect 使用中间件的方式即为尾触发。特点是将异步过程铺展开来。不能进行并行异步处理.

6. when.js  async step

7. 过载保护  
   BagPipe， 利用偏函数，约定最大任务数量。
   超时限制
   
