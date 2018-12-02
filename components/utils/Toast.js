// Toast.js

'use strict';

import React from 'react';
import {NativeModules, Platform, PixelRatio,ActivityIndicator} from 'react-native';
const RCTToast = NativeModules.Toast;
import {Toast as Toasts,Theme} from 'teaset'



var optionsBuilder = function () {

  // defaults
  var message = '';
  var duration = 'short';
  var position = 'center';
  var addPixelsY = 0;

  return {
    withMessage: function(m) {
      message = m;
      return this;
    },

    withDuration: function(d) {
      duration = d;
      return this;
    },

    withPosition: function(p) {
      position = p;
      return this;
    },

    withAddPixelsY: function(y) {
      addPixelsY = Math.round(y);
      return this;
    },

    build: function() {
      return {
        message: message,
        duration: duration,
        position: position,
        addPixelsY: addPixelsY
      }
    }
  }
};

var showWithOptions = function (options) {
  RCTToast.show(options);
};

var showToast = function (message, duration, position, addPixelsY = 0) {
  showWithOptions(
    optionsBuilder()
      .withMessage(message)
      .withDuration(duration)
      .withPosition(position)
      .withAddPixelsY(addPixelsY)
      .build()
    );
};

export default class Toast {

  static showShortTop(message) {
    showToast(message, 'short', 'top');
  }

  static showShortCenter(message) {
    showToast(message, 'short', 'center');
  }

  static showShortBottom(message) {
    showToast(message, 'short', 'bottom');
  }

  static showLongTop(message) {
    showToast(message, 'long', 'top');
  }

  static showLongCenter(message) {
    showToast(message, 'long', 'center');
  }

  static showLongBottom(message) {
    showToast(message, 'long', 'bottom');
  }

  static show(message) {
    let addPixelsY = Platform.OS === 'android' ? -50 * PixelRatio.get() : -30;
    showToast(message, 'short', 'bottom', addPixelsY);
  }

  static showDelay(message, delay = 1000) {
    setTimeout(() => this.show(message), delay);
  }

  static hide() {
    RCTToast.hide();
  }

    static customKey = null;

  static showLoading(message,modal=true) {

      if (Toast.customKey) return;
       Toast.customKey = Toasts.show({
          text: message,
          icon:  <ActivityIndicator size='large' color={Theme.toastIconTintColor} />,
          position: 'center',
          duration: 100000000,
           modal:modal,
      });

  }


  static hideToast() {

      if (!Toast.customKey) return;
      Toasts.hide(Toast.customKey);
      Toast.customKey = null;
  }

}
