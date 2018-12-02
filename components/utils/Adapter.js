import {
  Platform,
  DeviceInfo,
  Dimensions
} from 'react-native';

let c_width;
let c_height;
let c_scale;
let c_fontScale;
//iphoneX或者iphoneXs 的宽高 pt
const X_WIDTH = 375;
const X_HEIGHT = 812;
//iphoneXr或者iphoneXs max的宽高 pt
const XR_WIDTH = 414;
const XR_HEIGHT = 896;
function _updateCacheConstants() {
  const dimWin = Dimensions.get('window');

  c_width = dimWin.width;
  c_height = dimWin.height;
  c_scale = dimWin.scale;
  c_fontScale = dimWin.fontScale;
}
_updateCacheConstants();

let IOS_StatusBar_Height = (() => {
  if (
    Platform.OS === 'ios' &&
    ((c_height === X_HEIGHT && c_width === X_WIDTH) ||
      (c_height === X_WIDTH && c_width === X_HEIGHT))
  ) {
    return 44;
  }
  return 20;
})();

const Adapter={

  designWidth: 375,	//设计分辨率宽度 1X
  designHeight: 667,	//设计分辨率高度 1X

  //实际状态栏高度
  statusBarHeight: Platform.select({
    ios: IOS_StatusBar_Height,
    android: 0,
  }),	//状态栏高度

  get dWidth() { return c_width; },	//本机分辨率宽度
  get dHeight() { return c_height; },	//本机分辨率高度  包含status  Bar，但不包含底部的 NavigationBar(如果有)

  get Android() { return (Platform.OS === 'android') },   //是否为安卓系统
  get IOS() { return (Platform.OS === 'ios') },           //是否为ios系统

  /**
   * 适配宽
   */
  getW(w) {
    return c_width / this.designWidth * w;
  },

  /**
   * 适配高度
   */
  getH(h) {
    return c_height / this.designHeight * h;
  },

  /**
   * 适配字体大小
   */
  getF(f) {
    return f/c_fontScale;
  },

  isIPhoneX() {
    //没有这个属性
    // return DeviceInfo.isIPhoneX_deprecated;
    return (
      Platform.OS === 'ios' &&
      ((c_height === X_HEIGHT && c_width === X_WIDTH) ||
        (c_height === X_WIDTH && c_width === X_HEIGHT))||
      ((c_height === XR_HEIGHT && c_width === XR_WIDTH) ||
        (c_height === XR_WIDTH && c_width === XR_HEIGHT))
    );
  },
}

export default Adapter;
