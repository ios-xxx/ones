
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Platform, View, Modal, Alert, DeviceEventEmitter} from 'react-native';
import {Theme,TeaNavigator, KeyboardSpace} from 'teaset';
 
export default class BasePage extends Component {

    static propTypes = {
        ...View.propTypes,
        scene: PropTypes.object, //转场效果
        autoKeyboardInsets: PropTypes.bool, //自动插入键盘占用空间
        keyboardTopInsets: PropTypes.number, //插入键盘占用空间顶部偏移，用于底部有固定占用空间(如TabNavigator)的页面
    };

    static defaultProps = {
        ...View.defaultProps,
        scene: TeaNavigator.SceneConfigs.Replace,
        autoKeyboardInsets: Platform.OS === 'ios',
        keyboardTopInsets: 0,
    };

    static contextTypes = {
        navigator: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.didMount = false; //代替被废弃的isMounted
        this.state = {
            isFocused: false,
            overlay: null,
        };
    }

    componentDidMount() {
        this.didMount = true;
    }

    componentWillUnmount() {
        if (this.backListener) {
            this.backListener.remove();
            this.backListener = null;
        }
        this.didMount = false;
    }

    get navigator() {
        if (!this.context.navigator) {
            console.error('The root component is NOT TeaNavigator, then you can not use BasePage.navigator.');
            return null;
        }
        return this.context.navigator();
    }

    //Call after the scene transition by Navigator.onDidFocus
    onDidFocus() {
        if (!this.state.isFocused) this.setState({isFocused: true});
    }

    //Call before the scene transition by Navigator.onWillFocus
    onWillFocus() {
    }

    //Android hardware back key handler, default is pop to prev page
    onHardwareBackPress() {
        if (!this.context.navigator) return false;
        let navigator = this.context.navigator();
        if (!navigator) return false;
        if (navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    }

    //页面转场
    pushTo(Page, params, scene) {
        let {navigator} = this.props;
        if (!navigator) return;
        navigator.push({
            name: Page.name,
            component: Page,
            scene: scene ? scene : Page.defaultScene,
            params: params,
        });
    }

    //带标题询问框
    showYesNoWithTitle(message, title, onYes = null, onNo = null) {
        let buttons = [
            {text: '是', onPress: onYes},
            {text: '否', onPress: onNo},
        ];
        this.alert(message, title, buttons);
    }

    //提示框
    alert(message, title = null, buttons = null) {
        if (!buttons) buttons = [{text: '确认'}];
        Alert.alert(title ? `${title}` : null, `${message}`, buttons);
    }



    buildProps() {
        let {style, ...others} = this.props;
        style = [{
            flex: 1,
            height: 500,
            backgroundColor: Theme.pageColor,
        }].concat(style);
        return ({style, ...others});
    }

    renderPage() {
        return null;
    }

    render() {
        // this.buildProps();

        let {autoKeyboardInsets, keyboardTopInsets, ...others} = this.buildProps();
        return (
            <View {...others}>
                {this.renderPage()}
                {autoKeyboardInsets ? <KeyboardSpace topInsets={keyboardTopInsets} /> : null}
                {/*<DatePicker ref={v => this.datePicker = v} />*/}
            </View>
        );
    }


    // 打开请求动画
    openRequireAnimation(){

        this.setState({
            netState:'start',
            showRequireAnimation:true,
        })
    }

    // 关闭请求动画
    closeRequireAnimation(){

        this.setState({
            netState:'complete',
            showRequireAnimation:false,
        })
    }

    /**
     * 请求出错
     * */
    requireLoadError(){
        this.setState({netState:'error'});
    }


    /*响应刷新按钮被单击*/
    refreshBtnTap(){

        this.setState({showRequireAnimation:true,netState:'start'});
        DeviceEventEmitter.emit('netError','');
    }

    /*
    * 监听出错通知
    * */
    requireErrorNotifcation(notifcation =()=>{}){
        DeviceEventEmitter.addListener('netError',()=>{
            notifcation();
            DeviceEventEmitter.removeCurrentListener();
        });
    }



}
