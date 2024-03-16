import { Dimensions, StyleSheet } from 'react-native';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var baseWidth = 750;
var w_pixelScale = deviceWidth / baseWidth;
var h_pixelScale = deviceHeight / 100;
var setBaseWidth = function setBaseWidth(width) {
  baseWidth = width;
  w_pixelScale = deviceWidth / width;
};
var rpx = function rpx(width) {
  if (width === 0) return 0;
  if (Math.abs(width) === 1) return StyleSheet.hairlineWidth * (width > 0 ? 1 : -1);
  var actualWidth = w_pixelScale * width;
  if (Math.abs(actualWidth) < 0) return width > 0 ? 1 : -1;
  return Math.floor(actualWidth);
};
var vh = function vh(height) {
  return Math.floor(h_pixelScale * height);
};

var isNumber = function isNumber(arg) {
  return /^(-|\+)?\d+(\.\d+)?$/.test(arg);
};
var isObject = function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
var isArray = function isArray(obj) {
  return Array.isArray(obj);
};

var unitFmtMap = {
  rpx: rpx,
  vh: vh
};
var getUnit = function getUnit(styleValue) {
  return Object.keys(unitFmtMap).find(function (key) {
    return styleValue.endsWith(key) && isNumber(styleValue.replace(key, ''));
  });
};
var unit2Num = function unit2Num(str, styleUnit) {
  if (styleUnit === void 0) {
    styleUnit = null;
  }
  if (isNumber(str)) {
    return Number.parseFloat(str);
  }
  if (styleUnit) {
    return unitFmtMap[styleUnit](Number.parseFloat(str));
  }
  if (typeof str === 'string') {
    var unit = getUnit(str);
    if (unit) {
      return unitFmtMap[unit](Number.parseFloat(str));
    }
    throw Error("\u6837\u5F0F\u5355\u4F4D\u683C\u5F0F\u9519\u8BEF\uFF1Arpx ----> " + str);
  } else {
    throw Error("\u6837\u5F0F\u5355\u4F4D\u683C\u5F0F\u9519\u8BEF\uFF1Arpx ----> " + str);
  }
};
var value2Arr = function value2Arr(str) {
  return str.replace(/[ ]+/g, ' ').split(' ');
};
var rpx2px = function rpx2px(styleKey, styleValue) {
  if (typeof styleValue === 'string') {
    var unit = getUnit(styleValue);
    if (unit) {
      var _ref;
      return _ref = {}, _ref[styleKey] = unit2Num(styleValue, unit), _ref;
    }
  }
  return false;
};
var parseMargin = function parseMargin(styleKey, styleValue) {
  if (styleKey === 'margin' && typeof styleValue === 'string') {
    var values = value2Arr(styleValue);
    if (values.length === 1) {
      return {
        margin: unit2Num(values[0])
      };
    } else if (values.length === 2) {
      return {
        marginVertical: unit2Num(values[0]),
        marginHorizontal: unit2Num(values[1])
      };
    } else if (values.length === 3) {
      return {
        marginTop: unit2Num(values[0]),
        marginHorizontal: unit2Num(values[1]),
        marginBottom: unit2Num(values[2])
      };
    } else if (values.length === 4) {
      return {
        marginTop: unit2Num(values[0]),
        marginRight: unit2Num(values[1]),
        marginBottom: unit2Num(values[2]),
        marginLeft: unit2Num(values[3])
      };
    } else {
      throw Error('margin 样式格式错误：' + styleValue);
    }
  }
  return false;
};
var parsePadding = function parsePadding(styleKey, styleValue) {
  if (styleKey === 'padding' && typeof styleValue === 'string') {
    var values = value2Arr(styleValue);
    if (values.length === 1) {
      return {
        padding: unit2Num(values[0])
      };
    } else if (values.length === 2) {
      return {
        paddingVertical: unit2Num(values[0]),
        paddingHorizontal: unit2Num(values[1])
      };
    } else if (values.length === 3) {
      return {
        paddingTop: unit2Num(values[0]),
        paddingHorizontal: unit2Num(values[1]),
        paddingBottom: unit2Num(values[2])
      };
    } else if (values.length === 4) {
      return {
        paddingTop: unit2Num(values[0]),
        paddingRight: unit2Num(values[1]),
        paddingBottom: unit2Num(values[2]),
        paddingLeft: unit2Num(values[3])
      };
    } else {
      throw Error("padding\u6837\u5F0F\u683C\u5F0F\u9519\u8BEF\uFF1A" + styleValue);
    }
  }
  return false;
};
var parseBorderRadius = function parseBorderRadius(styleKey, styleValue) {
  if (styleKey === 'borderRadius' && typeof styleValue === 'string') {
    var values = value2Arr(styleValue);
    if (values.length === 1) {
      return {
        borderRadius: unit2Num(values[0])
      };
    } else if (values.length === 4) {
      return {
        borderTopLeftRadius: unit2Num(values[0]),
        borderTopRightRadius: unit2Num(values[1]),
        borderBottomRightRadius: unit2Num(values[2]),
        borderBottomLeftRadius: unit2Num(values[3])
      };
    } else {
      throw Error("borderRadius\u6837\u5F0F\u683C\u5F0F\u9519\u8BEF\uFF1A" + styleValue);
    }
  }
  return false;
};
var parseBoxShadow = function parseBoxShadow(styleKey, styleValue) {
  if (styleKey === 'boxShadow' && typeof styleValue === 'string') {
    var values = value2Arr(styleValue);
    var shadowObj = {
      shadowOffset: {
        width: unit2Num(values[0]),
        height: unit2Num(values[1])
      },
      shadowRadius: unit2Num(values[2])
    };
    if (values.length === 4) {
      return _extends({}, shadowObj, {
        shadowColor: values[3]
      });
    } else if (values.length === 5) {
      return _extends({}, shadowObj, {
        shadowOpacity: Number.parseFloat(values[3]),
        shadowColor: values[4]
      });
    } else {
      throw Error("boxShadow\u6837\u5F0F\u683C\u5F0F\u9519\u8BEF\uFF1A" + styleValue);
    }
  }
  return false;
};
var parseTextShadow = function parseTextShadow(styleKey, styleValue) {
  if (styleKey === 'textShadow' && typeof styleValue === 'string') {
    var values = value2Arr(styleValue);
    var shadowObj = {
      textShadowOffset: {
        width: unit2Num(values[0]),
        height: unit2Num(values[1])
      },
      textShadowRadius: unit2Num(values[2])
    };
    if (values.length === 4) {
      return _extends({}, shadowObj, {
        textShadowColor: values[3]
      });
    } else if (values.length === 5) {
      return _extends({}, shadowObj, {
        textShadowOpacity: Number.parseFloat(values[3]),
        textShadowColor: values[4]
      });
    } else {
      throw Error("textShadow\u6837\u5F0F\u683C\u5F0F\u9519\u8BEF\uFF1A" + styleValue);
    }
  }
  return false;
};
var parseBorder = function parseBorder(styleKey, styleValue) {
  if (styleKey === 'border' && typeof styleValue === 'string') {
    var values = value2Arr(styleValue);
    if (values.length === 3) {
      return {
        borderWidth: unit2Num(values[0]),
        borderStyle: values[1],
        borderColor: values[2]
      };
    } else {
      throw Error("border \u6837\u5F0F\u683C\u5F0F\u9519\u8BEF\uFF1A" + styleValue);
    }
  }
  return false;
};
var absoluteFill = function absoluteFill(styleKey, styleValue) {
  if (styleKey === 'absoluteFill' && styleValue === true) {
    return StyleSheet.absoluteFillObject;
  }
  return false;
};
var styleTranslateMethods = [parseMargin, parsePadding, parseBorderRadius, parseBoxShadow, parseTextShadow, parseBorder, rpx2px, absoluteFill];

var styleMap = function styleMap(obj) {
  var styleObj = {};
  Object.keys(obj).forEach(function (key) {
    var item = obj[key];
    if (typeof item === 'object') {
      styleObj[key] = styleMap(item);
    } else {
      var styleRes = false;
      styleTranslateMethods.find(function (method) {
        styleRes = method(key, item);
        return !!styleRes;
      });
      if (styleRes) {
        styleObj = _extends({}, styleObj, styleRes);
      } else {
        styleObj[key] = item;
      }
    }
  });
  return styleObj;
};
var create = function create(styles) {
  var styleObj = {};
  if (isObject(styles)) {
    styleObj = styleMap(styles);
  } else if (isArray(styles)) {
    styleObj = styles.map(function (style) {
      return styleMap(style);
    });
  }
  return StyleSheet.create(styleObj);
};

var index = {
  create: create,
  deviceWidth: deviceWidth,
  deviceHeight: deviceHeight,
  setBaseWidth: setBaseWidth,
  rpx: rpx,
  unitFmt: unit2Num
};

export default index;
export { create, deviceHeight, deviceWidth, rpx, setBaseWidth, unit2Num as unitFmt };
//# sourceMappingURL=index.modern.js.map
