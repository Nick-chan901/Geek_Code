// 用状态机实现字符串“abcabx”的解析
// 创建状态机
function machine(string) {
    let state = start;
    for (let c of string) {
        state = state(c);
    }
    return state === end;
}
// 开始机
function start(c) {
    if (c == 'a') {
        return funA;
    } else {
        return start;
    }
}
// 结束机
function end(c) {
    return end;
}

function funA(c) {
    if (c == 'b') {
        return funB;
    } else {
        return start(c);
    }
}

function funB(c) {
    if (c == 'c') {
        return funC;
    } else {
        return start(c);
    }
}

function funC(c) {
    if (c == 'a') {
        return funA1;
    } else {
        return start(c);
    }
}

function funA1(c) {
    if (c == 'b') {
        return funB1;
    } else {
        return start(c);
    }
}

function funB1(c) {
    if (c == 'x') {
        return end;
    } else {
        return funB(c);
    }
}

console.log(machine('asdababcabxasdas'))
console.log('hallo world');



// 作业：使用状态机完成”abababx”的处理。

// 创建状态机
function machine1(string) {
    let state = start;
    for (let c of string) {
        state = state(c);
    }
    return state === end;
}
// 开始机

function start(c) {
    return c == 'a' ? funA : start;
}
// 结束机
function end(c) {
    return end;
}

function funA(c) {
    return c == 'b' ? funB : start(c);
}

function funB(c) {
    return c == 'a' ? funA1 : start(c);
}

function funA1(c) {
    return c == 'b' ? funB1 : start(c);
}

function funB1(c) {
    return c == 'a' ? funA2 : start(c);
}

function funA2(c) {
    return c == 'b' ? funC : start(c);
}

function funC(c) {
    return c == 'x' ? end : funB1(c);
}

// console.log(machine1('ababxabababaxababababx'));


// 我们如何用状态机处理完全未知的 pattern？

function match(str, pattern) {
    let M = pattern.length,
        N = str.length,
        i = 0,
        j = 0,
        o = {},
        fun = KMP(pattern);
    // 生成pattern中不重复元素的对象
    for (let t of pattern) {
        if (!o[t]) {
            o[t] = t;
        }
    }
    for (; i < N && j < M; i++) {
        j = !!o[str[i]] ? fun[j][str[i]] : 0;
    }
    if (j === M) return true;
    return false;
}

function KMP(pattern) {
    let X = 0,
        M = pattern.length,
        o = {},
        fun = new Array(M);
    // 生成pattern中不重复元素的对象
    for (let t of pattern) {
        if (!o[t]) {
            o[t] = t;
        }
    }
    // 创建长度为fun.length的数组，每一项为一个对象
    for (let i = 0; i < fun.length; i++) {
        fun[i] = {
            ...o
        };
    }
    // 初始化fun[0],初始化X的状态，后面的状态要用这一状态来复制
    for (let k in fun[0]) {
        fun[0][k] = 0;
    }
    // 状态0时，匹配到的第一位进入状态1
    fun[0][pattern[0]] = 1;
    // 生成后面状态机
    for (let j = 1; j < M; j++) {
        for (let c in o) {
            // console.log(fun, X, c);
            // 设置状态j的匹配失败项，从状态X复制
            fun[j][c] = fun[X][c];
        }
        // 设置匹配成功项
        fun[j][pattern[j]] = j + 1;
        // 计算下一状态的X
        X = fun[X][pattern[j]];
    }
    console.log(fun);
    return fun;
}

console.log(match('ababxabababaxababababxx', 'abababx'));