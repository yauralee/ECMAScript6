//1.数组的解构赋值

//1.1. 基本用法
var [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [ , , third] = ["foo", "bar", "baz"];


var [goo] = [];
var [hoo1, hoo2] = [1];
console.log(hoo2); //undefined


// let [oo] = 1;
// let [oo] = false;
// let [oo] = NaN;
// let [oo] = undefined;
// let [oo] = null;
// let [oo] = {};

//1.2. 默认值
var [oo1 = true] = [];
console.log(oo1); // true
[x, y = 'b'] = ['a'];
console.log(x);
console.log(y);// x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'


var [m = 1] = [undefined];
console.log(m);  //1
var [n = 1] = [null];
console.log(n);  //null


function f() {
    console.log('aaa');
}
let [t = f()] = [1];
console.log(t);  //1


let [aa = 1, bb = aa] = [];     // aa=1; bb=1
let [aa = 1, bb = aa] = [2];    // aa=2; bb=2
let [aa = 1, bb = aa] = [1, 2]; // aa=1; bb=2
let [aa = bb, bb = 1] = [];     // ReferenceError


//2. 对象的结构赋值
var { bar, foo } = { foo: "aaa", bar: "bbb" };

var { baz } = { foo: "aaa", bar: "bbb" };
console.log(baz);  //undefined

var { foo: baz1 } = { foo: 'aaa', bar: 'bbb' };
console.log(baz1);

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
console.log(f); // 'hello'
console.log(l); // 'world'

// var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };

var {x, y = 5} = {x: 1};
console.log(x);
console.log(y);


//3.字符串的解构赋值
const [a, b, c, d, e] = 'hello';
let {length : len} = 'hello';
console.log(len); //5


//4.数值和布尔值的解构赋值
let {toString: s} = 123;
console.log(s); //[Function: toString]
console.log(s === Number.prototype.toString );  //true

let {toString: s1} = true;
console.log(s1 === Boolean.prototype.toString); // true


//5.函数参数的解构赋值
function add([x, y]){
    return x + y;
}
console.log(add([1, 2])); // 3


//6.解构用途

//6.1. 交换变量的值
x = y =1;
[x, y] = [y, x];

//6.2. 从函数返回多个值
function example() {
    return [1, 2, 3];
}
var [a, b, c] = example();

//6.3. 函数参数的定义
function f([x, y, z]) { }
f([1, 2, 3]);

//6.4. 提取json数据
var jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);

//6.5. 函数参数的默认值
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

//6.6.遍历Map结构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
    console.log(key + " is " + value);
}
for (let [key] of map) {}
for (let [,value] of map) {}

//6.7. 输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");


