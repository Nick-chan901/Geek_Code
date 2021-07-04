//在一个字符串中，找到字符”a”
//方法一：
function findThis1(string) {
    let flag = false;
    for (let c = 0; c < string.length; c++) {
        if (string.charAt(c) == "a") {
            flag = true;
            return flag;
        }
    }
    return flag;
}
findThis1('i am chmp');


//方法二：
function findThis2(string) {
    return string.indexOf('a') > -1;

}
findThis2('afsaf');


//不准使用正则表达式，纯粹用 JavaScript 的逻辑实现：在一个字符串中，找到字符“ab”

function findDouble1(string) {
    for (let per = 0; per < string.length; per++) {
        if (string.charAt(per) == 'a') {
            if (string.charAt((per + 1)) == 'b') {
                return true;
            }
        }
    }
    return false;
}
console.log(findDouble1('accccabccccsb'));


// 不准使用正则表达式，纯粹用 JavaScript 的逻辑实现：在一个字符串中，找到字符“abcdef”

function match(string) {
    let funA = false;
    let funB = false;
    let funC = false;
    let funD = false;
    let funE = false;
    for (let c of string) {
        if (c == 'a') {
            funA = true;
        } else if (funA && !funB && c == 'b') {
            funB = true;
        } else if (funB && !funC && c == 'c') {
            funC = true;
        } else if (funC && !funD && c == 'd') {
            funD = true;
        } else if (funD && !funE && c == 'e') {
            funE = true;
        } else if (funE && c == 'f') {
            return true;
        } else {
            funA = false;
            funB = false;
            funC = false;
            funD = false;
            funE = false;
        }
    }
    return false;
}

console.log(match('abcdebcdeabcdebcdef'));