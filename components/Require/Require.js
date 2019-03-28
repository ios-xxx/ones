import Verification  from './../Verification/Verification';
var Require = {

    async get(url,headers = null, params = null, responses = () => { }, errors = () => { },) {


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

                    return response;

                })
                .catch((error) => {

                    errors(error);
                })

            if(Verification.isNull(await result)) {
                responses({msg:'获取数据失败'});
                return '';
            }


             let json = eval(result);

            if(Verification.isNull(json)) {

                responses(result);
                return;
            }

            responses(json);
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
            responses({msg:'获取数据失败'});
            return '';
        }


        let json = eval(result);

        if(Verification.isNull(json)) {

            responses(result);
            return;
        }

        responses(json);
        return;
    },


    post(url,headers,params, responses = () => { }, errors = () => { },) {

        if(Verification.isNull(headers)) {

            // headers = {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json',
            // };
        }



        if(Verification.isNull(headers)){

            fetch(url, {
                method: 'POST',
                body: params,
            })
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
            return;
        }



        fetch(url, {
            method: 'POST',
            headers: headers,
            body: params,
        })
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
