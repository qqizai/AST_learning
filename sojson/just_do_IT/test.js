const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const types = require("@babel/types")


var a = {
    'abc': function(arg1, arg2){
        return arg1+arg2;
    },
    'bcd': function test (arg1, arg2){
        return arg1+arg2;
    },
}


/*console.log(a['abc'](12, 23))
console.log(a['bcd'](12, 23))


;(function test (arg1, arg2){
    console.log(arg1+arg2)
    return arg1+arg2;
})(12, 23)*/


// const code = "var a = b + 2; var b = 4;var c = 'aaa'; function test(a,b){return a+b;}";
const code = "function test(a,b){return a+b;}";

var ast = parser.parse(code)

traverse(ast, {
    enter: function (path){
        var res = path.call("test", 12, 23);
        console.log(path.scope)
        console.log(res)

    }
})

/*
var a = b + 2; var b = 4

console.log(a)
console.log(b)

var test_add = function(a, b){
    return a+b;
}

var result = test_add(12, 23);
console.log(result)
*/



