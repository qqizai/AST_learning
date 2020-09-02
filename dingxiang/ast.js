const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");
const file_in=__dirname+'\\input.js';
const file_out=__dirname+'\\output.js';
var fs =require("fs");
let js = String(fs.readFileSync(file_in,{encodeing:'utf-8'}));
let ast = parser.parse(js);

function writeFile(code) {
    console.log("Write start\\n");
    fs.writeFile(file_out, code, function (err) {
        if (err) {
            return console.error(err);
        }
    });
    console.log("Write finish\\n");
}
visitor1={
    "Program"(path){
        var body =path.get('body.0');
        var node =body.node;
        var args=node.expression.argument;
        if(args==undefined)return;
        var params=args.callee.params;
        var paramsvalue=args.arguments;
        var name,valuelist;
        for(var i=0;i<params.length;i++){
            name=params[i].name;
            valuelist=paramsvalue[i].elements;
            body.traverse({
                MemberExpression(_path){
                    var _node=_path.node;
                    var _name=_node.object.name;
                    if(!types.isNumericLiteral(_node.property))return;
                    var _value=_node.property.value;
                    if(name==_name){
                        if(valuelist[_value]==undefined)return;
                        if(valuelist[_value].value==undefined)return;
                        rvalue=valuelist[_value].value;
                        switch(typeof rvalue){
                            case "string":
                                _path.replaceWith(types.StringLiteral(rvalue));
                                break;
                            case "number":
                                _path.replaceWith(types.NumericLiteral(rvalue));
                                break;
                        }
                    }
                }
            });
        

        }
        
    }
}

const visitor2={
    VariableDeclarator(path)
        {
        const {id,init}=path.node;
        if(!types.isLiteral(init))return;
        const binding=path.scope.getBinding(id.name);
        if(binding.constantViolations.length===0)
            {
                for(const refer_path of binding.referencePaths)
                    {
                    refer_path.replaceInline(init);
                    }
                //path.remove();
            }
        }
}

replaceliteral=function(path,value){
    switch(typeof value){
        case 'boolean':
            path.replaceWith(types.booleanLiteral(value));
            break;
        case 'number':
            path.replaceWith(types.NumericLiteral(value));
            break;
        case 'string':
            path.replaceWith(types.stringLiteral(value));
            break;
        default:
            break;
    }
}
const visitor3={
    "UnaryExpression|BinaryExpression|CallExpression|ConditionalExpression":{
        enter:function(path){
            const{value}=path.evaluate();
            replaceliteral(path,value);
        }

    }
}
const visitor4={
    "FunctionDeclaration"(path){
        let {id}=path.node;
        let code=path.toString();
        if(code.indexOf("try")!=-1 ||code.indexOf("random")!=-1||code.indexOf("Date")!=-1){
            return;
        }
        eval(code);
        let scope =path.scope;
        const binding = path.scope.parent.getBinding(id.name);
        let isdel=false;
        if(!binding || binding.constantViolations.length>0){
            return;
        }
        for(const refer_path of binding.referencePaths)
        {
            
            let call_express=refer_path.findParent(p=>p.isCallExpression());
            let arguments=call_express.get('arguments');
            let args=[];
            arguments.forEach(arg=>{args.push(arg.isLiteral())});
            if(args.length ===0 || args.indexOf("false")!=-1){
                continue;
            }
            try{
                let value= eval(call_express.toString());
                if(value==undefined)return;
                switch(typeof value){
                    case "string":
                        call_express.replaceWith(types.StringLiteral(value));
                        isdel=true;
                        break;
                    case "number":
                        call_express.replaceWith(types.NumericLiteral(value));
                        isdel=true;
                        break;
                }
                
            }catch(e){

            }
        }
        if(isdel){
            //path.remove();
        }
    
    }
}
const visitor5={
    "StringLiteral|NumericLiteral"(path){
        delete path.node.extra;
    }
}
const visitor6={
    "CallExpression"(path){
        var node =path.node;
        var code=path.toString();
        var value;
        if(!node.arguments.length>0)return;
        if(!types.isLiteral(node.arguments[0]))return;
        if(code.indexOf("Time")!=-1)return;
        try{
            value=eval("value="+code);
            
        }catch(e){

        }
        if(value==undefined)return;
        switch(typeof value){
            case "string":
                path.replaceWith(types.StringLiteral(value));
                break;
            case "number":
                path.replaceWith(types.NumericLiteral(value));
                break;
            case "boolean":
                path.replaceWith(types.BooleanLiteral(value));
                break;
        }
        
    }
}
traverse.default(ast,visitor1);
traverse.default(ast,visitor2);
traverse.default(ast,visitor3);
traverse.default(ast,visitor4);
traverse.default(ast,visitor5);
traverse.default(ast,visitor6);
writeFile(generator.default(ast,opts = {jsescOption:{"minimal":true}}).code);
