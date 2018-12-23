import React, { Component } from 'react';



var Verification = {

    /**
     * 删除所有空格
     */
    deleteAllSpaces(deleteStr){

        if(typeof deleteStr == "undefined") return '';
        if(typeof deleteStr !=  "string"){ deleteStr = deleteStr.toString();}
        deleteStr = deleteStr.replace(/ /g, '');

        return deleteStr;
    },

    /**
     * 判断是否为空
     * */
    isNull(str){

        if(str == null || str == undefined || str == '') return true;
        if(typeof(str) == 'object') return false;
        str = this.deleteAllSpaces(str);
        if(str.length > 0) return false;

    },

    /**
     * 随机生成字符串
     * */
    randomStr(length = 5){

        return Math.random().toString(36).substr(8);
    }


}

module.exports = Verification;

