import Verification  from './../Verification/Verification';
var Require = {

    get(url,headers, params, responses = () => { }, errors = () => { },) {

        if(Verification.isNull(headers)) {
            headers = {'Content-Type': 'multipart/form-data;charset=utf-8',};
        }
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
            fetch(url, {
                method: 'GET',
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

        //fetch请求
        fetch(url, {
            method: 'GET',
            headers:headers,
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
