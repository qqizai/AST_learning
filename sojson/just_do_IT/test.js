const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const types = require("@babel/types")


/********************************************************************
 处理FunctionDeclaration
 思路:对于实参全部是字面量的函数调用，且运行结果唯一时，可以进行替换
 before:
 function add(a,b)
 {
 return a+b;
}

 s = add(1,2) + add(111,222);

 after:

 function add(a, b) {
  return a + b;
}

 s = 3 + 333;
 ********************************************************************/

const visitor = {
    FunctionDeclaration(path) {
        let {
            id
        } = path.node;
        const binding = path.scope.parent.getBinding(id.name);
        if (!binding || binding.constantViolations.length > 0) {
            return;
        }
        let refer_paths = binding.referencePaths;
        if (refer_paths == 0) {
            path.remove();
            return;
        }

        let params = path.get('params').toString();
        let code = path.get('body').toString();
        if (code.indexOf("try") != -1 || code.indexOf('random') != -1 || code.indexOf('Date') != -1) { //返回值不唯一不做处理
            return;
        }
        var call_fun = new Function(params, code);
        for (const refer_path of binding.referencePaths) {
            let call_express = refer_path.findParent(p => p.isCallExpression());
            if (!call_express) continue;
            let args = call_express.get('arguments');
            if (args.length == 0 || !args.every(el => el.isLiteral())) return;

            for (let i in args) {
                args[i] = args[i].node.value;
            }

            try {
                let value = call_fun.apply(null, args);
                value != undefined && call_express.replaceWith(types.valueToNode(value));
            } catch (e) {};
        }
    },
}

let code = " function add(a,b)\n" +
    " {\n" +
    " return a+b;\n" +
    "}\n" +
    "\n" +
    " s = add(1,2) + add(111,222);"

let ast = parser.parse(code)

// traverse(ast, visitor)

console.log(generator(ast).code)

