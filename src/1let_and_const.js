//1.let命令

//1.1.基本用法
{
    var a = 10;
    let b = 20;
}
console.log(a);
// console.log(b);  //ReferenceError: b is not defined

//1.2.不存在变量提升
console.log(foo); //undefined
// console.log(bar); //ReferenceError: bar is not defined
var foo = 2;
let bar = 2;

//1.3. 暂时性死区（temporal dead zone，简称TDZ）
var tmp = 123;
if (true) {
    // tmp = 'abc'; //ReferenceError: tmp is not defined
    let tmp;
}

//1.4. 不允许重复声明
function f1() {
    let a = 10;
    // var a = 1; //SyntaxError: Identifier 'a' has already been declared
}


//2.块级作用域

//2.1. 为什么需要块级作用域?
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

//2.2. ES6的块级作用域
function f2() {
    let n = 5;
    if (true) {
        let n = 10;
    }
    console.log(n); // 5
}
f2();


//3. const命令

const PI = 3.1415;
// PI = 3; //TypeError: Assignment to constant variable.


// const foo;  //SyntaxError: Missing initializer in const declaration


if (true) {
    const MAX = 5;
}
// MAX // Uncaught ReferenceError: MAX is not defined


if (true) {
    // console.log(MAX1); // ReferenceError
    const MAX1 = 5;
}


const goo = {};
goo.prop = 123;
console.log(goo.prop); // 123
// goo = {}; //TypeError: Assignment to constant variable.
