var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require('escodegen');
var iconv = require('iconv-lite');
const fs = require("fs");
var escope = require('escope');

var content = fs.readFileSync('tdCapcha.js', {encoding: 'binary'});
var buf = new Buffer.from(content, 'binary');
var code = iconv.decode(buf, 'utf-8');

QOoQQQ = function QOoQQQ(oQ0o00) {
    var OoQoOo = '';
    for (var O0QOO0 = 0; O0QOO0 < oQ0o00.length; O0QOO0++) {
        var O00QQO = oQ0o00.charCodeAt(O0QOO0);
        if (O00QQO >= 97 && O00QQO <= 122) {
            if (O00QQO == 97) {
                O00QQO = 123;
            }
            ;OoQoOo += String.fromCharCode(O00QQO - 1);
        } else {
            OoQoOo += oQ0o00[O0QOO0];
        }
    }
    return OoQoOo;
}

var ast = esprima.parse(code);
var scopeManager = escope.analyze(ast);
var currentScope = scopeManager.acquire(ast);
ast = estraverse.replace(ast, {
    enter: function (node) {
        // Replace it with replaced.
        if (node.type == 'CallExpression' && node.callee.type == 'Identifier' && node.callee.name == "QOoQQQ" && node.arguments.length == 1 && node.arguments[0].type == 'Literal') {
            var val = QOoQQQ(node.arguments[0].value);
            return {
                type: esprima.Syntax.Literal,
                value: val,
                raw: val
            }
        }
    }
});

ast = estraverse.replace(ast, {
    enter: function (node) {
        // Replace it with replaced.
        if (node.type == 'SwitchCase' && node.test && node.test.type == "BinaryExpression") {
            var val = eval(escodegen.generate(node.test));
            return {
                type: esprima.Syntax.SwitchCase,
                test: {
                    type: esprima.Syntax.Literal,
                    value: val,
                    raw: val
                },
                consequent: node.consequent
            }
        }
    }
});

// 反控制流平坦化
ast = estraverse.replace(ast, {
    enter: function (node) {
        // 获取作用域
        if (/Function/.test(node.type)) {
            currentScope = scopeManager.acquire(node);  // get current function scope
        }
        var keys = []
        for (var key of currentScope.set.keys()) {
            keys.push(key)
        }
        var casename = null;
        if (node.type == 'WhileStatement' && node.test && node.test.type == "Identifier") {
            casename = node.test.name;
            if (node.body && node.body.type == "BlockStatement" && casename != null) {
                if (node.body.body && node.body.body.length > 0) {
                    for (var idx = 0; idx < node.body.body.length; idx++) {
                        if (node.body.body[idx].type == "SwitchStatement") {
                            if (node.body.body[idx].discriminant && node.body.body[idx].discriminant.type == "Identifier" && node.body.body[idx].discriminant.name && node.body.body[idx].discriminant.name == casename) {
                                // while(a){
                                //     switch(a){
                                //         case ...
                                //     }
                                // }
                                // case_start_value = eval()
                                var values = {}
                                var igorne_name = ['arguments']
                                for (var value of currentScope.variables) {

                                    if (igorne_name.indexOf(value.name) < 0) {
                                        if (value.defs && value.defs.length == 1 && value.defs[0].type == "Variable") {
                                            if (value.defs[0].name && value.defs[0].name.type && value.defs[0].name.type == "Identifier") {
                                                if (value.defs[0].node && value.defs[0].node.type && value.defs[0].node.type == "VariableDeclarator") {
                                                    if (value.defs[0].node.init && value.defs[0].node.init.type && value.defs[0].node.init.type == "Literal") {
                                                        values[value.name] = value.defs[0].node.init.value
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (keys.indexOf(casename)) {
                                    var case_start_value = values[casename]
                                    var case_list = {}
                                    var flag = true;
                                    for (var i = 0; i < node.body.body[idx].cases.length; i++) {
                                        if (node.body.body[idx].cases[i].test && node.body.body[idx].cases[i].test.type == "Literal") {
                                            case_list[node.body.body[idx].cases[i].test.value] = node.body.body[idx].cases[i].consequent[0]
                                        } else {
                                            flag = false;
                                        }
                                    }
                                    if (flag) {
                                        var start_case = case_list[case_start_value]
                                        var end_case = null;
                                        var end_case_value = null;
                                        var isreturn = false
                                        for (var ii in case_list) {
                                            var case_example = case_list[ii]
                                            if (case_example.body && case_example.body.length > 0 && case_example.body.pop().type == "BreakStatement") {
                                                if (case_example.body[case_example.body.length - 1].type == "ExpressionStatement") {
                                                    if (case_example.body[case_example.body.length - 1].expression && case_example.body[case_example.body.length - 1].expression.type == "AssignmentExpression" && case_example.body[case_example.body.length - 1].expression.right.type != "Literal") {
                                                        end_case = case_example.body;
                                                        end_case_value = parseInt(ii)
                                                    }
                                                } else {
                                                    flag = false;
                                                }
                                            } else {
                                                flag = false;
                                            }
                                        }
                                        if (end_case_value == null) {
                                            for (var ii in case_list) {
                                                var case_example = case_list[ii]
                                                if (case_example.body && case_example.body.length > 0 && case_example.body[case_example.body.length - 1].type == "ExpressionStatement") {
                                                    if (case_example.body[case_example.body.length - 2].type == "ReturnStatement") {
                                                        end_case = case_example.body;
                                                        end_case_value = parseInt(ii)
                                                        isreturn = true
                                                        flag = true
                                                    } else {
                                                        flag = false;
                                                    }
                                                } else {
                                                    flag = false;
                                                }
                                            }
                                        }
                                        if (flag) {
                                            var struct_body = {
                                                type: esprima.Syntax.WhileStatement,
                                                test: {
                                                    type: esprima.Syntax.Identifier,
                                                    name: casename
                                                },
                                                body: {
                                                    type: esprima.Syntax.BlockStatement,
                                                    body: []
                                                }
                                            }
                                            var body = []
                                            var body_end = {
                                                type: esprima.Syntax.IfStatement,
                                                test: {
                                                    type: esprima.Syntax.Identifier,
                                                    name: casename
                                                },
                                                consequent: {
                                                    type: esprima.Syntax.BlockStatement,

                                                },
                                                alternate: {
                                                    type: esprima.Syntax.BlockStatement,
                                                    body: [
                                                        {
                                                            type: esprima.Syntax.BreakStatement,
                                                            label: null
                                                        }
                                                    ]
                                                }
                                            }
                                            var case_id = case_start_value
                                            while (flag) {
                                                var case_now = case_list[case_id]
                                                if (case_id == case_start_value) {
                                                    var b = {
                                                        type: esprima.Syntax.IfStatement,
                                                        test: {
                                                            type: esprima.Syntax.BinaryExpression,
                                                            operator: "==",
                                                            left: {
                                                                type: esprima.Syntax.Identifier,
                                                                name: casename
                                                            },
                                                            right: {
                                                                type: esprima.Syntax.Literal,
                                                                value: case_start_value,
                                                                raw: case_start_value
                                                            }
                                                        },
                                                        consequent: {
                                                            type: esprima.Syntax.BlockStatement,
                                                            body: []
                                                        }
                                                    }
                                                    for (var iii = 0; iii < case_now.body.length; iii++) {
                                                        b.consequent.body.push(case_now.body[iii])
                                                    }
                                                    body.push(b)
                                                } else if (case_id == end_case_value && isreturn == false) {
                                                    if (body_end.consequent.body && body_end.consequent.body.length >= 0) {
                                                        body.push(body_end)
                                                        break
                                                    } else {
                                                        for (var iii = 0; iii < case_now.body.length; iii++) {
                                                            body.push(case_now.body[iii])
                                                        }
                                                        case_id = case_now.body[case_now.body.length - 1].expression.right.consequent.value
                                                        body_end.consequent.body = []
                                                        continue
                                                    }
                                                } else {
                                                    if (body_end.consequent.body && body_end.consequent.body.length >= 0) {
                                                        for (var iii = 0; iii < case_now.body.length; iii++) {
                                                            body_end.consequent.body.push(case_now.body[iii])
                                                        }
                                                    } else {
                                                        for (var iii = 0; iii < case_now.body.length; iii++) {
                                                            body.push(case_now.body[iii])
                                                        }
                                                    }
                                                }

                                                if (isreturn) {
                                                    debugger
                                                }
                                                if (case_id == end_case_value && isreturn) {
                                                    debugger
                                                    break
                                                }
                                                case_id = case_now.body[case_now.body.length - 1].expression.right.value

                                            }
                                            struct_body.body.body = body;
                                            return struct_body
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    leave: function (node) {
        if (/Function/.test(node.type)) {
            currentScope = currentScope.upper;  // set to parent scope
        }
    }
});

code = escodegen.generate(ast)

fs.writeFile('output.js', code, {flag: 'w', encoding: 'utf-8', mode: '0666'}, function (err) {
    if (err) {
        console.log("文件写入失败")
    } else {
        console.log("文件写入成功");
    }
});


