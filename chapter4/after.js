var _ = {}
_.after = (times, func) => {
	/**
	 * 这儿对times的判断，是在执行 _.after()的时候作用的
	 *
	 * 这儿，我开始迷惑的是，<= 0 什么时候用。误以为是times递减到0一下会执行后一个return，事实上没有这种逻辑。
	 * */
	if(times <= 0) return func()
	/**
	 * 情景1， var a = _.after(2,()=>{})
	 * 情景2， var b = _.after(0,()=>{})
	 * 前者，直接返回函数执行结果，a 是一个结果，不是一个function
	 * 后者，执行after的第二个return，返回一个函数，b是一个function
	 *
	 */
	return () => {
		/**
		 * --times 记不住
		 *  这儿使用了闭包。 
		 *  times是这个return外层的作用域里
		 *  相当于 
		 *     { 
		 *        let times = '1'
		 *        return () => {
		 *          times -=1
		 *          return times
		 *        }
		 *     }
		 *    返回的函数，可以一直操作局部作用域中的times变量   
		 *    在高阶函数中，times是传入的arguments，省略了 let，看起来迷惑
		 *    另外，如果times是全局作用域的变量，就失去了闭包的意义。
		 */
		console.info(`inner times:`, times)
		if(--times < 1){
			/** 
			 * 这儿的this，谁调用上边return返回的这个函数，就指向谁。
			 * arguments 同样
			 * 例如： let b = _.after(5,()=>{})
			 * 此时 b = [Object Function]
			 * b() 相当于 b.call(b)
			 * this指向b，arguments 为 []
			 * 
			 * 这儿我迷惑是，误以为this是上边的this，而在after调用的时候arguments只有times，func两个。事实上，arguments并不是after的两个传入参数
			 */
			return func.apply(this,arguments)
		}
	}
}

var func = (...arg) => console.dir(arg),arg

var _func = _.after(4,func)

_func(1,2,3)
_func(2,2,3)
_func(3,2,3)
_func(4,2,3)
_func(5,2,3)
