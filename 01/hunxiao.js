/*

* 加密工具已经升级了一个版本，目前为 sojson.v5 ，主要加强了算法，以及防破解【绝对不可逆】配置，耶稣也无法100%还原，我说的。;

* 已经打算把这个工具基础功能一直免费下去。还希望支持我。

* 另外 sojson.v5 已经强制加入校验，注释可以去掉，但是 sojson.v5 不能去掉（如果你开通了VIP，可以手动去掉），其他都没有任何绑定。

* 誓死不会加入任何后门，sojson JS 加密的使命就是为了保护你们的Javascript 。

* 警告：如果您恶意去掉 sojson.v5 那么我们将不会保护您的JavaScript代码。请遵守规则

* 新版本: https://www.jsjiami.com/ 支持批量加密，支持大文件加密，拥有更多加密。
*/


// ;
// var encode_version = 'sojson.v5',
//     xdfes = '',
//     _0x5c82 = ['TcOKegTCicKaPQlr', '5Ymn6Zmx54qW5p2C5Yy077yRBhfkv6/lrafmnJPlvb/nq6I=', 'wozCncKGF8KJ', 'wpbCjzTCmSo=',
//         'ZEPClcKmdA==', 'wrfDtAXCqcOZ', 'YhrDt8OESQ==', 'S3fDpcOTwp8=', 'SxDDucOufg==', 'w4EEasOIZA==', 'OmPDvV/Cthk=',
//         '56mj6Zae5o2Q6aiF57mKcA1aw40D4oKww6Zu5Yur5a+64oCrP+WSokfigaYuwpTop5nlrKjigbLCksKTSu++suS+puWMsuS+iuebksK6wpHDjuOCkg==',
//         'woTCjcOONMKUw6Ml', 'wqrCm8Ke'];
// (function (_0x440d7e, _0xc2f8a0) {
//     var _0x4310cd = function (_0x396142) {
//         while (--_0x396142) {
//             _0x440d7e['push'](_0x440d7e['shift']());
//         }
//     };
//     _0x4310cd(++_0xc2f8a0);
// }(_0x5c82, 0x1f3));
// var _0x19b2 = function (_0x44fe81, _0x3b43b5) {
//     _0x44fe81 = _0x44fe81 - 0x0;
//     var _0x368cbf = _0x5c82[_0x44fe81];
//     if (_0x19b2['initialized'] === undefined) {
//         (function () {
//             var _0x1903a1 = typeof window !== 'undefined' ? window : typeof process === 'object' && typeof require ===
//             'function' && typeof global === 'object' ? global : this;
//             var _0x38352b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
//             _0x1903a1['atob'] || (_0x1903a1['atob'] = function (_0x41d26d) {
//                 var _0x596d04 = String(_0x41d26d)['replace'](/=+$/, '');
//                 for (var _0xb98ee1 = 0x0, _0xf8d3de, _0x522faa, _0x355ad4 = 0x0, _0x5aa1cf = ''; _0x522faa =
//                     _0x596d04['charAt'](_0x355ad4++); ~_0x522faa && (_0xf8d3de = _0xb98ee1 % 0x4 ?
//                     _0xf8d3de * 0x40 + _0x522faa : _0x522faa, _0xb98ee1++ % 0x4) ? _0x5aa1cf +=
//                     String['fromCharCode'](0xff & _0xf8d3de >> (-0x2 * _0xb98ee1 & 0x6)) : 0x0) {
//                     _0x522faa = _0x38352b['indexOf'](_0x522faa);
//                 }
//                 return _0x5aa1cf;
//             });
//         }());
//         var _0x2357e5 = function (_0x52a6e7, _0x2fad1f) {
//             var _0x53fe41 = [],
//                 _0x4ecd73 = 0x0,
//                 _0x39d043, _0x1bc680 = '',
//                 _0x33c56e = '';
//             _0x52a6e7 = atob(_0x52a6e7);
//             for (var _0x285b9e = 0x0, _0x11459c = _0x52a6e7['length']; _0x285b9e < _0x11459c; _0x285b9e++) {
//                 _0x33c56e += '%' + ('00' + _0x52a6e7['charCodeAt'](_0x285b9e)['toString'](0x10))['slice'](-0x2);
//             }
//             _0x52a6e7 = decodeURIComponent(_0x33c56e);
//             for (var _0x1f667b = 0x0; _0x1f667b < 0x100; _0x1f667b++) {
//                 _0x53fe41[_0x1f667b] = _0x1f667b;
//             }
//             for (_0x1f667b = 0x0; _0x1f667b < 0x100; _0x1f667b++) {
//                 _0x4ecd73 = (_0x4ecd73 + _0x53fe41[_0x1f667b] + _0x2fad1f['charCodeAt'](_0x1f667b % _0x2fad1f[
//                     'length'])) % 0x100;
//                 _0x39d043 = _0x53fe41[_0x1f667b];
//                 _0x53fe41[_0x1f667b] = _0x53fe41[_0x4ecd73];
//                 _0x53fe41[_0x4ecd73] = _0x39d043;
//             }
//             _0x1f667b = 0x0;
//             _0x4ecd73 = 0x0;
//             for (var _0x5b3c55 = 0x0; _0x5b3c55 < _0x52a6e7['length']; _0x5b3c55++) {
//                 _0x1f667b = (_0x1f667b + 0x1) % 0x100;
//                 _0x4ecd73 = (_0x4ecd73 + _0x53fe41[_0x1f667b]) % 0x100;
//                 _0x39d043 = _0x53fe41[_0x1f667b];
//                 _0x53fe41[_0x1f667b] = _0x53fe41[_0x4ecd73];
//                 _0x53fe41[_0x4ecd73] = _0x39d043;
//                 _0x1bc680 += String['fromCharCode'](_0x52a6e7['charCodeAt'](_0x5b3c55) ^ _0x53fe41[(_0x53fe41[
//                     _0x1f667b] + _0x53fe41[_0x4ecd73]) % 0x100]);
//             }
//             return _0x1bc680;
//         };
//         _0x19b2['rc4'] = _0x2357e5;
//         _0x19b2['data'] = {};
//         _0x19b2['initialized'] = !![];
//     }
//     var _0x5b29b2 = _0x19b2['data'][_0x44fe81];
//     if (_0x5b29b2 === undefined) {
//         if (_0x19b2['once'] === undefined) {
//             _0x19b2['once'] = !![];
//         }
//         _0x368cbf = _0x19b2['rc4'](_0x368cbf, _0x3b43b5);
//         _0x19b2['data'][_0x44fe81] = _0x368cbf;
//     } else {
//         _0x368cbf = _0x5b29b2;
//     }
//     return _0x368cbf;
// };


var a = {},
    b = {};
(function (_0x382e1a, _0x5042fa) {
    var _0x477fd6 = {
        'iuyHT': '这是一个一系列js操作。'
    };
    _0x382e1a['info'] = _0x477fd6[_0x19b2('0x0', ']hA7')];
    _0x5042fa[_0x19b2('0x1', '#OS(')] = _0x19b2('0x2', 'D*Vx');
    _0x5042fa[_0x19b2('0x3', 'NgoE')] = '如果您的JS里嵌套了PHP，JSP标签，等等其他非JavaScript的代码，请提取出来再加密。这个工具不能加密php、jsp等模版内容';
}(a, b));;
(function (_0x5ae480, _0x488138, _0x48e246) {
    var _0x377c2a = {
        'HvlfW': _0x19b2('0x4', 'K#8F'),
        'FMlxQ': 'ert',
        'hGAfq': function _0x44b0aa(_0x594a9b, _0x2e131a) {
            return _0x594a9b !== _0x2e131a;
        },
        'JiURl': _0x19b2('0x5', '@XmJ'),
        'dXSux': function _0x10a1df(_0x4abdd2, _0x37e16a) {
            return _0x4abdd2 === _0x37e16a;
        },
        'KCOFa': 'sojson.v5',
        'UGPZv': '版本号，js会定期弹窗，还请支持我们的工作',
        'bIAlV': _0x19b2('0x6', 'jVw4')
    };
    _0x48e246 = 'al';
    try {
        if (_0x377c2a['HvlfW'] === _0x377c2a['HvlfW']) {
            _0x48e246 += _0x377c2a[_0x19b2('0x7', 'YKZM')];
            _0x488138 = encode_version;
            if (!(_0x377c2a[_0x19b2('0x8', 'jPr(')](typeof _0x488138, _0x377c2a[_0x19b2('0x9', '%F)F')]) &&
                _0x377c2a[_0x19b2('0xa', 'd6AG')](_0x488138, _0x377c2a[_0x19b2('0xb', 'r[Rm')]))) {
                _0x5ae480[_0x48e246]('删除' + _0x377c2a['UGPZv']);
            }
        } else {
            _0x5ae480[_0x48e246]('删除' + _0x377c2a[_0x19b2('0xc', '5ffR')]);
        }
    } catch (_0x2644b3) {
        _0x5ae480[_0x48e246](_0x377c2a[_0x19b2('0xd', 'r[Rm')]);
    }
}(window));;
encode_version = 'sojson.v5';