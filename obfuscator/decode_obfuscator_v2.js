/*****************************************************
 Module name:decode_obfuscator.js
 Author:陆小凤
 Date:2020.9.26
 Version:V5.0

 混淆工具地址:https://obfuscator.io/

 脚本仅用于被obfuscator混淆了的代码，如果源代码魔改过，

 则可能会导致本脚本失效。

 声明:脚本仅用于学习研究，禁止非法使用，否则后果自负！

 欢迎加入本人星球，解锁更多AST相关姿势！^_^

 星球地址:

 https://t.zsxq.com/FMRf2ZV

 书山有路勤为径
 学海无涯苦作舟

 *****************************************************/

//babel库及文件模块导入

const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser    = require("@babel/parser");
const traverse  = require("@babel/traverse").default;
const types     = require("@babel/types");
const generator = require("@babel/generator").default;


/**********************************************************

 命令行输入，获取混淆前的js源代码及解混淆后生成的新的js代码。
 eg: node decode_obfuscator.js encode.js decode_result.js
 encode.js 混淆前js源代码的路径
 decode_result.js 生成新js代码的路径
 默认 混淆前js源代码的路径为 ./encode.js
 默认 生成新js代码的路径为   ./decode_result.js

 ***********************************************************/

let encode_file = "./encode.js", decode_file = "./decode_result_" + (new Date()).getTime() + ".js";

if (process.argv.length > 2)
{
    encode_file = process.argv[2];
}
if (process.argv.length > 3)
{
    decode_file = process.argv[3];
}

let jscode = fs.readFileSync(encode_file, {encoding: "utf-8"});
let ast    = parser.parse(jscode);


/***********************************************************
 function name:traverse_literal
 traverse:
 var a = "\u0031\x32",b = 0x25,c = 0b10001001,d = 0o123456;
 =====>
 var a = "12",b = 37,c = 137,d = 42798;
 注意:有些"\uxxxx" 或者 "\x**"，替换出来时可能是乱码。

 注: 参考 官方插件 plugin-transform-literals，略有改动。
 ***********************************************************/
const traverse_literal = {
    NumericLiteral({node}) {
        if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
            node.extra = undefined;
        }
    },
    StringLiteral({node})
    {
        if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
            node.extra = undefined;
        }
    },
}

traverse(ast, traverse_literal);


/*********************************************
 判断一个节点是否是字面量，仅支持判断
 Literal表达式,或者数组类型的节点其元素是否全部为字面量
 欢迎补充

 ArrayExpression
 ObjectExpression
 CallExpression
 这三种类型。
 *********************************************/
function is_path_literal(path)
{
    let key = null;
    if (path.isLiteral()) return true;
    else if (path.isArrayExpression())
    {
        key = "elements";
    }
    else if (path.isObjectExpression())
    {
        key = "properties";
    }
    else if (path.isCallExpression())
    {
        key = "arguments";
    }

    else
    {
        var e = new Error();
        e.code = 22;
        e.message = 'Can only jugde ArrayExpression、ObjectExpression and Literal!';
        e.name = 'Type Error';
        throw e;
    }

    let elements = path.get(key);
    if (elements.length == 0) return true;

    if (key == "properties")
    {
        return elements.every(element => element.get("value").isLiteral());
    }
    else
    {
        return elements.every(element=>element.isLiteral());
    }
}


/********************************************************************

 替换函数调用处的字符串 即 CallExpression ----> StringLiteral
 obfuscator 混淆过的js代码特征很明显 大数组 + 移位函数 + 解密函数，
 然后在其他地方多次调用该解密函数
 下面的插件将调用处的CallExpression直接计算出来，然后再替换值。

 *********************************************************************/
const call_to_str = {
    VariableDeclarator(path)
    {
        let {id} = path.node;
        let name = id.name;
        let init_path = path.get('init');
        if (!init_path.isArrayExpression()) return;
        if (!is_path_literal(init_path)) return;



        let second_sibling = path.parentPath.getNextSibling();  //获取移位函数节点
        let third_sibling  = second_sibling.getNextSibling();   //获取解密函数节点

        //******************************************************特征判断开始
        if (!second_sibling.isExpressionStatement() ||!third_sibling.isVariableDeclaration())
        {
            return;
        }
        let expression = second_sibling.get('expression');
        if (!expression.isCallExpression()) return;
        let {callee,arguments} = expression.node;
        if (!types.isFunctionExpression(callee)) return;
        if (arguments.length < 2) return;
        if (!types.isIdentifier(arguments[0],{name:name})) return;
        if (!types.isNumericLiteral(arguments[1])) return;

        let declarations = third_sibling.node.declarations;
        if (declarations.length < 1 || !types.isFunctionExpression(declarations[0].init))
        {
            return;
        }
        //******************************************************特征判断结束

        let end = third_sibling.node.end; //防止遍历函数体里的调用

        let source_code = second_sibling.toString();
        if (source_code.indexOf('removeCookie') != -1)
        {//如果含有检测格式化的代码，处理移位函数及解密函数
            let second_arg_node = callee.params[1];
            let thrid_arg_node = types.valueToNode(null);
            if (callee.params.length == 3)
            {
                thrid_arg_node = callee.params[2];
            }
            let body = callee.body.body;
            let call_fun = body[0].declarations[0].id;
            body.pop();
            body.push(types.ExpressionStatement(types.UpdateExpression("++", second_arg_node)));
            body.push(types.ExpressionStatement(types.CallExpression(call_fun, [second_arg_node,thrid_arg_node])));

            third_sibling.traverse({
                IfStatement(path)
                {
                    let {consequent,alternate} = path.node;
                    if (alternate == null) return;
                    let body = consequent.body;
                    if (!body || body.length < 2) return;
                    let len = body.length;
                    path.replaceInline(body[len-2]);
                },
            })
        }

        let third_id   = declarations[0].id;
        let third_init = declarations[0].init;

        let func_name = third_id.name;
        let params = third_init.params;
        let body = third_init.body.body;

        let new_node = types.AssignmentExpression("=",third_id,types.ObjectExpression([]));
        body.unshift(types.ExpressionStatement(new_node));
        body.unshift(second_sibling.node);
        body.unshift(path.parentPath.node);
        let {code} = generator(third_init.body);
        body.splice(0,3);

        let new_params = [];
        params.forEach((ele,index) =>{new_params[index] = ele.name;});
        let func_call = new Function(new_params,code);


        const binding = third_sibling.scope.getBinding(func_name);
        if (!binding || binding.constantViolations.length > 0)
        {
            return;
        }

        let can_removed = true;
        for (const refer_path of binding.referencePaths)
        {
            if (refer_path.node.start < end)
            {
                continue;
            }
            let call_path = refer_path.findParent(p => {return p.isCallExpression();});
            let arg_path = call_path.get("arguments");
            if (!is_path_literal(call_path))
            {
                can_removed = false;
                continue;
            }
            let {arguments} = call_path.node;
            let new_arguments = []
            arguments.forEach((ele,index) =>{new_arguments[index] = ele.value;});
            let value = func_call.apply(null,new_arguments);
            console.log(call_path.toString(),"-->",value);
            call_path.replaceInline(types.valueToNode(value));
        }

        if (can_removed)
        {
            path.remove();
            second_sibling.remove();
            third_sibling.remove();
        }
    },
}
traverse(ast, call_to_str);

/********************************************************************
 object对象还原预处理

 SequenceExpression ---> ExpressionStatement
 MemberExpression      --> Literal,object对象还原预处理
 a.length  ====> a["length"];
 参考官方插件
 plugin-transform-member-expression-literals
 略有修改

 var foo = {
  bar: function () {},
}
 =====>
 var foo = {
  "bar": function () {},
}
 参考官方插件 plugin-transform-property-literals
 *********************************************************************/

const pre_decode_object = {
    ExpressionStatement(path)
    {
        //****************************************特征判断开始
        let prev_sibling = path.getPrevSibling();
        if (!prev_sibling.isVariableDeclaration()) return;
        let {declarations} = prev_sibling.node;
        if (declarations.length < 1) return;
        let {id,init} = declarations[0];
        if (!types.isObjectExpression(init)) return;

        let {expression} = path.node;
        if (!types.isSequenceExpression(expression)) return;
        //****************************************特征判断结束
        let body = [];
        expression.expressions.forEach(express=>
        {
            body.push(types.ExpressionStatement(express));
        })
        path.replaceInline(body);
    },
    MemberExpression:
        {
            exit({node})
            {
                const prop = node.property;
                if (!node.computed && types.isIdentifier(prop))
                {
                    node.property = types.StringLiteral(prop.name);
                    node.computed = true;
                }
            }
        },
    ObjectProperty:
        {
            exit({node})
            {
                const key = node.key;
                if (!node.computed && types.isIdentifier(key))
                {
                    node.key = types.StringLiteral(key.name);
                }
            }
        },
}

traverse(ast, pre_decode_object);


/********************************************************
 BinaryExpression      --> Literal,object对象还原预处理
 1+2       =====> 3
 UnaryExpression       --> Literal,object对象还原预处理
 ![]       =====> false
 ConditionalExpression --> Literal,object对象还原预处理
 true?a:b; ====> a;
 ********************************************************/

const preprocess_expression =
    {
        "BinaryExpression|UnaryExpression|ConditionalExpression"(path)
        {
            if (path.type == "UnaryExpression" && path.node.operator == "-")
            {
                return;
            }
            const {confident,value} = path.evaluate();
            if (value == "Infinity" || !confident) return;

            path.replaceInline(types.valueToNode(value));
        },
    }

traverse(ast, preprocess_expression);

/********************************************************************
 处理object
 *********************************************************************/
const decode_object = {

    VariableDeclarator(path)
    {

        const {id,init} = path.node;
        if (!types.isObjectExpression(init)) return;
        let name = id.name;
        let properties = init.properties;
        let all_next_siblings = path.parentPath.getAllNextSiblings();

        for (let next_sibling of all_next_siblings)
        {
            if (!next_sibling.isExpressionStatement())  break;
            let expression = next_sibling.get('expression');
            if (!expression.isAssignmentExpression()) break;

            let {operator,left,right} = expression.node;

            if (operator != '=' || !types.isMemberExpression(left) ||
                !types.isIdentifier(left.object,{name:name}) || !types.isStringLiteral(left.property))
            {
                break;
            }
            properties.push(types.ObjectProperty(left.property,right));

            next_sibling.remove();
        }

        if (properties.length == 0)
        {
            return;
        }

        let scope = path.scope;
        let binding =  scope.getBinding(name);

        let next_sibling = path.parentPath.getNextSibling();
        if (next_sibling.isVariableDeclaration())
        {
            let declarations = next_sibling.node.declarations;

            if (declarations.length > 0 && types.isIdentifier(declarations[0].init,{name:name}))
            {
                scope.rename(declarations[0].id.name,name);
                next_sibling.remove();
            }
        }

        for (const property of properties)
        {//预判是否为 obfuscator 混淆的object
            let key   = property.key.value;
            let value = property.value;
            if (!types.isStringLiteral(value) && !types.isFunctionExpression(value))
            {
                return;
            }
            if (types.isFunctionExpression(value))
            {
                let ret_state = value.body.body;
                if (!ret_state || ret_state.length != 1) return;
                if (!types.isReturnStatement(ret_state[0])) return;
            }
        }

        let can_removed = false;
        for (const property of properties)
        {
            let key   = property.key.value;
            let value = property.value;

            if (types.isLiteral(value))
            {
                scope.traverse(scope.block,{
                    MemberExpression:{
                        exit(_path)
                        {
                            let {object,property} = _path.node;
                            if (!types.isIdentifier(object,{name:name})) return;
                            if (!types.isLiteral(property, {value:key})) return;
                            _path.replaceInline(value);
                        }
                    },
                })
            }
            else
            {
                let ret_state = value.body.body[0];
                scope.traverse(scope.block,{
                    CallExpression: {
                        exit(_path) {
                            let {callee,arguments} = _path.node;
                            if (!types.isMemberExpression(callee)) return;

                            if (!types.isIdentifier(callee.object,{name:name})) return;
                            if (!types.isLiteral(callee.property, {value:key})) return;

                            let replace_node = null;

                            if (types.isCallExpression(ret_state.argument) && arguments.length > 0) {
                                replace_node = types.CallExpression(arguments[0], arguments.slice(1));
                            }
                            else if (types.isBinaryExpression(ret_state.argument) && arguments.length === 2)
                            {
                                replace_node = types.BinaryExpression(ret_state.argument.operator, arguments[0], arguments[1]);
                            }
                            else if (types.isLogicalExpression(ret_state.argument) && arguments.length === 2)
                            {
                                replace_node = types.LogicalExpression(ret_state.argument.operator, arguments[0], arguments[1]);
                            }
                            if (replace_node)
                            {//替换函数成功为删除标志
                                can_removed = true;
                                _path.replaceWith(replace_node);
                            }
                        }
                    }
                })
            }
        }
        can_removed && path.remove();
    },
}
traverse(ast, decode_object);

/*******************************************************
 去控制流
 *******************************************************/
const decode_while = {
    WhileStatement(path)
    {
        const {test,body} = path.node;
        if (!types.isLiteral(test,{value:true}) || body.body.length === 0  || !types.isSwitchStatement(body.body[0])) return;
        let switch_state = body.body[0];
        let {discriminant,cases} = switch_state;
        if (!types.isMemberExpression(discriminant) || !types.isUpdateExpression(discriminant.property)) return;

        let arr_name = discriminant.object.name;
        let arr = [];
        let all_pre_siblings = path.getAllPrevSiblings();
        all_pre_siblings.forEach(pre_path =>
        {
            const {declarations} = pre_path.node;
            let {id,init} = declarations[0];
            if (arr_name == id.name)
            {
                arr = init.callee.object.value.split("|");
            }
            pre_path.remove();
        })

        let ret_body = [];
        arr.forEach(index =>
        {
            let case_body = cases[index].consequent;
            if (types.isContinueStatement(case_body[case_body.length-1]))
            {
                case_body.pop();
            }

            ret_body = ret_body.concat(case_body);
        })

        path.replaceInline(ret_body);
    },
}
traverse(ast, decode_while);



/***************************************************
 处理IfStatement，规范If表达式
 if (a)
 console.log("123");

 ===>
 if (a) {
  console.log("123");
}

 删除条件已知的语句
 if (1+2)
 {
	console.log("123");
}
 else
 {
	console.log("456");
}

 ===>

 console.log("123");
 ***************************************************/

const pretty_if_statement = {

    "IfStatement"(path)
    {
        let {consequent,alternate} = path.node;
        if (!types.isBlockStatement(consequent))
        {
            path.node.consequent = types.BlockStatement([consequent]);
        }
        if (alternate !== null && !types.isBlockStatement(alternate))
        {
            path.node.alternate = types.BlockStatement([alternate]);
        }

        let test_path = path.get('test');
        const evaluateTest = test_path.evaluateTruthy();
        if (evaluateTest === true)
        {
            path.replaceInline(consequent.body);
        }
        else if (evaluateTest === false)
        {
            alternate = path.node.alternate;
            alternate === null? path.remove():path.replaceInline(alternate.body);
        }
    },
    EmptyStatement(path)
    {
        path.remove();
    },
}
traverse(ast, pretty_if_statement);

/************************************
 处理完毕，生成新代码
 tips:  opts = {jsescOption:{"minimal":true}} 这个是可以限制还原后的代码，将转换为正常的字符串，如Unicode转换为正常的字符串显示
 *************************************/
let {code} = generator(ast);

fs.writeFile(decode_file, code, (err) => {});


