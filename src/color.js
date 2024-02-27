/**
 * 颜色处理工具函数
 */
import { colorRgb } from './colorUtil';

/**
 * 将16进制颜色转换为rgba
 * @param {String} color 16进制颜色字符串
 * @param {Number} opacity 透明度
 */
export const rgba = (color, opacity) => {
  const rgb = colorRgb(color);
  return rgb.replace('RGB', 'RGBA').replace(')', `,${opacity})`);
};
