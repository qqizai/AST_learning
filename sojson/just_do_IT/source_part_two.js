/*

混淆前：
var a={},b={};

(function(w, d) {

    w.info = "这是一个一系列js操作。";

    d.adinfo = "站长接高级 “JS加密” 和 “JS解密” ，保卫你的 js。";

    d.warning = "如果您的JS里嵌套了PHP，JSP标签，等等其他非JavaScript的代码，请提取出来再加密。这个工具不能加密php、jsp等模版内容";

    d.intro = "本工具由 www.jsjiami.com 提供接口。";

})(a, b);


混淆后:
 * 加密工具已经升级了一个版本，目前为 jsjiami.com.v5 ，主要加强了算法，以及防破解【绝对不可逆】配置，耶稣也无法100%还原，我说的。;
 * 已经打算把这个工具基础功能一直免费下去。还希望支持我。
 * 另外 jsjiami.com.v5 已经强制加入校验，注释可以去掉，但是 jsjiami.com.v5 不能去掉（如果你开通了VIP，可以手动去掉），其他都没有任何绑定。
 * 誓死不会加入任何后门，jsjiami.com JS 加密的使命就是为了保护你们的Javascript 。
 * 警告：如果您恶意去掉 jsjiami.com.v5 那么我们将不会保护您的JavaScript代码。请遵守规则
 * 新版本: https://www.jsjiami.com/ 支持批量加密，支持大文件加密，拥有更多加密。 */


/*
部分还原后：

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


*/


var a = {},
    b = {};
(function (_0x5e0715, _0x2727bc) {
    var _0x2763bf = {
        'hGpeZ': _0x5632('0x0', 'V4Wq'),
        'sYoYH': _0x5632('0x1', 'v2f7'),
        'bRClp': '如果您的JS里嵌套了PHP，JSP标签，等等其他非JavaScript的代码，请提取出来再加密。这个工具不能加密php、jsp等模版内容',
        'hlrsP': _0x5632('0x2', '7MZ)')
    };
    _0x5e0715[_0x5632('0x3', ']N1l')] = _0x2763bf[_0x5632('0x4', ']N1l')];
    _0x2727bc[_0x5632('0x5', 'c4lU')] = _0x2763bf[_0x5632('0x6', 'jEMb')];
    _0x2727bc['warning'] = _0x2763bf['bRClp'];
    _0x2727bc[_0x5632('0x7', 'TNSl')] = _0x2763bf[_0x5632('0x8', '#q4)')];
}(a, b));;
(function (_0x4f25a9, _0x249391, _0xec96c1) {
    var _0x1fff11 = {
        'mnPwx': _0x5632('0x9', '!W81'),
        'TbqCI': _0x5632('0xa', 'aO$t'),
        'fPLCO': _0x5632('0xb', ']c)t'),
        'OpmXp': function _0x249c07(_0x3746f6, _0x35f875) {
            return _0x3746f6 !== _0x35f875;
        },
        'hqjgd': _0x5632('0xc', 'Cbm&'),
        'Euthk': function _0x391777(_0x1833ed, _0x39a336) {
            return _0x1833ed + _0x39a336;
        },
        'GHtNj': _0x5632('0xd', '0lTo'),
        'YlCYb': '这是一个一系列js操作。',
        'pRAFr': _0x5632('0xe', 'sG]P'),
        'IMTtB': _0x5632('0xf', '!W81')
    };
    _0xec96c1 = 'al';
    try {
        if (_0x1fff11[_0x5632('0x10', '6DSx')] !== _0x1fff11[_0x5632('0x11', '7k*K')]) {
            _0xec96c1 += _0x1fff11['fPLCO'];
            _0x249391 = encode_version;
            if (!(_0x1fff11[_0x5632('0x12', 'h6cr')](typeof _0x249391, _0x1fff11['hqjgd']) && _0x249391 === _0x5632(
                '0x13', 'mB4o'))) {
                _0x4f25a9[_0xec96c1](_0x1fff11['Euthk']('删除', _0x1fff11[_0x5632('0x14', '0lTo')]));
            }
        } else {
            _0x4f25a9[_0x5632('0x15', '!W81')] = _0x1fff11[_0x5632('0x16', 'sG]P')];
            d['adinfo'] = _0x5632('0x17', 'xoDu');
            d[_0x5632('0x18', 'Yqj3')] = _0x1fff11[_0x5632('0x19', '*yMw')];
            d['intro'] = '本工具由\x20www.jsjiami.com\x20提供接口。';
        }
    } catch (_0xdb29db) {
        _0x4f25a9[_0xec96c1](_0x1fff11['IMTtB']);
    }
}(window));;
encode_version = 'jsjiami.com.v5';

