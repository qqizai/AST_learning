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

/*******************************************************
 还原object，key多为字符串，value为字符串和函数
 多看看文档，会有不一样的收获的: https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md
 *******************************************************/
const decode_object = {
    VariableDeclarator(path) {
        const {id, init} = path.node;
        if (!types.isObjectExpression(init)) return;
        let name = id.name;
        let properties = init.properties;
        //获取当前节点后面的弟弟节点,  注意获取全部、及获取单个弟弟节点( getAllNextSiblings 和 getNextSibling )
        let all_next_siblings = path.parentPath.getAllNextSiblings();
        // console.log(all_next_siblings.toString())

        for (let next_sibling of all_next_siblings) {
            if (!next_sibling.isExpressionStatement()) break;
            let expression = next_sibling.get('expression');

            if (!expression.isAssignmentExpression()) break;

            let {operator, left, right} = expression.node;

            if (operator != '=' || !types.isMemberExpression(left) ||
                !types.isIdentifier(left.object, {name: name}) || !types.isStringLiteral(left.property)) {
                break;
            }
            properties.push(types.ObjectProperty(left.property, right));

            next_sibling.remove();

        }

        if (properties.length == 0) {
            return;
        }

        let scope = path.scope;
        let next_sibling = path.parentPath.getNextSibling();
        if (next_sibling.isVariableDeclaration()) {
            let declarations = next_sibling.node.declarations;

            if (declarations.length > 0 && types.isIdentifier(declarations[0].init, {name: name})) {
                scope.rename(declarations[0].id.name, name);
                next_sibling.remove();
            }
        }

        for (const property of properties) {//预判是否为 obfuscator 混淆的object
            let key = property.key.value;
            let value = property.value;
            if (!types.isStringLiteral(value) && !types.isFunctionExpression(value)) {
                return;
            }
        }

        for (const property of properties) {
            let key = property.key.value;
            let value = property.value;
            if (types.isLiteral(value)) {
                scope.traverse(scope.block, {
                    MemberExpression(_path) {
                        let _node = _path.node;
                        if (!types.isIdentifier(_node.object, {name: name})) return;
                        if (!types.isLiteral(_node.property, {value: key})) return;
                        _path.replaceWith(value);
                    },
                })
            } else if (types.isFunctionExpression(value)) {
                let ret_state = value.body.body[0];
                if (!types.isReturnStatement(ret_state)) continue;
                scope.traverse(scope.block, {
                    CallExpression: function (_path) {
                        let {callee, arguments} = _path.node;
                        if (!types.isMemberExpression(callee)) return;

                        if (!types.isIdentifier(callee.object, {name: name})) return;
                        if (!types.isLiteral(callee.property, {value: key})) return;

                        let replace_node = null;

                        if (types.isCallExpression(ret_state.argument) && arguments.length > 0) {
                            replace_node = types.CallExpression(arguments[0], arguments.slice(1));
                        } else if (types.isBinaryExpression(ret_state.argument) && arguments.length === 2) {
                            replace_node = types.BinaryExpression(ret_state.argument.operator, arguments[0], arguments[1]);
                        } else if (types.isLogicalExpression(ret_state.argument) && arguments.length === 2) {
                            replace_node = types.LogicalExpression(ret_state.argument.operator, arguments[0], arguments[1]);
                        }
                        replace_node && _path.replaceWith(replace_node);
                    }
                })
            }
        }
        path.remove();
    },
}

function get_object_value(ast) {
    traverse(ast, decode_object);
    return ast;
}

module.exports = {
    "get_object_value": get_object_value
}


