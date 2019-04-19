import Verification  from './../Verification/Verification';
import {NetInfo} from 'react-native';
var Require = {

    async get(url,headers = null, params = null, responses = () => { }, errors = () => { },) {

        // 获取网络状态
        NetInfo.fetch().then((reach) => {
            if(reach == 'none' || reach == 'NONE') return responses({msg:'当前没有网络',code:0});
        });

        if (Verification.isNull(params) == false) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }else {
            params = '';
        }


        if(Verification.isNull(headers)) {

            //fetch请求
            let result = await fetch(url, {
                method: 'GET',
            })
                .then((response) => response._bodyText)
                .then((response)=>{
                    console.log(response)
                    return response;

                })
                .catch((error) => {

                    errors(error);
                })

            if(Verification.isNull(await result)) {
                responses({msg:'获取数据失败',code:0});
                return ;
            }

            try {

                JSON.parse(result);
                let json =  JSON.parse(result);
                responses(json);
            }catch (e) {
                responses(result);
            }

            return;

        }


        //fetch请求
        let result = await fetch(url, {
            method: 'GET',
            headers:headers,
        })
            .then((response) => response._bodyText)
            .then((response)=>{

                return response;

            })
            .catch((error) => {

                errors(error);
            })

        if(Verification.isNull(await result)) {
            responses({msg:'获取数据失败',code:0});
            return '';
        }


        try {

            JSON.parse(result);
            let json =  JSON.parse(result);
            responses(json);
        }catch (e) {
            responses(result);
        }
        return;
    },


    async post(url,headers,params, responses = () => { }, errors = () => { },) {

        // 获取网络状态
        NetInfo.fetch().then((reach) => {
            if(reach == 'none' || reach == 'NONE') return responses({msg:'当前没有网络',code:0});
        });


        if(Verification.isNull(headers)){

            let result = await fetch(url, {
                method: 'POST',
                body: params,
            })
                .then((response) => response._bodyText)
                .then((response)=>{

                    return response;
                })
                .catch((error) => {

                    errors(error);
                })


            if(Verification.isNull(await result)) {
                responses({msg:'获取数据失败',code:0});
                return ;
            }

            try {

                JSON.parse(result);
                let json =  JSON.parse(result);
                responses(json);
            }catch (e) {
                responses(result);
            }

            return;
        }



        let result = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: params,
        })
            .then((response) => response._bodyText)
            .then((response)=>{

                return response;

            })
            .catch((error) => {


                errors(error);

            })


        if(Verification.isNull(await result)) {
            responses({msg:'获取数据失败',code:0});
            return ;
        }

        try {

            JSON.parse(result);
            let json =  JSON.parse(result);
            responses(json);
        }catch (e) {
            responses(result);
        }

        return;


    },

    upLoad(url,headers, formData, responses = () => { }, errors = () => { },) {

        if(Verification.isNull(headers)) {
            headers = {'Content-Type': 'multipart/form-data;charset=utf-8',};
        }

        fetch(url , {
            method: 'POST',
            headers: headers,
            body: formData,}
        )
            .then((response) => response._bodyText)
            .then((response)=>{

                if(Verification.isNull(JSON.parse(response))) {

                    responses(response);
                }else {

                    responses(JSON.parse(response));
                }

            })
            .catch((error) => {

                errors(error);
            })
    },



}

module.exports = Require;
