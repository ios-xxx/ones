// Toast.js

'use strict';

import React from 'react';
import {NativeModules, Platform, PixelRatio,ActivityIndicator} from 'react-native';
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



export default class Toast {

  static showShortTop(message) {
    Toasts.message(message, 'short', 'top');
  }

  static showShortCenter(message) {
    Toasts.message(message, 'short', 'center');
  }

  static showShortBottom(message) {
    Toasts.message(message, 'short', 'bottom');
  }

  static showLongTop(message) {
    Toasts.message(message, 'long', 'top');
  }

  static showLongCenter(message) {
    Toasts.message(message, 'long', 'center');
  }

  static showLongBottom(message) {
    Toasts.message(message, 'long', 'bottom');
  }

  static success(message){
    Toasts.success(message);
  }

  static show(message) {
    let addPixelsY = Platform.OS === 'android' ? -50 * PixelRatio.get() : -30;
    Toasts.message(message, 'short', 'bottom', addPixelsY);
  }

  static showDelay(message, delay = 1000) {
    setTimeout(() => this.show(message), delay);
  }

    static customKey = null;

  static showLoading(message,modal=true) {

      if (Toasts.customKey) return;
       Toasts.customKey = Toasts.show({
          text: message,
          icon:  <ActivityIndicator size='large' color={Theme.toastIconTintColor} />,
          position: 'center',
          duration: 100000000,
           modal:modal,
      });

  }


  static hideToast() {

      if (!Toasts.customKey) return;
      Toasts.hide(Toasts.customKey);
      Toasts.customKey = null;
  }

}
