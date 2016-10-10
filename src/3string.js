//1. 字符的Unicode表示法
console.log("\u{20BB7}");



//2. codePointAt()
var s = "𠮷";
console.log(s.length); // 2
s.charAt(0); // ''
s.charAt(1); // ''
console.log(s.charCodeAt(0)); // 55362
console.log(s.charCodeAt(1)); // 57271

var s1 = '𠮷a';
console.log(s1.codePointAt(0)); // 134071
console.log(s1.codePointAt(1)); // 57271
console.log(s1.charCodeAt(2)); //97

for (let ch of s1) {
    console.log(ch.codePointAt(0).toString(16));
}// 20bb7 61



//3.String.fromCodePoint()
console.log(String.fromCharCode(0x20BB7));  //ஷ

console.log(String.fromCodePoint(0x20BB7)); //𠮷


//4.字符串的遍历器接口
for (let codePoint of 'foo') {
    console.log(codePoint)
}

var text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
    console.log(text[i]);
}// " "  " "
for (let i of text) {
    console.log(i);
}// "𠮷"


//5.at()
console.log('abc'.charAt(0));  //a
console.log('𠮷'.charAt(0)); //?

// console.log('𠮷'.at(0));  // "𠮷"


//6.includes(), startsWith(), endsWith()
// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
var s = 'Hello world!';
s.startsWith('Hello'); // true
s.startsWith('world', 6); // true


//7.repeat()
'hello'.repeat(2); // "hellohello"
'na'.repeat(2.9); // "nana"
// 'na'.repeat(-1); //RangeError: Invalid count value


//8.padStart()，padEnd()
// 'x'.padStart(5, 'ab');// 'ababx'
// 'x'.padStart(4) // '   x'


//9.模板字符串
// $('#result').append(
//     'There are <b>' + basket.count + '</b> ' +
//     'items in your basket, ' +
//     '<em>' + basket.onSale +
//     '</em> are on sale!'
// );

$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
