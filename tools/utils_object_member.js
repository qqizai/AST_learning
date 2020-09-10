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

        let obj_name = node.id.name;

        //首先查看当前节点下，是否有赋值的情况，有的话，直接将 obj_name.info = 123 替换为：往 obj_name 的属性list里面增加一个ObjectProperty
        let all_next_siblings = path.parentPath.getAllNextSiblings();
        all_next_siblings.forEach(next_sibling => {
            if (next_sibling.type !== "ExpressionStatement") return;

            //获取表达式
            let expression = next_sibling.get("expression");
            if (expression.type !== "AssignmentExpression") return

            let { left, operator, right } = expression.node;
            if (left.type === "MemberExpression" && left.object.name === obj_name && operator === "=") {
                //开始往 obj_name 的属性list里面增加一个ObjectProperty

                //方法一
                /*//这个值的类型可能有很多种的，暂时还不知道如何覆盖全部/绝大部分，目前这里只是兼顾了 StringLiteral、NumericLiteral
                if (!(right.type === "StringLiteral" || right.type === "NumericLiteral")) return;
                let tmp_objectProperty = {
                    type: "ObjectProperty",
                    key: {
                        type: "StringLiteral",
                        value: left.property.name
                    },
                    value: {
                        type: right.type,
                        value: right.value
                    }
                }
                node.init.properties.push(tmp_objectProperty);*/

                //方法二：应该是可以覆盖全部的(只测试了 StringLiteral、NumericLiteral、UnaryExpression、FunctionExpression)
                node.init.properties.push(types.ObjectProperty(left.property, right));

                //然后移除当前已经处理的节点，一定记得需要检验一下，最后的代码，是否符合
                next_sibling.remove();
            }

        })


        //对对象名为 obj_name 的属性进行遍历，从这个节点的父节点开始往下找，如果找到了有相关应用的话，那么需要还原回去
        var objPropertiesList = node.init.properties;
        if (objPropertiesList.length == 0) return;

        objPropertiesList.forEach(prop => {
            //判断是否为 NumericLiteral、StringLiteral、简单的 FunctionExpression (直接返回的)
            var obj_key_name = prop.key.value;
            var obj_key_value = prop.value;
            var fnPath = path.getFunctionParent();

            //存在情况
            //1、VariableDeclaration,如 var abc = a.info 或 var abc = a['info']
            //2、ExpressionStatement,如 bcd = a.info 或 bcd = a['info']
            //同时还得再细分 CallExpression,如 var res = a['dd'](12, 23) 或者 res = a['dd'](12, 23)
            if (prop.key.type === "NumericLiteral" || prop.key.type === "StringLiteral") {

                fnPath.traverse(
                    {
                        //var abc = a.info
                        VariableDeclaration: function (var_path) {
                            var _path = var_path.node
                            if (_path.type === "MemberExpression" && _path.object.name === obj_name && _path.property.value === obj_key_name) {
                                console.log(obj_key_value)
                                var_path.replace(obj_key_value);
                            }
                        },

                        //bcd = a.info
                        ExpressionStatement: function (expre_path) {
                            var _path = expre_path.get("expression");
                            if (_path.type === "AssignmentExpression" && _path.operator === "=" && _path.right.type === "MemberExpression"
                                && _path.right.object.name === obj_name && _path.right.property.name === obj_key_name) {
                                console.log(obj_key_value)
                                var_path.replace(obj_key_value);
                            }
                        }
                    }
                )
            }

            if (prop.type === "FunctionExpression") {

            }

        })



    }
}



function handle_obj_member_value(ast) {
    traverse(ast, visitor_obj);
    return ast

}


var code = "function f() {\n" +
    "    var a = {\n" +
    "        'info': 123,\n" +
    "        'bc': 456,\n" +
    "        'dd': function(abc, abd){\n" +
    "            return abc+abd;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "\n" +
    "    a.age = 10\n" +
    "    a.addr = \"这是哪里\"\n" +
    "    a.test = !(function(abc, abd){\n" +
    "        return abc+abd;\n" +
    "    })(1213, 456);\n" +
    "\n" +
    "    var abc = a.info\n" +
    "    abc = a.info\n" +
    "    var abd = a['info']\n" +
    "    var abd = 1213\n" +
    "\n" +
    "    var res = a['dd'](12, 23)\n" +
    "}"

var ast = parser.parse(code)
ast = handle_obj_member_value(ast)
console.log(generator(ast).code)

function f() {
    var a = {
        'info': 123,
        'bc': 456,
        'dd': function(abc, abd){
            return abc+abd;
        }
    }


    a.age = 10
    a.addr = "这是哪里"
    a.test = !(function(abc, abd){
        return abc+abd;
    })(1213, 456);

    var abc = a.info
    abc = a.info
    var abd = a['info']
    var abd = 1213

    var res = a['dd'](12, 23)
}


