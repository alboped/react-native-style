/* 判断是否为数字 */
export const isNumber = arg => /^(-|\+)?\d+(\.\d+)?$/.test(arg);

/* 判断是否为对象 */
export const isObject = obj => Object.prototype.toString.call(obj) === '[object Array]';

/* 判断是否为数组 */
export const isArray = obj => Array.isArray(obj);
