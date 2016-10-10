##ES6基本语法
###let和const
####1.let
* 基本用法

		{
		    var a = 10;
		    let b = 20;
		}
		console.log(a);
		console.log(b);  //ReferenceError: b is not defined

* 不存在变量提升

		console.log(foo); //undefined
		console.log(bar); //ReferenceError: bar is not defined
		var foo = 2;
		let bar = 2;	
		
* 暂时性死区(temporal dead zone，简称TDZ）

		var tmp = 123;
		if (true) {
		    tmp = 'abc'; //ReferenceError: tmp is not defined
		    let tmp;
		}
		
####2.块级作用域

* 为什么需要块级作用域?	

		var tmp1 = new Date();
		function f(){
		    console.log(tmp1);
		    if(false){
		        var tmp1 = "hello";
		    }
		}
		f();  //undefined
	
	
	
		var s = "hello";
		for(var i = 0; i < s.length; i++){
		    console.log(s[i]);
		}
		console.log(i); //5

* ES6的块级作用域

		function f2() {
		    let n = 5;
		    if (true) {
		        let n = 10;
		    }
		    console.log(n); // 5
		}
		f2();		

####3. const命令

	const PI = 3.1415;
	PI = 3; //TypeError: Assignment to constant variable.
	
	
	const foo;  //SyntaxError: Missing initializer in const declaration
	
	
	if (true) {
	    const MAX = 5;
	}
	MAX // Uncaught ReferenceError: MAX is not defined
	
	
	if (true) {
	    console.log(MAX); // ReferenceError
	    const MAX = 5;
	}
	
对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。`const`命令只是保证变量名指向的地址不变，并不保证该地址的数据不变。例如：
	
	const goo = {};
	goo.prop = 123;
	console.log(goo.prop); // 123
	goo = {}; //TypeError: Assignment to constant variable.
	
常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。	

###变量的解构赋值
####1.数组解构赋值
* 基本用法

		var [a, b, c] = [1, 2, 3];
		let [foo, [[bar], baz]] = [1, [[2], 3]];
		let [ , , third] = ["foo", "bar", "baz"];
如果解构不成功，变量的值就等于`undefined`。

		var [goo] = [];
		var [hoo1, hoo2] = [1];
		console.log(hoo2); //undefined

* 默认值

		var [oo1 = true] = [];
		console.log(oo1); // true
		[x, y = 'b'] = ['a'];
		console.log(x);
		console.log(y);// x='a', y='b'
		[x, y = 'b'] = ['a', undefined]; // x='a', y='b'
ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于`undefined`，默认值是不会生效的。

		var [m = 1] = [undefined];
		console.log(m);  //1
		var [n = 1] = [null];
		console.log(n);  //null			
如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

		function f() {
		    console.log('aaa');
		}
		let [t = f()] = [1];
		console.log(t);  //1			
默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

		let [aa = 1, bb = aa] = [];     // aa=1; bb=1
		let [aa = 1, bb = aa] = [2];    // aa=2; bb=2
		let [aa = 1, bb = aa] = [1, 2]; // aa=1; bb=2
		let [aa = bb, bb = 1] = [];     // ReferenceError
		
####2.对象的解构赋值

	var { bar, foo } = { foo: "aaa", bar: "bbb" };
	
	var { baz } = { foo: "aaa", bar: "bbb" };
	console.log(baz);  //undefined
如果变量名与属性名不一致，必须写成下面这样。

	var { foo: baz1 } = { foo: 'aaa', bar: 'bbb' };
	
	let obj = { first: 'hello', last: 'world' };
	let { first: f, last: l } = obj;

####3.字符串的解构赋值

	const [a, b, c, d, e] = 'hello';
类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

	let {length : len} = 'hello';

####4.数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

	let {toString: s} = 123;
	console.log(s); //[Function: toString]
	console.log(s === Number.prototype.toString );  //true
	
	let {toString: s1} = true;
	console.log(s1 === Boolean.prototype.toString); // true
	
上面代码中，数值和布尔值的包装对象都有`toString`属性，因此变量s都能取到值。

####5.函数参数的解构赋值

	function add([x, y]){
	    return x + y;
	}
	console.log(add([1, 2])); // 3
	
####6.解构用途

* 交换变量的值

		[x, y] = [y, x];
* 从函数返回多个值

	function example() {
	    return [1, 2, 3];
	}
	var [a, b, c] = example();		
* 函数参数的定义
 
		function f([x, y, z]) { }
		f([1, 2, 3]);		
* 提取json数据

		var jsonData = {
		    id: 42,
		    status: "OK",
		    data: [867, 5309]
		};
		let { id, status, data: number } = jsonData;
* 函数参数的默认值

		function f1(url, {
		    async = true,
		    beforeSend = function () {},
		    cache = true,
		    complete = function () {},
		    crossDomain = false,
		    global = true,
		    // ... more config
		}) {
		    // ... do stuff
		};		 
* 遍历Map结构

		var map = new Map();
		map.set('first', 'hello');
		map.set('second', 'world');
		
		for (let [key, value] of map) {
		    console.log(key + " is " + value);
		}
		for (let [key] of map) {}
		for (let [,value] of map) {}
* 输入模块的指定方法

		const { SourceMapConsumer, SourceNode } = require("source-map");
		
###字符串的扩展
####1.字符的Unicode表示法 
JavaScript允许采用`\uxxxx`形式表示一个字符，其中`“xxxx”`表示字符的码点。但是，这种表示法只限于`\u0000——\uFFFF`之间的字符。超出这个范围的字符，必须用两个双字节的形式表达。

	"\uD842\uDFB7"
	// "𠮷"
	
	"\u20BB7"
	// " 7"
ES6对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。

	"\u{20BB7}"
	// "𠮷"	
####2.codePointAt()
JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode码点大于`0xFFFF`的字符），JavaScript会认为它们是两个字符。

	var s = "𠮷";
	
	s.length // 2
	s.charCodeAt(0) // 55362
	s.charCodeAt(1) // 57271	
汉字“𠮷”的码点是0x20BB7，UTF-16编码为0xD842 0xDFB7（十进制为55362 57271），需要4个字节储存。JavaScript不能正确处理，字符串长度会误判为2。                   	
		
ES6提供了`codePointAt`方法，能够正确处理4个字节储存的字符，返回一个字符的码点。

	var s = '𠮷a';
	
	s.codePointAt(0) // 134071
	s.codePointAt(1) // 57271
	
	s.charCodeAt(2) // 97
	
上面代码中，JavaScript将“𠮷a”视为三个字符，`codePointAt`方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点`134071`（即十六进制的`20BB7`）。在第二个字符（即“𠮷”的后两个字节）和第三个字符`“a”`上，`codePointAt`方法的结果与`charCodeAt`方法相同。           
解决`codePointAt`方法的参数不正确问题的一个办法是使用for...of循环，因为它会正确识别32位的UTF-16字符。

	var s = '𠮷a';
	for (let ch of s) {
	  console.log(ch.codePointAt(0).toString(16));
	}
	// 20bb7
	// 61
	
####3.String.fromCodePoint() 

	String.fromCodePoint(0x20BB7)
	// "𠮷"
	String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
	// true	
		
####4.字符串的遍历器接口

	for (let codePoint of 'foo') {
	    console.log(codePoint)
	}
除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
		
	var text = String.fromCodePoint(0x20BB7);
	
	for (let i = 0; i < text.length; i++) {
	    console.log(text[i]);
	}// " "  " "
	for (let i of text) {
	    console.log(i);
	}// "𠮷"		

####5.at()
字符串实例的at方法，可以识别Unicode编号大于0xFFFF的字符，返回正确的字符。

	'abc'.at(0) // "a"
	'𠮷'.at(0) // "𠮷"	
	
####6.includes(), startsWith(), endsWith()

	var s = 'Hello world!';
	
	s.startsWith('Hello') // true
	s.endsWith('!') // true
	s.includes('o') // true         
这三个方法都支持第二个参数，表示开始搜索的位置。`endsWith`的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。          

	var s = 'Hello world!';
	
	s.startsWith('world', 6) // true
	s.endsWith('Hello', 5) // true
	s.includes('Hello', 6) // false
	
####7.repeat()

	'x'.repeat(3) // "xxx"
	'hello'.repeat(2) // "hellohello"
	'na'.repeat(0) // ""
参数如果是小数，会被取整。

	'na'.repeat(2.9) // "nana"	

####8.padStart()，padEnd() 

padStart用于头部补全，padEnd用于尾部补全。

	'x'.padStart(5, 'ab') // 'ababx'
	'x'.padStart(4, 'ab') // 'abax'
	
	'x'.padEnd(5, 'ab') // 'xabab'
	'x'.padEnd(4, 'ab') // 'xaba'


###数值的扩展
####1.二进制和八进制表示法 
ES6提供了二进制和八进制数值的新的写法，分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示。

	0b111110111 === 503 // true
	0o767 === 503 // true		
如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。

	Number('0b111')  // 7
	Number('0o10')  // 8

####2.Number.isFinite(), Number.isNaN()

Number.isFinite()用来检查一个数值是否为有限的。         
Number.isNaN()用来检查一个值是否为NaN。     
这两个新方法只对数值有效，非数值一律返回false。       

####3.Number.parseInt(), Number.parseFloat()

	Number.parseInt('12.34') // 12
	Number.parseFloat('123.45#') // 123.45

####4.Number.isInteger()

`Number.isInteger()`用来判断一个值是否为整数。在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。

	Number.isInteger(25) // true
	Number.isInteger(25.0) // true
	Number.isInteger(25.1) // false
	Number.isInteger("15") // false

####5.Number.EPSILON 
ES6在`Number`对象上面，新增一个极小的常量`Number.EPSILON`。

	Number.EPSILON
	// 2.220446049250313e-16
	Number.EPSILON.toFixed(20)
	// '0.00000000000000022204'

Number.EPSILON的实质是一个可以接受的误差范围。为浮点数计算，设置一个误差范围。只要这个误差能够小于`Number.EPSILON`，我们就可以认为得到了正确结果。

####6.安全整数和Number.isSafeInteger()

JavaScript能够准确表示的整数范围在`-2^53`到`2^53`之间（不含两个端点），超过这个范围，无法精确表示这个值。         
ES6引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示这个范围的上下限。

	Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
	// true
	Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
	// true
`Number.isSafeInteger()`用来判断一个整数是否落在这个范围之内。

	Number.isSafeInteger('a') // false
	Number.isSafeInteger(-Infinity) // false
	
	Number.isSafeInteger(3) // true
	Number.isSafeInteger(1.2) // false
	
####7.Math对象的扩展 
ES6在Math对象上新增了17个与数学相关的方法。所有这些方法都是静态方法，只能在Math对象上调用。

`Math.trunc`方法用于去除一个数的小数部分，返回整数部分。               
`Math.sign`方法用来判断一个数到底是正数、负数、还是零。              
`Math.cbrt`方法用于计算一个数的立方根。             
`Math.clz32`方法返回一个数的32位无符号整数形式有多少个前导0。        
`Math.imul`方法返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。             
`Math.fround`方法返回一个数的单精度浮点数形式。               
`Math.hypot`方法返回所有参数的平方和的平方根。                 

* 对数方法     
            
`Math.expm1(x)`返回`Math.exp(x) - 1`。                
`Math.log1p(x)`方法返回`1 + x`的自然对数，即`Math.log(1 + x)`。如果`x`小于`-1`，返回`NaN`。                
`Math.log10(x)`返回以10为底的`x`的对数。如果`x`小于`0`，则返回`NaN`。                   
`Math.log2(x)`返回以2为底的`x`的对数。如果`x`小于`0`，则返回`NaN`。     

####8.指数运算符

	2 ** 2 // 4
	a **= 2;
	
	
###数组的扩展
####1.Array.from() 
`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象和可遍历的对象.	

	let arrayLike = {
	    '0': 'a',
	    '1': 'b',
	    '2': 'c',
	    length: 3
	};
	
	let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
            

	Array.from('hello')
	// ['h', 'e', 'l', 'l', 'o']
	
	let namesSet = new Set(['a', 'b'])
	Array.from(namesSet) // ['a', 'b']

####2.Array.of()
`Array.of`方法用于将一组值，转换为数组。

	Array.of(3, 11, 8) // [3,11,8]
	Array.of(3) // [3]
	Array.of(3).length // 1

####3.数组实例的copyWithin() 
`copyWithin`方法，在当前数组内部将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。会修改当前数组。         
接受三个参数：        
target（必需）：从该位置开始替换数据。             
start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。              
end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。                 

	// 将3号位复制到0号位
	[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
	// [4, 2, 3, 4, 5]
	
	// -2相当于3号位，-1相当于4号位
	[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
	// [4, 2, 3, 4, 5]
	
####4.数组实例的find()和findIndex()

数组实例的`find`方法，用于找出第一个符合条件的数组成员。如果没有符合条件的成员，则返回undefined。

	[1, 4, -5, 10].find((n) => n < 0)
	// -5

数组实例的`findIndex`方法返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`。

	[1, 5, 10, 15].findIndex(function(value, index, arr) {
	  return value > 9;
	}) // 2
上面代码中，f回调函数的三个参数，依次为当前的值、当前的位置和原数组。	

####5.数组实例的fill() 
fill方法使用给定值，填充一个数组。

	['a', 'b', 'c'].fill(7)
	// [7, 7, 7]
	
	new Array(3).fill(7)
	// [7, 7, 7]
	
####6.数组实例的entries()，keys()和values() 
entries()，keys()和values()——用于遍历数组。

	for (let index of ['a', 'b'].keys()) {
	  console.log(index);
	}
	// 0
	// 1
	
	for (let elem of ['a', 'b'].values()) {
	  console.log(elem);
	}
	// 'a'
	// 'b'
	
	for (let [index, elem] of ['a', 'b'].entries()) {
	  console.log(index, elem);
	}
	// 0 "a"
	// 1 "b"	
	
####7.数组实例的includes()

	[1, 2, 3].includes(2);     // true
	[1, 2, NaN].includes(NaN); // true	

###函数的扩展
####1.函数参数的默认值

* 基本用法
为函数的参数设置默认值，即直接写在参数定义的后面。

		function log(x, y = 'World') {
		  console.log(x, y);
		}
		
		log('Hello') // Hello World
		log('Hello', 'China') // Hello China
		log('Hello', '') // Hello

* 与解构赋值默认值结合使用
参数默认值可以与解构赋值的默认值，结合起来使用。

		function foo({x, y = 5}) {
		  console.log(x, y);
		}
		
		foo({}) // undefined, 5
		foo({x: 1}) // 1, 5
		foo({x: 1, y: 2}) // 1, 2
	
* 参数默认值的位置
通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

		function f(x = 1, y) {
		  return [x, y];
		}
		
		f() // [1, undefined]
		f(2) // [2, undefined])
		f(, 1) // 报错
		f(undefined, 1) // [1, 1]
	
* 函数的length属性
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。

		(function (a, b, c = 5) {}).length // 2
		
####2.rest参数
rest参数（形式为“...变量名”），用于获取函数的多余参数。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

	function add(...values) {
	  let sum = 0;
	
	  for (var val of values) {
	    sum += val;
	  }
	
	  return sum;
	}
	
	add(2, 5, 3) // 10
		
####3.扩展运算符

* 含义
扩展运算符（...）好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。

		console.log(...[1, 2, 3])
		// 1 2 3
		
		console.log(1, ...[2, 3, 4], 5)
		// 1 2 3 4 5	
	
* 扩展运算符的应用                
(1) 合并数组                 

		var arr1 = ['a', 'b'];
		var arr2 = ['c'];
		
		[...arr1, ...arr2]
		// [ 'a', 'b', 'c']

 (2)与解构赋值结合               
扩展运算符可以与解构赋值结合起来，用于生成数组。          

	const [first, ...rest] = [1, 2, 3, 4, 5];
	first // 1
	rest  // [2, 3, 4, 5]
	
	const [first, ...rest] = [];
	first // undefined
	rest  // []:		
(3)实现了Iterator接口的对象             
任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。            

    var array = [...nodeList];

####4.name属性
函数的name属性，返回该函数的函数名。

####5.箭头函数
* 基本用法
ES6允许使用“箭头”（=>）定义函数。

		var f = v => v;
等同于：

		var f = function(v) {
		  return v;
		};
如果不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

		var f = () => 5;
		var sum = (num1, num2) => num1 + num2;
如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。              
由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。

		var getTempItem = id => ({ id: id, name: "Temp" });

* 嵌套的箭头函数

		let insert = (value) => ({into: (array) => ({after: (afterValue) => {
		  array.splice(array.indexOf(afterValue) + 1, 0, value);
		  return array;
		}})});
		
		insert(2).into([1, 3]).after(1); //[1, 2, 3]		
* 函数绑定
箭头函数可以绑定`this`对象，函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。        

		foo::bar;
		// 等同于
		bar.bind(foo);
		
		foo::bar(...arguments);
		// 等同于
		bar.apply(foo, arguments);	
		
###对象的扩展
####1.属性的简洁表示法

	var foo = 'bar';
	var baz = {foo};
	baz // {foo: "bar"}
	
	// 等同于
	var baz = {foo: foo};
上面代码表明，在对象之中只写属性名，不写属性值。这时属性值等于属性名所代表的变量。		

	function f(x, y) {
	  return {x, y};
	}
	
	// 等同于
	
	function f(x, y) {
	  return {x: x, y: y};
	}
	
	f(1, 2) // Object {x: 1, y: 2}
	
####2.属性名表达式 

		obj.foo = true;
		obj['a' + 'bc'] = 123;
上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。	

####3.Object.is()
`Object.is`用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

	Object.is('foo', 'foo')
	// true
	Object.is({}, {})
	// false
不同之处只有两个：一是+0不等于-0，二是NaN等于自身。

	+0 === -0 //true
	NaN === NaN // false
	
	Object.is(+0, -0) // false
	Object.is(NaN, NaN) // true

####4.Object.assign()
* 基本用法

`Object.assign`方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

	var target = { a: 1 };
	
	var source1 = { b: 2 };
	var source2 = { c: 3 };
	
	Object.assign(target, source1, source2);
	target // {a:1, b:2, c:3}
`Object.assign`方法的第一个参数是目标对象，后面的参数都是源对象。如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

####5.属性的可枚举性
对象的每个属性都有一个描述对象，用来控制该属性的行为。`Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象。

	let obj = { foo: 123 };
	Object.getOwnPropertyDescriptor(obj, 'foo')
	//  {
	//    value: 123,
	//    writable: true,
	//    enumerable: true,
	//    configurable: true
	//  }
描述对象的`enumerable`属性，称为”可枚举性“，如果该属性为false，就表示某些操作会忽略当前属性。

####6.属性的遍历
一共有5种方法可以遍历对象的属性。                 

（1）for...in                             

for...in循环遍历对象自身的和继承的可枚举属性。          

（2）Object.keys(obj)                         

Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性。                          

（3）Object.getOwnPropertyNames(obj)                          

Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。                  

（4）Object.getOwnPropertySymbols(obj)                    

Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。                        

（5）Reflect.ownKeys(obj)                        

Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。

####7.Object.values()，Object.entries()
`Object.keys`/`Object.entries`/`Object.entries`方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名/键值/键值对数组。  

###Set和Map数据结构
###1.Set
* 基本用法

ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

	var s = new Set();
	
	[2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));
	
	for (let i of s) {
	  console.log(i);
	}
	// 2 3 5 4                   
Set函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。

	var set = new Set([1, 2, 3, 4, 4]);
	[...set]
	// [1, 2, 3, 4]

* Set实例的属性和方法                   
(1) Set结构的实例有以下属性:                  
Set.prototype.constructor：构造函数，默认就是Set函数。             
Set.prototype.size：返回Set实例的成员总数。                     
(2) Set实例的方法:
add(value)：添加某个值，返回Set结构本身。               
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。             
has(value)：返回一个布尔值，表示该值是否为Set的成员。               
clear()：清除所有成员，没有返回值。                     

		s.add(1).add(2).add(2);
		
		s.size // 2
		
		s.has(1) // true
		
		s.delete(2);
		s.has(2) // false
		
* 遍历操作              
keys()：返回键名的遍历器              
values()：返回键值的遍历器                 
entries()：返回键值对的遍历器                
forEach()：使用回调函数遍历每个成员	 
由于Set结构没有键名，只有键值，所以key方法和value方法的行为完全一致。

		let set = new Set(['red', 'green', 'blue']);
		
		for (let item of set.keys()) {
		  console.log(item);
		}
		// red
		// green
		// blue
		
		for (let item of set.values()) {
		  console.log(item);
		}
		// red
		// green
		// blue
		
		for (let item of set.entries()) {
		  console.log(item);
		}
		// ["red", "red"]
		// ["green", "green"]
		// ["blue", "blue"]
Set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值。

		let set = new Set([1, 2, 3]);
		set.forEach((value, key) => console.log(value * 2) )
		
####2.Map
* Map结构的目的和基本用法 
Map类似于对象也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应。

		var m = new Map();
		var o = {p: 'Hello World'};
		
		m.set(o, 'content')
		m.get(o) // "content"
		
		m.has(o) // true
		m.delete(o) // true
Map也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

		var map = new Map([
		  ['name', '张三'],
		  ['title', 'Author']
		]);
		
		map.size // 2
		map.has('name') // true
		map.get('name') // "张三"
		
* 实例的属性和操作方法                         
（1）size属性                
（2）set(key, value)                
（3）get(key)                  
（4）has(key)                  
（5）delete(key)                  
（6）clear()                   

* 遍历方法
keys()：返回键名的遍历器。           
values()：返回键值的遍历器。             
entries()：返回所有成员的遍历器。            
forEach()：遍历Map的所有成员。 

* 与其他数据结构的互相转换                       
（1）Map转为数组             
          
		let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
		[...myMap]
		// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
(2）数组转为Map                
将数组转入Map构造函数，就可以转为Map。

		new Map([[true, 7], [{foo: 3}, ['abc']]])
		// Map {true => 7, Object {foo: 3} => ['abc']}		
               