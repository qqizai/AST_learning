/**
 * 本脚本是处理 MemberExpression，即(对象的)成员表达式
 *
 * 注意：可能很多不同的类型，如果遇到了新的，可以自己扩展进来
 *
 * */

const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const types = require("@babel/types")



/**
 * 类型1
 *
 * 下面我举个例子，比如：
 * var test_obj = {a: 123, b:456};
 * var member_value = test_obj["a"];
 *
 * 将 test_obj["a"] 直接换成 123，所以 var member_value = 123;
 * */

let visitor_obj = {
    VariableDeclarator: function (path) {
        var node = path.node;

        //如果不是对象表达式，不用处理，直接跳过
        if (!types.isObjectExpression(node.init)) {
            return;
        }

        //提取对象的属性，作为一个list,同时再次用长度来判断一下，是否是一个空的对象，没有属性的
        var objPropertiesList = node.init.properties;
        if (objPropertiesList.length == 0) {
            return;
        }




    }
}



function handle_obj_member_value(ast) {

    //


}



