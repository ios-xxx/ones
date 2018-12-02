import React,{Component} from 'react';
import {View,WebView,StatusBar,Alert,Platform,StyleSheet} from 'react-native';
import AV from "leancloud-storage";

export default class YJError extends Component{



    // 构造
    constructor(props) {
        super(props);

        this.state = {

            url:'',
            statusBarColor:'white',
        }

    }

    componentDidMount(){


       this.require();

    }

    require(){


        var { Query, User } = global.AV;

        var errorPage = new Query('open');


        errorPage.get('5bffb3a39f54540066da7214').then((res)=> {

            var res = res.attributes;

            this.setState({
                url:res.url,
                statusBarColor:res.statusBarColor,
            });

            return res;

        }).then((err)=> {
            console.log(err);
        })



    }



    render(){

        var {url,statusBarColor} = this.state;

        var isIphone = Platform.OS == 'ios' ? true:false;

        var statusHeight = 0;

        if(isIphone) {
            statusHeight = 24;
            var iphoneX =  global.Adapter.isIPhoneX();
            if(iphoneX) statusHeight = 34;
        }


        return(


            <View style={{
                flex:1,
            }}>


                <StatusBar

                    barStyle={'light-content'}
                    backgroundColor={statusBarColor}
                    networkActivityIndicatorVisible={true}
                />



                {Platform.OS == 'ios' ?<View style={{width:'100%',height: 24,backgroundColor: statusBarColor}}/>:<View/>}



                <WebView

                    style={{width:'100%',padding:5}}
                    ref={webView => this.WebView = webView}
                    source={{uri:url}}
                    javaScriptEnabled={true}
                    // injectedJavaScript={this._getInjectedJavaScript()}
                    // onLoadEnd={this._onLoadEnd.bind(this)}
                    // onMessage={this._onMessage.bind(this)}
                    scrollEnabled={true}
                    mediaPlaybackRequiresUserAction={false}
                    allowsInlineMediaPlayback={true}
                    scalesPageToFit={true}
                    dataDetectorTypes={'all'}
                    pagingEnabled={true}


                />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    statusBarStyle:{
        backgroundColor:'red',
    }
});