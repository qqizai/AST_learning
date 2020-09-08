const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const types = require("@babel/types")

/*const source_code = "const test = function (a, b) {return a+b}; var result = test(3, 2);"


var ast = parser.parse(source_code)

traverse(ast, {
    CallExpression(path){
        var current_node = path.node

        // console.log(current_node.type)
        // console.log(current_node.callee.name)
        // console.log(current_node.arguments)

        if (types.isCallExpression(current_node)){
            console.log(2323232323)
            // var res = types.CallExpression(current_node.arguments[0], current_node.arguments.slice(1))
            var res = types.CallExpression(current_node, current_node.arguments)

            console.log(generator(res).code)
        }

        if (current_node.callee.name === "test" && current_node.arguments.length === 2){
            console.log()

            // path.replaceWith(ast, types.CallExpression(current_node))
        }

    }
})

var { code } = generator(ast)*/
// console.log(code)


const source_code = "function test(){\n" +
    "\tvar dict = {\n" +
    "    \tabc: 123,\n" +
    "      \tdef: 456\n" +
    "    }\n" +
    "    \n" +
    "    var aa = function (){\n" +
    "    \tvar bbb = dict['def']\n" +
    "        \n" +
    "        var my_dict = {\n" +
    "            abc: 123,\n" +
    "            def: 456\n" +
    "        }\n" +
    "        \n" +
    "        var cc = function(){\n" +
    "        \tvar bb = my_dict['def']\n" +
    "            console.log(bb)\n" +
    "\n" +
    "        }\n" +
    "        \n" +
    "    }\n" +
    "\n" +
    "}"


var ast = parser.parse(source_code)



const operation_one = function(path){
    var current_node = path.node

    if (current_node.id.name === "my_dict" && current_node.init.properties.length > 0){
        var obj_name = current_node.id.name
        var propertiesList = current_node.init.properties

        for (one of propertiesList){

            if (one.type === "ObjectProperty"){

                var obj_key = one.key.name
                var obj_value = one.value.value
                console.log(obj_key, obj_value)

                var parent_node = path.getFunctionParent()
                // console.log(parent_node)

                parent_node.traverse({
                    MemberExpression(son_path){
                        var son_node = son_path.node
                        if (son_node.object.name === obj_name
                            && son_node.property.type === "StringLiteral"
                            && son_node.property.value === obj_key){

                            console.log("12333333333")
                            console.log(obj_name, obj_key, obj_value)
                            son_path.replaceWith(types.numericLiteral(obj_value))

                        }
                    }
                })


            }

        }

        //删除这个节点
        path.remove()

    }



}


traverse(ast, {
    VariableDeclarator: operation_one
})

console.log(generator(ast).code)