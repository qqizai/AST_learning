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







/**
 * 替换后的代码
 * **/



var a = {},
    b = {};

(function (_0x5e0715, _0x2727bc) {
    var _0x2763bf = {
        'hGpeZ': "\u8FD9\u662F\u4E00\u4E2A\u4E00\u7CFB\u5217js\u64CD\u4F5C\u3002",
        'sYoYH': "\u7AD9\u957F\u63A5\u9AD8\u7EA7 \u201CJS\u52A0\u5BC6\u201D \u548C \u201CJS\u89E3\u5BC6\u201D \uFF0C\u4FDD\u536B\u4F60\u7684 js\u3002",
        'bRClp': '如果您的JS里嵌套了PHP，JSP标签，等等其他非JavaScript的代码，请提取出来再加密。这个工具不能加密php、jsp等模版内容',
        'hlrsP': "\u672C\u5DE5\u5177\u7531 www.jsjiami.com \u63D0\u4F9B\u63A5\u53E3\u3002"
    };
    _0x5e0715["info"] = _0x2763bf["hGpeZ"];
    _0x2727bc["adinfo"] = _0x2763bf["sYoYH"];
    _0x2727bc['warning'] = _0x2763bf['bRClp'];
    _0x2727bc["intro"] = _0x2763bf["hlrsP"];
})(a, b);

;

(function (_0x4f25a9, _0x249391, _0xec96c1) {
    var _0x1fff11 = {
        'mnPwx': "fvy",
        'TbqCI': "xZI",
        'fPLCO': "ert",
        'OpmXp': function _0x249c07(_0x3746f6, _0x35f875) {
            return _0x3746f6 !== _0x35f875;
        },
        'hqjgd': "undefined",
        'Euthk': function _0x391777(_0x1833ed, _0x39a336) {
            return _0x1833ed + _0x39a336;
        },
        'GHtNj': "\u7248\u672C\u53F7\uFF0Cjs\u4F1A\u5B9A\u671F\u5F39\u7A97\uFF0C\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C",
        'YlCYb': '这是一个一系列js操作。',
        'pRAFr': "\u5982\u679C\u60A8\u7684JS\u91CC\u5D4C\u5957\u4E86PHP\uFF0CJSP\u6807\u7B7E\uFF0C\u7B49\u7B49\u5176\u4ED6\u975EJavaScript\u7684\u4EE3\u7801\uFF0C\u8BF7\u63D0\u53D6\u51FA\u6765\u518D\u52A0\u5BC6\u3002\u8FD9\u4E2A\u5DE5\u5177\u4E0D\u80FD\u52A0\u5BC6php\u3001jsp\u7B49\u6A21\u7248\u5185\u5BB9",
        'IMTtB': "\u5220\u9664\u7248\u672C\u53F7\uFF0Cjs\u4F1A\u5B9A\u671F\u5F39\u7A97"
    };
    _0xec96c1 = 'al';

    try {
        if (_0x1fff11["mnPwx"] !== _0x1fff11["TbqCI"]) {
            _0xec96c1 += _0x1fff11['fPLCO'];
            _0x249391 = encode_version;

            if (!(_0x1fff11["OpmXp"](typeof _0x249391, _0x1fff11['hqjgd']) && _0x249391 === "jsjiami.com.v5")) {
                _0x4f25a9[_0xec96c1](_0x1fff11['Euthk']('删除', _0x1fff11["GHtNj"]));
            }
        } else {
            _0x4f25a9["info"] = _0x1fff11["YlCYb"];
            d['adinfo'] = "\u7AD9\u957F\u63A5\u9AD8\u7EA7 \u201CJS\u52A0\u5BC6\u201D \u548C \u201CJS\u89E3\u5BC6\u201D \uFF0C\u4FDD\u536B\u4F60\u7684 js\u3002";
            d["warning"] = _0x1fff11["pRAFr"];
            d['intro'] = '本工具由\x20www.jsjiami.com\x20提供接口。';
        }
    } catch (_0xdb29db) {
        _0x4f25a9[_0xec96c1](_0x1fff11['IMTtB']);
    }
})(window);

;
encode_version = 'jsjiami.com.v5';



