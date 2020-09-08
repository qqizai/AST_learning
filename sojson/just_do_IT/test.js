
var a = {
    'abc': function(arg1, arg2){
        return arg1+arg2;
    },
    'bcd': function test (arg1, arg2){
        return arg1+arg2;
    },
}


console.log(a['abc'](12, 23))
console.log(a['bcd'](12, 23))


;(function test (arg1, arg2){
    console.log(arg1+arg2)
    return arg1+arg2;
})(12, 23)

