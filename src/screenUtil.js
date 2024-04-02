/**
 * 屏幕适配工具类
 */

import { Dimensions, StyleSheet } from 'react-native';

/* 设备宽度 */
export const deviceWidth = Dimensions.get('window').width;

/* 设备高度 */
export const deviceHeight = Dimensions.get('window').height;

/*
 * 屏幕基准宽度
 */
let baseWidth = 750;

// 单个像素大小，宽度
let w_pixelScale = deviceWidth / baseWidth;

// 单个像素大小，高度
let h_pixelScale = deviceHeight / 100;

/**
 * 设置屏幕基准宽度
 * @param  {Number} width 宽度
 * @return {undefined}
 */
export const setBaseWidth = width => {
  baseWidth = width;
  w_pixelScale = deviceWidth / width;
};

/**
 * 根据基准宽度计算实际像素
 * @param  {Number} width 设计像素
 * @return {Number}       实际像素
 */
export const rpx = width => {
  if (width === 0) {
    return 0;
  }

  const hairlineWidth = StyleSheet.hairlineWidth;

  // 1 直接返回 hairlineWidth
  if (Math.abs(width) === 1) {
    return hairlineWidth * (width > 0 ? 1 : -1);
  }

  const actualWidth = w_pixelScale * width;

  // 计算结果小于 hairlineWidth 则返回 hairlineWidth
  if (Math.abs(actualWidth) <= hairlineWidth) {
    return hairlineWidth * (width > 0 ? 1 : -1);
  }

  return Math.floor(actualWidth);
};

/**
 * 将高度转换为vh单位
 * @param  {Number} height 高度
 * @return {Number}    vh 高度
 */
export const vh = height => {
  return Math.floor(h_pixelScale * height);
};
