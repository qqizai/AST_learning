const fs = require("fs");
const escope = require('escope');
const esprima = require('esprima');
const iconv = require('iconv-lite');
const escodegen = require('escodegen');
const estraverse = require('estraverse');

var encode_version = 'sojson.v5',
    xdfes = '',
    _0x5c82 = ['TcOKegTCicKaPQlr', '5Ymn6Zmx54qW5p2C5Yy077yRBhfkv6/lrafmnJPlvb/nq6I=', 'wozCncKGF8KJ', 'wpbCjzTCmSo=',
        'ZEPClcKmdA==', 'wrfDtAXCqcOZ', 'YhrDt8OESQ==', 'S3fDpcOTwp8=', 'SxDDucOufg==', 'w4EEasOIZA==', 'OmPDvV/Cthk=',
        '56mj6Zae5o2Q6aiF57mKcA1aw40D4oKww6Zu5Yur5a+64oCrP+WSokfigaYuwpTop5nlrKjigbLCksKTSu++suS+puWMsuS+iuebksK6wpHDjuOCkg==',
        'woTCjcOONMKUw6Ml', 'wqrCm8Ke'];
(function (_0x440d7e, _0xc2f8a0) {
    var _0x4310cd = function (_0x396142) {
        while (--_0x396142) {
            _0x440d7e['push'](_0x440d7e['shift']());
        }
    };
    _0x4310cd(++_0xc2f8a0);
}(_0x5c82, 0x1f3));
var _0x19b2 = function (_0x44fe81, _0x3b43b5) {
    _0x44fe81 = _0x44fe81 - 0x0;
    var _0x368cbf = _0x5c82[_0x44fe81];
    if (_0x19b2['initialized'] === undefined) {
        (function () {
            var _0x1903a1 = typeof window !== 'undefined' ? window : typeof process === 'object' && typeof require ===
            'function' && typeof global === 'object' ? global : this;
            var _0x38352b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0x1903a1['atob'] || (_0x1903a1['atob'] = function (_0x41d26d) {
                var _0x596d04 = String(_0x41d26d)['replace'](/=+$/, '');
                for (var _0xb98ee1 = 0x0, _0xf8d3de, _0x522faa, _0x355ad4 = 0x0, _0x5aa1cf = ''; _0x522faa =
                    _0x596d04['charAt'](_0x355ad4++); ~_0x522faa && (_0xf8d3de = _0xb98ee1 % 0x4 ?
                    _0xf8d3de * 0x40 + _0x522faa : _0x522faa, _0xb98ee1++ % 0x4) ? _0x5aa1cf +=
                    String['fromCharCode'](0xff & _0xf8d3de >> (-0x2 * _0xb98ee1 & 0x6)) : 0x0) {
                    _0x522faa = _0x38352b['indexOf'](_0x522faa);
                }
                return _0x5aa1cf;
            });
        }());
        var _0x2357e5 = function (_0x52a6e7, _0x2fad1f) {
            var _0x53fe41 = [],
                _0x4ecd73 = 0x0,
                _0x39d043, _0x1bc680 = '',
                _0x33c56e = '';
            _0x52a6e7 = atob(_0x52a6e7);
            for (var _0x285b9e = 0x0, _0x11459c = _0x52a6e7['length']; _0x285b9e < _0x11459c; _0x285b9e++) {
                _0x33c56e += '%' + ('00' + _0x52a6e7['charCodeAt'](_0x285b9e)['toString'](0x10))['slice'](-0x2);
            }
            _0x52a6e7 = decodeURIComponent(_0x33c56e);
            for (var _0x1f667b = 0x0; _0x1f667b < 0x100; _0x1f667b++) {
                _0x53fe41[_0x1f667b] = _0x1f667b;
            }
            for (_0x1f667b = 0x0; _0x1f667b < 0x100; _0x1f667b++) {
                _0x4ecd73 = (_0x4ecd73 + _0x53fe41[_0x1f667b] + _0x2fad1f['charCodeAt'](_0x1f667b % _0x2fad1f[
                    'length'])) % 0x100;
                _0x39d043 = _0x53fe41[_0x1f667b];
                _0x53fe41[_0x1f667b] = _0x53fe41[_0x4ecd73];
                _0x53fe41[_0x4ecd73] = _0x39d043;
            }
            _0x1f667b = 0x0;
            _0x4ecd73 = 0x0;
            for (var _0x5b3c55 = 0x0; _0x5b3c55 < _0x52a6e7['length']; _0x5b3c55++) {
                _0x1f667b = (_0x1f667b + 0x1) % 0x100;
                _0x4ecd73 = (_0x4ecd73 + _0x53fe41[_0x1f667b]) % 0x100;
                _0x39d043 = _0x53fe41[_0x1f667b];
                _0x53fe41[_0x1f667b] = _0x53fe41[_0x4ecd73];
                _0x53fe41[_0x4ecd73] = _0x39d043;
                _0x1bc680 += String['fromCharCode'](_0x52a6e7['charCodeAt'](_0x5b3c55) ^ _0x53fe41[(_0x53fe41[
                    _0x1f667b] + _0x53fe41[_0x4ecd73]) % 0x100]);
            }
            return _0x1bc680;
        };
        _0x19b2['rc4'] = _0x2357e5;
        _0x19b2['data'] = {};
        _0x19b2['initialized'] = !![];
    }
    var _0x5b29b2 = _0x19b2['data'][_0x44fe81];
    if (_0x5b29b2 === undefined) {
        if (_0x19b2['once'] === undefined) {
            _0x19b2['once'] = !![];
        }
        _0x368cbf = _0x19b2['rc4'](_0x368cbf, _0x3b43b5);
        _0x19b2['data'][_0x44fe81] = _0x368cbf;
    } else {
        _0x368cbf = _0x5b29b2;
    }
    return _0x368cbf;
};

function Fix(ast) {
    ast = estraverse.replace(ast,{
        enter: function (node, parent) {
            if (node.type === "CallExpression" &&
                node.callee.name === "_0x19b2" &&
                node.arguments.length === 2
            ){
                return{
                    type: esprima.Syntax.Literal,
                    value: _0x19b2(node.arguments[0].value,node.arguments[1].value)
                }
            }
        }
    });
    ast = estraverse.replace(ast,{
        enter: function (node, parent) {
            // 查找目标节点
            if (node.type === "VariableDeclaration" &&
                node.declarations.length === 1 &&
                node.declarations[0].init.type === "ObjectExpression" &&
                node.declarations[0].init.properties.length >= 1
            ){
                // 将节点赋值
                _nodelist = node.declarations[0].init.properties;
                // 删除赋值后的节点
                parent.body.splice(parent.body.indexOf(node),1)
            }
            // 替换（值为Literal）
            if (
                node.type === "MemberExpression" &&
                node.property.type === "Literal"
            ) {
                for (var idx = 0; idx < _nodelist.length; idx++){
                    if (node.property.value === _nodelist[idx].key.value) {
                        if (_nodelist[idx].value.type === "Literal") {
                            return {
                                type: esprima.Syntax[_nodelist[idx].value.type],
                                value: _nodelist[idx].value.value,
                            }
                        }
                    }
                    }
                }
            // 替换（值为FunctionExpression）
            if (node.type === "CallExpression" &&
                node.callee.type === "MemberExpression" &&
                node.callee.property.type === "Literal"
            ){
                for (var idx = 0; idx < _nodelist.length; idx++){
                    if (node.callee.property.value === _nodelist[idx].key.value) {
                        if (_nodelist[idx].value.type === "FunctionExpression") {
                            return {
                                type: esprima.Syntax.BinaryExpression,
                                operator: _nodelist[idx].value.body.body[0].argument.operator,
                                left: node.arguments[0],
                                right: node.arguments[1],
                            }
                        }
                    }
                }
            }
        }
    });

    return ast
}

module.exports = {
    Fix
}