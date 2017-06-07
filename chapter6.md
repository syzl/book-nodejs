# 理解Buffer

1. Buffer结构
类似数组，每个元素为16进制两位数。
可以按照数组的方式，创建对象，获取长度，下标访问元素。
元素赋值只能在0-255之间。存储时，对赋值进行截取，只取两个十六进制位内数据。于是造成256以上的数会逐次递减，256以下的会逐次递增，直到在0~255之间。小数部分会被舍弃。

2. Buffer内存分配
Buffer对象是指定固定长度创建的。  这部分固定长度将会有三种状态：full、partial、empty
分配buffer会使用到中间函数。allocPool。
每次分配要将一个对象放在一个buffer内，如果剩余空间不够，会新建buffer。这样会造成上一个的剩余空间浪费掉。

3. Buffer的转换
字符类型支持有限。
主要通过构造函数完成。
一个buffer可以多次写入，每次写入可以指定不同的编码。

Buffer转字符，是用自带的toString方法。
一般的buffer自带的方法都可以传入起始位置参数
不支持的编码类型可以通过isEncoding判断，可以使用外部库入iconv，iconv-lite转换。

4. Buffer的拼接
data += chunk 隐藏了过程 data = data.toString() + chunk.toString()
西文环境中没有宽字符，不会产生影响。
中文环境，汉字是宽字符，字符被截断，会产生乱码。
使用setEncoding，为读入流设置编码，将会内设一个decoder，把buffer先转换再传递，避免乱码。
但，buffer支持的编码类型有限。
正确拼接buffer，是用一个数组存储接收到的所有Buffer，并记录所有片段的长度。然后使用Buffer.concat生成一个合并的Buffer
Buffer.concat 内部过程很细腻..

5. Buffer与性能
进行网络传输时，数据都要转换为buffer，以二进制数据传输。
对数据进行主动转化，提高buffer转换效率，能够提升网络吞吐率。

文件读取时，可以设置highWaterMark。其大小影响触发 .on('data') 事件的频率。
一般的，值越大，文件读取越快。越容易造成内存浪费。  反而反之。
