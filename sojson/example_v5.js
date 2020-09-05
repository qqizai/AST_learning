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

console.log(_0x172e);

(function (_0x2e7871, _0x1236cc) {
    var _0x147c2b = function (_0x28c10e) {
        while (--_0x28c10e) {
            _0x2e7871['push'](_0x2e7871['shift']());
        }
    };
    _0x147c2b(++_0x1236cc);
}(_0x172e, 0x183));

console.log(_0x172e);



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
                for (var _0x537aa1 = 0x0, _0x3c16a0, _0x5bc28e, _0x47d1d9 = 0x0, _0xf42829 = '';
                     _0x5bc28e = _0x27c73d['charAt'](_0x47d1d9++); ~_0x5bc28e && (_0x3c16a0 = _0x537aa1 % 0x4 ?
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
var a = {},
    b = {};
(function (_0x2fd6e0, _0x470239) {
    var _0x1b7aa9 = {
        'LMSkZ': '这是一个一系列js操作。',
        'vdyss': _0x5887('0x0', 'J3!6'),
        'XHghr': '如果您的JS里嵌套了PHP，JSP标签，等等其他非JavaScript的代码，请提取出来再加密。这个工具不能加密php、jsp等模版内容'
    };
    _0x2fd6e0[_0x5887('0x1', 'V5nF')] = _0x1b7aa9[_0x5887('0x2', '9#7L')];
    _0x470239[_0x5887('0x3', '$P5Z')] = _0x1b7aa9[_0x5887('0x4', 'J3!6')];
    _0x470239[_0x5887('0x5', ']Hml')] = _0x1b7aa9[_0x5887('0x6', 'L7VB')];
}(a, b));;
/*
(function (_0x21ab4f, _0x13d924, _0x51d9de) {
    var _0x4910a4 = {
        'uGJdm': 'ert',
        'oOHfz': function _0x5cb431(_0x2e158e, _0x1db1d8) {
            return _0x2e158e !== _0x1db1d8;
        },
        'GjUes': _0x5887('0x7', '@2jp'),
        'xfMRY': function _0x10c874(_0x4769fd, _0xfe45b5) {
            return _0x4769fd === _0xfe45b5;
        }
    };
    _0x51d9de = 'al';
    try {
        _0x51d9de += _0x4910a4[_0x5887('0x8', 'Uqaq')];
        _0x13d924 = encode_version;
        if (!(_0x4910a4['oOHfz'](typeof _0x13d924, _0x4910a4[_0x5887('0x9', 'U27@')]) && _0x4910a4[_0x5887('0xa',
            'rJUS')](_0x13d924, _0x5887('0xb', '!U@I')))) {
            _0x21ab4f[_0x51d9de]('删除' + _0x5887('0xc', 'QdQV'));
        }
    } catch (_0x11c1c9) {
        _0x21ab4f[_0x51d9de](_0x5887('0xd', 'J3!6'));
    }
}(window));;
encode_version = 'jsjiami.com.v5';*/
