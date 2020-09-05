/*
 * 加密工具已经升级了一个版本，目前为 jsjiami.com.v5 ，主要加强了算法，以及防破解【绝对不可逆】配置，耶稣也无法100%还原，我说的。;
 * 已经打算把这个工具基础功能一直免费下去。还希望支持我。
 * 另外 jsjiami.com.v5 已经强制加入校验，注释可以去掉，但是 jsjiami.com.v5 不能去掉（如果你开通了VIP，可以手动去掉），其他都没有任何绑定。
 * 誓死不会加入任何后门，jsjiami.com JS 加密的使命就是为了保护你们的Javascript 。
 * 警告：如果您恶意去掉 jsjiami.com.v5 那么我们将不会保护您的JavaScript代码。请遵守规则
 * 新版本: https://www.jsjiami.com/ 支持批量加密，支持大文件加密，拥有更多加密。 */

;
var encode_version = 'jsjiami.com.v5',
    zmmfw = '',
    _0xda30 = ['wr/DvyQDwoo=', 'ZRXDgSPCjA==', 'w4t4w4HDjMKw', 'w7UGw40Owqc=',
        '5YuC6Zmo54uZ5p6E5Y+o77yhOsK75L2J5a285p6e5b6W56mx', '6LyG5pmf5LqN5LuG5Lu357Kf5Yivw6nDveaTkOS+n+OArw==',
        'wrI1w4DCoMKA', 'LwnChik6w4/Dhg==', 'OzVHUMKo',
        '56iX6ZSq5o2b6aq457ijGuKAugDDi+WIquWvhOKAogblkLFL4oGMFcKg6Kes5a2B4oOJf++/h+S+puWMh+S+heeauiBxwrrjg5E=',
        'w5s4w4UA', 'wqjDuB8Pwr3CuA==', 'wrw3w4/CrDE=', 'w5HCucKyw4fDqg==', 'w43CmcO5wrbDuw==', 'w5JzZw==',
        'wp/Cm8KRC8KgNwgQRA==', 'T33DsMKuTGAJwqXDrMKtw7QRAHs=', 'w4bCoMK5',
        '54mc5p6/5Y+X77yjw7PCpOS8sOWunOacneW9tOeqiu++u+i/ouism+aWr+aNpuaJgOS7sOeYneW0s+S8vQ==',
        '5Ym86Zqj54iR5p2S5Y++776ob8OG5L6v5a+I5py45b6q56iL', 'w5g8w6o=', 'aQd6', 'XU9WEMOs', 'wr7Dqn/DmcKA',
        'w6NBwpDCgxw=', 'ZMOQb2bDjg==', 'VMO/w43DmmU=', 'MCbCuHof', 'JDhhQMKW', 'BFnDm8O/w4c=', 'dsOZw7nDvWA=',
        'YcO9RErDv8K+RGNm'];
(function (_0x242165, _0x53cff2) {
    var _0x4512e6 = function (_0x8adbb3) {
        while (--_0x8adbb3) {
            _0x242165['push'](_0x242165['shift']());
        }
    };
    _0x4512e6(++_0x53cff2);
}(_0xda30, 0x8d));
var _0x380e = function (_0x42fba0, _0x17c9d3) {
    _0x42fba0 = _0x42fba0 - 0x0;
    var _0x497b32 = _0xda30[_0x42fba0];
    if (_0x380e['initialized'] === undefined) {
        (function () {
            var _0xfbb64b = typeof window !== 'undefined' ? window : typeof process === 'object' && typeof require ===
            'function' && typeof global === 'object' ? global : this;
            var _0x477725 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0xfbb64b['atob'] || (_0xfbb64b['atob'] = function (_0x4a98af) {
                var _0x38c21a = String(_0x4a98af)['replace'](/=+$/, '');
                for (var _0x3e1e9 = 0x0, _0x258866, _0x4237bc, _0x44931c = 0x0, _0x322a70 = ''; _0x4237bc =
                    _0x38c21a['charAt'](_0x44931c++); ~_0x4237bc && (_0x258866 = _0x3e1e9 % 0x4 ?
                    _0x258866 * 0x40 + _0x4237bc : _0x4237bc, _0x3e1e9++ % 0x4) ? _0x322a70 +=
                    String['fromCharCode'](0xff & _0x258866 >> (-0x2 * _0x3e1e9 & 0x6)) : 0x0) {
                    _0x4237bc = _0x477725['indexOf'](_0x4237bc);
                }
                return _0x322a70;
            });
        }());
        var _0x53e507 = function (_0x3b0829, _0x2e6272) {
            var _0x5c8539 = [],
                _0x271af9 = 0x0,
                _0x2913a6, _0x186d5a = '',
                _0x41166c = '';
            _0x3b0829 = atob(_0x3b0829);
            for (var _0x1fea33 = 0x0, _0x21d4a5 = _0x3b0829['length']; _0x1fea33 < _0x21d4a5; _0x1fea33++) {
                _0x41166c += '%' + ('00' + _0x3b0829['charCodeAt'](_0x1fea33)['toString'](0x10))['slice'](-0x2);
            }
            _0x3b0829 = decodeURIComponent(_0x41166c);
            for (var _0x1086f8 = 0x0; _0x1086f8 < 0x100; _0x1086f8++) {
                _0x5c8539[_0x1086f8] = _0x1086f8;
            }
            for (_0x1086f8 = 0x0; _0x1086f8 < 0x100; _0x1086f8++) {
                _0x271af9 = (_0x271af9 + _0x5c8539[_0x1086f8] + _0x2e6272['charCodeAt'](_0x1086f8 % _0x2e6272[
                    'length'])) % 0x100;
                _0x2913a6 = _0x5c8539[_0x1086f8];
                _0x5c8539[_0x1086f8] = _0x5c8539[_0x271af9];
                _0x5c8539[_0x271af9] = _0x2913a6;
            }
            _0x1086f8 = 0x0;
            _0x271af9 = 0x0;
            for (var _0x19aad8 = 0x0; _0x19aad8 < _0x3b0829['length']; _0x19aad8++) {
                _0x1086f8 = (_0x1086f8 + 0x1) % 0x100;
                _0x271af9 = (_0x271af9 + _0x5c8539[_0x1086f8]) % 0x100;
                _0x2913a6 = _0x5c8539[_0x1086f8];
                _0x5c8539[_0x1086f8] = _0x5c8539[_0x271af9];
                _0x5c8539[_0x271af9] = _0x2913a6;
                _0x186d5a += String['fromCharCode'](_0x3b0829['charCodeAt'](_0x19aad8) ^ _0x5c8539[(_0x5c8539[
                    _0x1086f8] + _0x5c8539[_0x271af9]) % 0x100]);
            }
            return _0x186d5a;
        };
        _0x380e['rc4'] = _0x53e507;
        _0x380e['data'] = {};
        _0x380e['initialized'] = !![];
    }
    var _0x207dbc = _0x380e['data'][_0x42fba0];
    if (_0x207dbc === undefined) {
        if (_0x380e['once'] === undefined) {
            _0x380e['once'] = !![];
        }
        _0x497b32 = _0x380e['rc4'](_0x497b32, _0x17c9d3);
        _0x380e['data'][_0x42fba0] = _0x497b32;
    } else {
        _0x497b32 = _0x207dbc;
    }
    return _0x497b32;
};
var a = {},
    b = {};
(function (_0x14c8ca, _0x4c3dc3) {
    var _0x1eaaf9 = {
        'iZOQg': '这是一个一系列js操作。',
        'RHNnr': _0x380e('0x0', 'EoGx'),
        'puQpO': '如果您的JS里嵌套了PHP，JSP标签，等等其他非JavaScript的代码，请提取出来再加密。这个工具不能加密php、jsp等模版内容',
        'bKuZn': '本工具由\x20www.jsjiami.com\x20提供接口。'
    };
    _0x14c8ca[_0x380e('0x1', 'rERu')] = _0x1eaaf9['iZOQg'];
    _0x4c3dc3[_0x380e('0x2', 'khz@')] = _0x1eaaf9[_0x380e('0x3', 'IYR!')];
    _0x4c3dc3['warning'] = _0x1eaaf9[_0x380e('0x4', 'MIEL')];
    _0x4c3dc3[_0x380e('0x5', 'J9NH')] = _0x1eaaf9['bKuZn'];
}(a, b));;
(function (_0x351788, _0x21a6af, _0x54d0cd) {
    var _0x4e2ef9 = {
        'QJBAN': 'dut',
        'XkByf': _0x380e('0x6', 'K$2J'),
        'vhMNk': _0x380e('0x7', 'M#BG'),
        'nLAfx': function _0x2d1050(_0x1fa450, _0x3ef278) {
            return _0x1fa450 === _0x3ef278;
        },
        'pCOIW': _0x380e('0x8', '*hd@'),
        'kTXQf': function _0xa6e3e5(_0x5cfeba, _0x224693) {
            return _0x5cfeba !== _0x224693;
        },
        'EXYbM': _0x380e('0x9', 'MIEL'),
        'wNoBG': function _0x4cf259(_0x4ba1b3, _0x58c696) {
            return _0x4ba1b3 + _0x58c696;
        },
        'vcRbQ': _0x380e('0xa', 'Q[gs'),
        'Irlvc': function _0x5ef6b2(_0x23d052, _0x2d6409) {
            return _0x23d052 !== _0x2d6409;
        },
        'Tmzvc': function _0x54b87e(_0x569115, _0x23abdf) {
            return _0x569115 === _0x23abdf;
        },
        'XTxSU': _0x380e('0xb', 'pp7L'),
        'hyKFe': _0x380e('0xc', 'rERu'),
        'mEMLw': '站长接高级\x20“JS加密”\x20和\x20“JS解密”\x20，保卫你的\x20js。',
        'TFpgl': '如果您的JS里嵌套了PHP，JSP标签，等等其他非JavaScript的代码，请提取出来再加密。这个工具不能加密php、jsp等模版内容'
    };
    _0x54d0cd = 'al';
    try {
        if (_0x380e('0xd', 'aw$*') === _0x4e2ef9[_0x380e('0xe', 'v5BY')]) {
            _0x54d0cd += _0x4e2ef9[_0x380e('0xf', 'WkMn')];
            _0x21a6af = encode_version;
            if (!(typeof _0x21a6af !== _0x4e2ef9['vhMNk'] && _0x4e2ef9[_0x380e('0x10', 'Od%F')](_0x21a6af,
                _0x4e2ef9[_0x380e('0x11', 'Q[gs')]))) {
                if (_0x4e2ef9[_0x380e('0x12', '1(i]')](_0x4e2ef9['EXYbM'], 'GLc')) {
                    _0x351788[_0x54d0cd](_0x4e2ef9[_0x380e('0x13', 'eD[Q')]('删除', _0x4e2ef9[_0x380e('0x14', 'ld#$')]));
                } else {
                    _0x351788[_0x54d0cd](_0x4e2ef9['wNoBG']('删除', _0x4e2ef9[_0x380e('0x15', '6mtM')]));
                }
            }
        } else {
            _0x54d0cd = 'al';
            try {
                _0x54d0cd += _0x4e2ef9['XkByf'];
                _0x21a6af = encode_version;
                if (!(_0x4e2ef9[_0x380e('0x16', '1(i]')](typeof _0x21a6af, _0x380e('0x17', 'Q[gs')) && _0x4e2ef9[
                    'Tmzvc'](_0x21a6af, 'jsjiami.com.v5'))) {
                    _0x351788[_0x54d0cd]('删除' + _0x4e2ef9[_0x380e('0x18', 'khz@')]);
                }
            } catch (_0x38eeba) {
                _0x351788[_0x54d0cd](_0x4e2ef9[_0x380e('0x19', 'guBs')]);
            }
        }
    } catch (_0x5f0707) {
        if (_0x4e2ef9[_0x380e('0x1a', '19T$')](_0x4e2ef9['hyKFe'], _0x4e2ef9[_0x380e('0x1b', '#ekj')])) {
            _0x351788[_0x54d0cd](_0x380e('0x1c', 'WF^['));
        } else {
            _0x351788['info'] = _0x380e('0x1d', 'zhEx');
            d['adinfo'] = _0x4e2ef9[_0x380e('0x1e', 'zhEx')];
            d[_0x380e('0x1f', '^a^!')] = _0x4e2ef9['TFpgl'];
            d[_0x380e('0x20', 'ld#$')] = '本工具由\x20www.jsjiami.com\x20提供接口。';
        }
    }
}(window));;
encode_version = 'jsjiami.com.v5';


