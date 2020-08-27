const parser = require("@babel/parser");
const template = require("@babel/template").default;
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const path = require('path');
const fs = require('fs')

/*
 * 加密工具已经升级了一个版本，目前为 jsjiami.com.v5 ，主要加强了算法，以及防破解【绝对不可逆】配置，耶稣也无法100%还原，我说的。;
 * 已经打算把这个工具基础功能一直免费下去。还希望支持我。
 * 另外 jsjiami.com.v5 已经强制加入校验，注释可以去掉，但是 jsjiami.com.v5 不能去掉（如果你开通了VIP，可以手动去掉），其他都没有任何绑定。
 * 誓死不会加入任何后门，jsjiami JS 加密的使命就是为了保护你们的Javascript 。
 * 警告：如果您恶意去掉 jsjiami.com.v5 那么我们将不会保护您的JavaScript代码。请遵守规则
 * 新版本: https://www.jsjiami.com/ 支持批量加密，支持大文件加密，拥有更多加密。 */

;
var encode_version = 'jsjiami.com.v5',
    hybfg = '',
    _0x172e = ['wpDDlzYyEGZl', 'fwhrwqrCmg==', 'woLDucOtw6fCqkTDssOzwpQ=', 'wpM8w7PComA=', 'KUEUw4XCig==',
        'LcKOwqjCp8Km', 'w6PCpcKbw4h/w5HDnMOYw6HCnwzDvsOqw7U=',
        '54my5p+Y5Y+g77+VwrrDuOS+juWtkeafueW/meeou++/oei8keiup+aVkOaMj+aIs+S5gueajeW2nOS8hA==',
        '5Yuh6Zi+54uS5p2p5YyC77yJckPkvpXlrqLmn7zlv7rnq5M=',
        '56iY6ZSl5oy/6aqd57mSJeKAhHrDnOWKmOWspeKDnmTlk7la4oKmwoIQ6KeB5a+x4oOXaO+/veS/ruWOsOS+qeeaiTw6YeOCkA==',
        'Q2/Dg8Kc', 'S33DrsORw60=', 'GMO4fMKHwqrCsw==', 'wrc+w6M2woY='];
(function (_0x2e7871, _0x1236cc) {
    var _0x147c2b = function (_0x28c10e) {
        while (--_0x28c10e) {
            _0x2e7871['push'](_0x2e7871['shift']());
        }
    };
    _0x147c2b(++_0x1236cc);
}(_0x172e, 0x183));
var _0x5887 = function (_0x95b7df, _0xf6075) {
    _0x95b7df = _0x95b7df - 0x0;
    var _0x385892 = _0x172e[_0x95b7df];
    if (_0x5887['initialized'] === undefined) {
        (function () {
            var _0x2a5877 = typeof window !== 'undefined' ? window : typeof process === 'object' && typeof require ===
            'function' && typeof global === 'object' ? global : this;
            var _0x2f371b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0x2a5877['atob'] || (_0x2a5877['atob'] = function (_0x3cf0d9) {
                var _0x27c73d = String(_0x3cf0d9)['replace'](/=+$/, '');
                for (var _0x537aa1 = 0x0, _0x3c16a0, _0x5bc28e, _0x47d1d9 = 0x0, _0xf42829 = ''; _0x5bc28e =
                    _0x27c73d['charAt'](_0x47d1d9++); ~_0x5bc28e && (_0x3c16a0 = _0x537aa1 % 0x4 ?
                    _0x3c16a0 * 0x40 + _0x5bc28e : _0x5bc28e, _0x537aa1++ % 0x4) ? _0xf42829 +=
                    String['fromCharCode'](0xff & _0x3c16a0 >> (-0x2 * _0x537aa1 & 0x6)) : 0x0) {
                    _0x5bc28e = _0x2f371b['indexOf'](_0x5bc28e);
                }
                return _0xf42829;
            });
        }());
        var _0x13fe36 = function (_0x28f4e9, _0x23c33d) {
            var _0x5bd3bf = [],
                _0x402d06 = 0x0,
                _0x141eac, _0x5f1af9 = '',
                _0x2fb182 = '';
            _0x28f4e9 = atob(_0x28f4e9);
            for (var _0x4a8333 = 0x0, _0x4db9d1 = _0x28f4e9['length']; _0x4a8333 < _0x4db9d1; _0x4a8333++) {
                _0x2fb182 += '%' + ('00' + _0x28f4e9['charCodeAt'](_0x4a8333)['toString'](0x10))['slice'](-0x2);
            }
            _0x28f4e9 = decodeURIComponent(_0x2fb182);
            for (var _0x3d58cc = 0x0; _0x3d58cc < 0x100; _0x3d58cc++) {
                _0x5bd3bf[_0x3d58cc] = _0x3d58cc;
            }
            for (_0x3d58cc = 0x0; _0x3d58cc < 0x100; _0x3d58cc++) {
                _0x402d06 = (_0x402d06 + _0x5bd3bf[_0x3d58cc] + _0x23c33d['charCodeAt'](_0x3d58cc % _0x23c33d[
                    'length'])) % 0x100;
                _0x141eac = _0x5bd3bf[_0x3d58cc];
                _0x5bd3bf[_0x3d58cc] = _0x5bd3bf[_0x402d06];
                _0x5bd3bf[_0x402d06] = _0x141eac;
            }
            _0x3d58cc = 0x0;
            _0x402d06 = 0x0;
            for (var _0x2e093b = 0x0; _0x2e093b < _0x28f4e9['length']; _0x2e093b++) {
                _0x3d58cc = (_0x3d58cc + 0x1) % 0x100;
                _0x402d06 = (_0x402d06 + _0x5bd3bf[_0x3d58cc]) % 0x100;
                _0x141eac = _0x5bd3bf[_0x3d58cc];
                _0x5bd3bf[_0x3d58cc] = _0x5bd3bf[_0x402d06];
                _0x5bd3bf[_0x402d06] = _0x141eac;
                _0x5f1af9 += String['fromCharCode'](_0x28f4e9['charCodeAt'](_0x2e093b) ^ _0x5bd3bf[(_0x5bd3bf[
                    _0x3d58cc] + _0x5bd3bf[_0x402d06]) % 0x100]);
            }
            return _0x5f1af9;
        };
        _0x5887['rc4'] = _0x13fe36;
        _0x5887['data'] = {};
        _0x5887['initialized'] = !![];
    }
    var _0xd9dece = _0x5887['data'][_0x95b7df];
    if (_0xd9dece === undefined) {
        if (_0x5887['once'] === undefined) {
            _0x5887['once'] = !![];
        }
        _0x385892 = _0x5887['rc4'](_0x385892, _0xf6075);
        _0x5887['data'][_0x95b7df] = _0x385892;
    } else {
        _0x385892 = _0xd9dece;
    }
    return _0x385892;
};

var jsStr = _0x5887;

/**
 * 下面是解密环节
 * */
// 使用parse将js转为ast语法树
const ast = parser.parse(jsStr.toString());

// 使用traverse遍历语法树，因为方法的调用为CallExpression类型，所以我们只对type为CallExpression的节点进行处理。
// 类型的查看方式看代码后面的图。
traverse(ast,{
    CallExpression:funToStr
})

function funToStr(path) {
    var curNode = path.node;

    if(curNode.callee.name === decryptStrFnName && curNode.arguments.length === 2)
    {
        var strC = decryptStr(curNode.arguments[0].value, curNode.arguments[1].value);

        //将匹配到的位置 的 方法调用 使用replaceWith方法 替换为字符串。
        path.replaceWith(t.stringLiteral(strC))

    }
}

