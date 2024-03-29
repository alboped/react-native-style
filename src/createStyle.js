/**
 * 创建样式公共方法
 *   - 样式单位转换；
 *   - 自定义样式属性转换；
 */

import { StyleSheet } from 'react-native';

import styleTranslateMethods from './styleTranslateMethods';
import { isObject, isArray } from './utils';

/**
 * 递归样式对象
 * @param  {Object} obj 样式对象
 * @return {Object}
 */
const styleMap = obj => {
  let styleObj = {};

  if (!obj) return obj;

  Object.keys(obj).forEach(key => {
    const item = obj[key];

    if (typeof item === 'object') {
      // 继续遍历
      styleObj[key] = styleMap(item);
    } else {
      let styleRes = false;

      styleTranslateMethods.find(method => {
        styleRes = method(key, item);
        return !!styleRes;
      });

      if (styleRes) {
        styleObj = { ...styleObj, ...styleRes };
      } else {
        styleObj[key] = item;
      }
    }
  });

  return styleObj;
};

/**
 * 转换所有样式对象
 * @param {Object} styles 样式对象
 */
const create = styles => {
  let styleObj = {};

  if (isObject(styles)) {
    styleObj = styleMap(styles);
  } else if (isArray(styles)) {
    styleObj = styles.map(style => styleMap(style));
  }

  return StyleSheet.create(styleObj);
};

/**
 * 创建单个样式对象
 * @param {Object} style 样式对象
 */
export const itemCreate = style => {
  return create({ key: style }).key;
};

export default create;
