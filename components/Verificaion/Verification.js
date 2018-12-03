Var Verification = {
t
    /**
    * 删除所有空格
    */
    deleteAllSpaces(deleteStr){
      deleteStr = deleteStr.toString();
      deleteStr = deleteStr.replace(/^\s\s*/, ' ').replace(/^\s\s*/, ' ');
      return deleteStr;
    }

    isNull(str){

        if(str == NULL || str == undefined) return false;
        if(typeof(str) == 'object') return false;
        str = deleteAllSpaces(str);
        if(str.length > 0) return true;

    }


}

module.exports =Verification
