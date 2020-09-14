/****************************************************************************************************************

 本脚本是处理对象的取值、赋值情况

  注意：可能很多不同的类型，如果遇到了新的，可以自己扩展进来
  (对象属性的值是函数的时候，对于实参全部是字面量的函数调用，且运行结果唯一时，才可以进行替换)


 before：

 function f() {
    var a = {
        'info': 123,
        'bc': 456,
        'dd': function test(abc, abd) {
            // return typeof abc + "---" + abd;
            return abc + abd;
        },
        age: 10,
        addr: "这是哪里",
        nb: false
    };
    var abc = a['info'];
    abc = a.info;
    var abd = a.bc;
    var dd = a.dd(12,23) + a.dd(11,22);
    var nb = a.nb;

}


 ------------------------------------------------------------------------------------------
 affter:

 function f() {
    var a = {
        'info': 123,
        'bc': 456,
        'dd': function test(abc, abd) {
            // return typeof abc + "---" + abd;
            return abc + abd;
        },
        age: 10,
        addr: "这是哪里",
        nb: false
    };
    var abc = 123;
    abc = 123;
    var abd = 456;
    var dd = 35 + 33;
    var nb = false;

}

 ***************************************************************************************************************/

const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const types = require("@babel/types")




const visitor_obj = {
    VariableDeclarator: function (path) {
        var node = path.node;

        if (!types.isObjectExpression(node.init)) {
            //如果不是对象表达式，不用处理，直接跳过
            return;
        }

        let obj_name = node.id.name;


        //=========还原对象的赋值===========================================================
        //1、首先查看当前节点下，是否有赋值的情况，有的话，直接将 obj_name.info = 123 替换为：往 obj_name 的属性list里面增加一个ObjectProperty
        let all_next_siblings = path.parentPath.getAllNextSiblings();
        all_next_siblings.forEach(next_sibling => {
            if (next_sibling.type !== "ExpressionStatement") {
                return;
            }

            //获取表达式
            let expression = next_sibling.get("expression");
            if (expression.type !== "AssignmentExpression") {
                return;
            }

            let { left, operator, right } = expression.node;
            if (left.type === "MemberExpression" && left.object.name === obj_name && operator === "=") {
                //开始往 obj_name 的属性list里面增加一个ObjectProperty
                node.init.properties.push(types.ObjectProperty(left.property, right));
                //然后移除当前已经处理的节点，一定记得需要检验一下，最后的代码，是否符合
                next_sibling.remove();
            }
        })
        //====================================================================


        //=========还原从对象取值===========================================================
        //2、对对象名为 obj_name 的属性进行遍历，从这个节点的父节点开始往下找，如果找到了有相关应用的话，那么需要还原回去
        var objPropertiesList = node.init.properties;
        if (objPropertiesList.length === 0) return;

        objPropertiesList.forEach(prop => {
            //判断是否为 NumericLiteral、StringLiteral、简单的 FunctionExpression (直接返回的)
            var obj_key_name = prop.key.value || prop.key.name;
            var obj_key_value = prop.value.value || prop.value.name;

            var fnPath = path.getFunctionParent();

            //存在情况
            //如 var abc = a.info 或 var abc = a['info']
            //同时还得再细分 CallExpression,如 var res = a['dd'](12, 23) 或者 res = a['dd'](12, 23)
            //=========还原简单的字面量===========================================================
            if (types.isLiteral(prop.value)){
                fnPath.traverse(
                    {
                        //var abc = a.info、var abc = a['info']、abc = a.info、abc = a['info']
                        MemberExpression: function (_path) {
                            var _node = _path.node

                            if (_node.object.name === obj_name
                                && (_node.property.value === obj_key_name || _node.property.name === obj_key_name)
                                && _path.parent.type !== "CallExpression"
                            ) {
                                _path.replaceWith(prop.value);
                            }

                        }
                    }
                )
            }
            //====================================================================


            //=========还原简单的函数调用===========================================================
            if (types.isFunctionExpression(prop.value) && types.isReturnStatement(prop.value.body.body[0])) {
                fnPath.traverse(
                    {
                        CallExpression: function (_path) {
                            var _node = _path.node
                            var _callee = _node.callee

                            var _code = generator(prop.value.body).code
                            //返回值不唯一不做处理
                            if (_code.indexOf("try") !== -1 || _code.indexOf('random') !== -1 || _code.indexOf('Date') !== -1) {
                                return;
                            }

                            var params = [];
                            if (prop.value.params.length === 0) return;
                            for (let i in prop.value.params) {
                                params.push(prop.value.params[i].name);
                            }

                            var params_str = params.join(",");
                            var call_fun = new Function(params_str, _code);
                            var args = [];
                            var tmp = _node.arguments
                            try {
                                for (let i in tmp) {
                                    if (tmp[i].value === undefined) return;
                                    args.push(tmp[i].value);
                                }
                            } catch (e) {
                                return;
                            }

                            if(types.isMemberExpression(_callee) && _callee.object.name === obj_name && (_callee.property.value === obj_key_name || _callee.property.name === obj_key_name)) {
                                try {
                                    let value = call_fun.apply(null, args);
                                    if (value !== undefined){
                                        _path.replaceWith(types.valueToNode(value));
                                    }
                                } catch (e) {
                                }

                            }

                        }
                    }
                )


            }

        })



    }
}

function handle_obj_member_value(ast) {
    traverse(ast, visitor_obj);
    return ast
}


function example(){
    var code = "function f() {\n" +
        "    var a = {\n" +
        "        'info': 123,\n" +
        "        'bc': 456,\n" +
        "        'dd': function test(abc, abd) {\n" +
        "            return typeof abc + \"---\" + abd;\n" +
        "        },\n" +
        "        age: 10,\n" +
        "        addr: \"这是哪里\",\n" +
        "        nb: false\n" +
        "    };\n" +
        "    var abc = a['info'];\n" +
        "    abc = a.info;\n" +
        "    var abd = a.bc;\n" +
        "    var dd = a.dd(12,23);\n" +
        "    var nb = a.nb;\n" +
        "\n" +
        "}"

    var ast = parser.parse(code)
    ast = handle_obj_member_value(ast)

    console.log(generator(ast).code)
}


module.exports = {
    "handle_obj_member_value": handle_obj_member_value
}
