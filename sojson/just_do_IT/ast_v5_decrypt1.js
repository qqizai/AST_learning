const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const types = require("@babel/types")
const fs = require("fs")
const path = require('path')

const sdk = require("./source_part_one")


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

    //02、还原 a、b对象赋值的最终情况


    //03、还原混淆js代码内部的字符串部分，替换那些使用到了 _0x1fff11 对象的值
    const operation_two = function(path){
        var current_node = path.node
        const obj_name = current_node.id.name;
        console.log(obj_name)


        /*if (current_node.init.properties.length > 0){
            var propertiesList = current_node.init.properties

            for (one of propertiesList){

                if (one.type === "ObjectProperty"){

                    var obj_key = one.key.name
                    var obj_value = one.value.value
                    console.log(obj_key, obj_value)

                    //获取最近的一个父节点(我个人理解为：获取当前节点的最近上一级节点。如有理解错，烦请大佬提醒，share&love)
                    var parent_node = path.getFunctionParent()
                    // console.log(parent_node)

                    parent_node.traverse({
                        MemberExpression(son_path){
                            var son_node = son_path.node
                            if (son_node.object.name === obj_name
                                && son_node.property.type === "StringLiteral"
                                && son_node.property.value === obj_key){

                                /!*console.log("12333333333")
                                console.log(obj_name, obj_key, obj_value)*!/
                                son_path.replaceWith(types.numericLiteral(obj_value))

                            }
                        }
                    })


                }

            }

            //删除这个节点
            // path.remove()

        }*/



    }
    /*traverse(ast, {
        VariableDeclarator: operation_two
    })*/

    return ast
}


reduction(ast)


var result_code = generator(ast).code


console.log(result_code)
