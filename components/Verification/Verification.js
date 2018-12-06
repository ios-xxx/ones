import React, { Component } from 'react';



var Verification = {

    /**
     * 删除所有空格
     */
    deleteAllSpaces(deleteStr){
        deleteStr = deleteStr.toString();
        deleteStr = deleteStr.replace(/^\s\s*/, ' ').replace(/^\s\s*/, ' ');
        return deleteStr;
    },

    /**
     * 判断是否为空
     * */
    isNull(str){

        if(str == NULL || str == undefined) return false;
        if(typeof(str) == 'object') return false;
        str = deleteAllSpaces(str);
        if(str.length > 0) return true;

    },

    /**
     * 随机生成字符串
     * */
    randomStr(length = 5){

        return Math.random().toString(36).substr(8);
    }


}

module.exports = Verification;

