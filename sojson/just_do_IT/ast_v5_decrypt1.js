const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const types = require("@babel/types")
const fs = require("fs")

const sdk = require("./source_part_one")




/**
 * 1、加载js混淆代码
 * **/
const read_file_options = {
    encoding: "utf-8"
}
const source_code = fs.readFileSync("./source_part_two.js", read_file_options)

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

    //02、还原混淆js代码内部的字符串部分，替换那些使用到了 _0x1fff11 对象的值
    const operation_two = {

    }


    return ast
}


reduction(ast)


var result_code = generator(ast).code


console.log(result_code)
