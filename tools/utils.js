


/********************************************************************************************************************
 十六进制解码，之所以会以十六进制显示，完全是 raw 这个节点造成的,那就删除
 *******************************************************************************************************************/
const visitor_hex_decode = {
    'StringLiteral|NumericLiteral'(path) {
        delete path.node.extra;
    }
}


/********************************************************************************************************************
 Unicode解码，还原Unicode字符串

 ps: 发现英文的Unicode形式被还原了，但是中文的没有被还原
     需要给generator(ast,)添加参数{jsescOption:{"minimal":true}}
 *******************************************************************************************************************/
const visitor_unicode_decode = {
    StringLiteral(path) {
        delete path.node.extra;
    }
}


module.exports = {
    "visitor_hex_decode": visitor_hex_decode,
    "visitor_unicode_decode": visitor_unicode_decode,
}

