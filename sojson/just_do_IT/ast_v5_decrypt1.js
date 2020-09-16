const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const types = require("@babel/types")
const fs = require("fs")
const path = require('path')

const sdk = require("./source_part_one")
const handle_obj_member_value = require("../../tools/utils_object_member")
const utils = require("../../tools/utils")


/**
 * 1、加载js混淆代码
 * **/
const read_file_options = {
    encoding: "utf-8"
}
const source_code = fs.readFileSync(path.join(__dirname, "./source_part_two.js"), read_file_options)

// console.log(source_code)


/**
 * 2、将js代码解析为AST语法树
 */
var ast = parser.parse(source_code)
// console.log(ast)

/**
 * 3、还原代码
 * */

//3.1 将混淆字符串解密，还原回去
function reduction(ast) {

    //01、还原调用指定函数加密的字符串部分
    const operation_one = {
        CallExpression(path){
            var current_node = path.node
            if (current_node.callee.name === sdk.funcName && current_node.arguments.length === 2) {
                var decrypt_str = sdk.funcDecrypt(current_node.arguments[0].value, current_node.arguments[1].value)
                // console.log(decrypt_str)

                //替换为 解密后的字符串/明文字符串
                path.replaceWith(types.stringLiteral(decrypt_str))

                /*var new_node = {
                    type: types.stringLiteral,
                    value: decrypt_str
                }
                console.log(new_node)
                return new_node*/

            }
        }
    }
    traverse(ast, operation_one)

    //02、还原对象赋值、取值的情况
    ast = handle_obj_member_value.handle_obj_member_value(ast)
    ast = handle_obj_member_value.handle_anonymous_function(ast)

    //还原一些 Unicode、十六进制的数值/字符串
    traverse(ast, utils.visitor_hex_decode)
    traverse(ast, utils.visitor_unicode_decode)


    return ast
}


reduction(ast)


//Unicode解码 opts = {jsescOption:{"minimal":true}}
var result_code = generator(ast,
    opts = {jsescOption:{"minimal":true}}
    ).code

console.log("========================================================================================================================")
console.log(result_code)
console.log("========================================================================================================================")
