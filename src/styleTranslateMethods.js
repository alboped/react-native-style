/**
 * 样式属性转换函数
 */

import { StyleSheet } from 'react-native';

import { rpx, vh } from './screenUtil';
import * as utils from './utils';

/* 自定义单位对应转换方法 */
const unitFmtMap = { rpx, vh };

/**
 * 获取样式单位
 * @param {String} styleValue 样式值
 */
const getUnit = styleValue => {
  return Object.keys(unitFmtMap).find(key => {
    return styleValue.endsWith(key) && utils.isNumber(styleValue.replace(key, ''));
  });
};

/**
 * 样式值字符串转为数字
 * @param {String} str 样式值
 * @param {*} styleUnit 单位key
 * @return {Number} 转换后的数值
 */
export const unit2Num = (str, styleUnit = null) => {
  // 纯数字直接返回数字
  if (utils.isNumber(str)) {
    return Number.parseFloat(str);
  }

  if (styleUnit) {
    return unitFmtMap[styleUnit](Number.parseFloat(str));
  }

  if (typeof str === 'string') {
    const unit = getUnit(str);
    if (unit) {
      return unitFmtMap[unit](Number.parseFloat(str));
    }
    throw Error(`样式单位格式错误：rpx ----> ${str}`);
  } else {
    throw Error(`样式单位格式错误：rpx ----> ${str}`);
  }
};

/* 简写数值转换为数组 */
const value2Arr = str => str.replace(/[ ]+/g, ' ').split(' ');

/**
 * 像素单位转换
 * @param  {String} styleKey   样式属性key
 * @param  {any} styleValue   样式属性值
 * @return {Object}
 */
const rpx2px = (styleKey, styleValue) => {
  if (typeof styleValue === 'string') {
    const unit = getUnit(styleValue);

    if (unit) {
      return {
        [styleKey]: unit2Num(styleValue, unit),
      };
    }
  }

  return false;
};

/**
 * mergin样式转换
 * @param  {String} styleKey   样式属性key
 * @param  {any} styleValue   样式属性值
 * @return {Object}
 */
const parseMargin = (styleKey, styleValue) => {
  if (styleKey === 'margin' && typeof styleValue === 'string') {
    const values = value2Arr(styleValue);

    if (values.length === 1) {
      return {
        margin: unit2Num(values[0]),
      };
    } else if (values.length === 2) {
      return {
        marginVertical: unit2Num(values[0]),
        marginHorizontal: unit2Num(values[1]),
      };
    } else if (values.length === 3) {
      return {
        marginTop: unit2Num(values[0]),
        marginHorizontal: unit2Num(values[1]),
        marginBottom: unit2Num(values[2]),
      };
    } else if (values.length === 4) {
      return {
        marginTop: unit2Num(values[0]),
        marginRight: unit2Num(values[1]),
        marginBottom: unit2Num(values[2]),
        marginLeft: unit2Num(values[3]),
      };
    } else {
      throw Error('margin 样式格式错误：' + styleValue);
    }
  }

  return false;
};

/**
 * padding样式转换
 * @param  {String} styleKey   样式属性key
 * @param  {any} styleValue   样式属性值
 * @return {Object}
 */
const parsePadding = (styleKey, styleValue) => {
  if (styleKey === 'padding' && typeof styleValue === 'string') {
    const values = value2Arr(styleValue);

    if (values.length === 1) {
      return {
        padding: unit2Num(values[0]),
      };
    } else if (values.length === 2) {
      return {
        paddingVertical: unit2Num(values[0]),
        paddingHorizontal: unit2Num(values[1]),
      };
    } else if (values.length === 3) {
      return {
        paddingTop: unit2Num(values[0]),
        paddingHorizontal: unit2Num(values[1]),
        paddingBottom: unit2Num(values[2]),
      };
    } else if (values.length === 4) {
      return {
        paddingTop: unit2Num(values[0]),
        paddingRight: unit2Num(values[1]),
        paddingBottom: unit2Num(values[2]),
        paddingLeft: unit2Num(values[3]),
      };
    } else {
      throw Error(`padding样式格式错误：${styleValue}`);
    }
  }

  return false;
};

/**
 * borderRadius样式转换
 * @param  {String} styleKey   样式属性key
 * @param  {any} styleValue   样式属性值
 * @return {Object}
 */
const parseBorderRadius = (styleKey, styleValue) => {
  if (styleKey === 'borderRadius' && typeof styleValue === 'string') {
    const values = value2Arr(styleValue);

    if (values.length === 1) {
      return {
        borderRadius: unit2Num(values[0]),
      };
    } else if (values.length === 4) {
      return {
        borderTopLeftRadius: unit2Num(values[0]),
        borderTopRightRadius: unit2Num(values[1]),
        borderBottomRightRadius: unit2Num(values[2]),
        borderBottomLeftRadius: unit2Num(values[3]),
      };
    } else {
      throw Error(`borderRadius样式格式错误：${styleValue}`);
    }
  }

  return false;
};

/**
 * boxShadow样式转换
 * @param  {String} styleKey   样式属性key
 * @param  {any} styleValue   样式属性值
 * @return {Object}
 */
const parseBoxShadow = (styleKey, styleValue) => {
  if (styleKey === 'boxShadow' && typeof styleValue === 'string') {
    const values = value2Arr(styleValue);

    const shadowObj = {
      shadowOffset: {
        width: unit2Num(values[0]),
        height: unit2Num(values[1]),
      },
      shadowRadius: unit2Num(values[2]),
    };

    if (values.length === 4) {
      return {
        ...shadowObj,
        shadowColor: values[3],
      };
    } else if (values.length === 5) {
      return {
        ...shadowObj,
        shadowOpacity: Number.parseFloat(values[3]),
        shadowColor: values[4],
      };
    } else {
      throw Error(`boxShadow样式格式错误：${styleValue}`);
    }
  }

  return false;
};

/**
 * boxShadow样式转换
 * @param  {String} styleKey   样式属性key
 * @param  {any} styleValue   样式属性值
 * @return {Object}
 */
const parseTextShadow = (styleKey, styleValue) => {
  if (styleKey === 'textShadow' && typeof styleValue === 'string') {
    const values = value2Arr(styleValue);

    const shadowObj = {
      textShadowOffset: {
        width: unit2Num(values[0]),
        height: unit2Num(values[1]),
      },
      textShadowRadius: unit2Num(values[2]),
    };

    if (values.length === 4) {
      return {
        ...shadowObj,
        textShadowColor: values[3],
      };
    } else if (values.length === 5) {
      return {
        ...shadowObj,
        textShadowOpacity: Number.parseFloat(values[3]),
        textShadowColor: values[4],
      };
    } else {
      throw Error(`textShadow样式格式错误：${styleValue}`);
    }
  }

  return false;
};

/**
 * borderRadius样式转换
 * @param  {String} styleKey   样式属性key
 * @param  {any} styleValue   样式属性值
 * @return {Object}
 */
const parseBorder = (styleKey, styleValue) => {
  if (styleKey === 'border' && typeof styleValue === 'string') {
    const values = value2Arr(styleValue);

    if (values.length === 3) {
      return {
        borderWidth: unit2Num(values[0]),
        borderStyle: values[1],
        borderColor: values[2],
      };
    } else {
      throw Error(`border 样式格式错误：${styleValue}`);
    }
  }

  return false;
};

/**
 * 定位占满父元素属性转换
 * @param  {String} styleKey   样式属性key
 * @param  {any} styleValue   样式属性值
 * @return {Object}
 */
const absoluteFill = (styleKey, styleValue) => {
  if (styleKey === 'absoluteFill' && styleValue === true) {
    return StyleSheet.absoluteFillObject;
  }

  return false;
};

/**
 * 转换函数数组
 * @type {Array}
 */
export default [
  parseMargin,
  parsePadding,
  parseBorderRadius,
  parseBoxShadow,
  parseTextShadow,
  parseBorder,
  rpx2px,
  absoluteFill,
];
