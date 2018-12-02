
import React, {Component} from 'react';
import {View, Modal, Alert, Keyboard} from 'react-native';
import {KeyboardSpace, NavigationPage,Theme, Label, Button, Overlay,NavigationBar} from 'teaset';
import LinearGradient from 'react-native-linear-gradient';
import Adapter from "../utils/Adapter";

// import NavigationPage from './NavigationPage';
//import SelectBox from '../ListRows/SelectBox';

//import LoadingIndicator from '../Overlay/LoadingIndicator';
//import DatePicker from '../DatePicker/DatePicker';
 
export default class NavigationView extends NavigationPage {

    static propTypes = {
        ...NavigationPage.propTypes,
    };

    static defaultProps = {
        ...NavigationPage.defaultProps,
        showBackButton:true,
        navigationLinearGradient: true,//是否用渐变导航条  如果 用了。要和下面的两个互反  isNavBarShow:false,navigationBarInsets: false,
        isNavBarShow: false,//同上//如果 都不显示
        navigationBarInsets: false,//同上
    };

    constructor(props) {
        super(props);
	      if (props.route) props.route.page = this;
        this.state = {
            isFocused: false,
            overlay: null,
        };
    }

    /**
     * 自定义导航bar
     */
    renderNavigationBar() {
        let {customBackground, hidden, animated, statusBarHidden} = this.state;
        let {isNavBarShow,navigationLinearGradient} = this.props;
        let NavigationBarStyle = navigationLinearGradient ? {backgroundColor: '#ffffff00'}:{};
        if(!isNavBarShow && !navigationLinearGradient){
            return null;
        }
        return (
            <NavigationBar
                title={this.renderNavigationTitle()}
                hidden={hidden}
                animated={animated}
                statusBarHidden={statusBarHidden}
                style={NavigationBarStyle}
                leftView={this.renderNavigationLeftView()}
                rightView={this.renderNavigationRightView()}
            />
        );
    }




    // //多功能选择框
    // selectBox(params) {
    //     if (this.state.overlay) return false;
    //     let {title, items, getItemText, isSelected, selectedIndex, selectedItem, onSelected} = params;
    //     params = {title, items, getItemText, isSelected, selectedIndex, selectedItem, onSelected};
    //     params.onSelected = (item, index) => {
    //         onSelected && onSelected(item, index);
    //         this.hideOverlay();
    //     }
    //     params.onOverlayPress = () => {
    //         this.hideOverlay();
    //     }
    //     this.setState({
    //         overlay: {
    //             Class: SelectBox,
    //             params: params,
    //             modal: true,
    //         }
    //     });
    //     return true;
    // }

    dismissKeyboard(){
        Keyboard.dismiss();
    }

    goToElsePage(page) {
        if (page) this.navigator.push({view: page});
    }

    // //显示页面加载动画
    // showPageLoading(modal = true) {
    //     if (this.state.overlay) return false;
    //     this.setState({
    //         overlay: {
    //             Class: LoadingIndicator,
    //             params: {modal: modal},
    //             modal: modal,
    //         }
    //     });
    //     return true;
    // }

    //隐藏页面加载动画
    // hidePageLoading() {
    //     this.hideOverlay();
    // }
    //
    // //隐藏覆盖层
    // hideOverlay() {
    //     if (this.state.overlay)
    //         this.setState({overlay: null});
    // }

    //延迟提示框
    // alertDelay(message, title = null, buttons = null, delay = 1000) {
    //     setTimeout(() => this.alert(message, title, buttons), delay);
    // }
    //带标题询问框
    showYesNoWithTitle(message, title, onYes = null, onNo = null) {
        let buttons = [
            {text: '是', onPress: onYes},
            {text: '否', onPress: onNo},
        ];
        this.alert(message, title, buttons);
    }

    // //日期选择框
    // selectDate(date, onSelected) {
    //     this.datePicker.show(
    //         {date: date, mode: 'date'},
    //         (date) => onSelected && onSelected(date)
    //     );
    // }
    // //时间选择框
    // selectTime(date, onSelected,isBarHide=true) {
    //     console.log('SeleTime');
    //     this.datePicker.show(
    //         {date: date, mode: 'time',isBarHide:isBarHide},
    //         (date) => onSelected && onSelected(date)
    //     );
    // }

    //提示框
    alert(message, title = null, buttons = null) {
        if (!buttons) buttons = [{text: '确认'}];
        Alert.alert(title ? `${title}` : null, `${message}`, buttons);
    }
    

    // _showreport(transparent, modal,Elem,style) {
    //     let overlayView = (
    //         <Overlay.View
    //             style={{alignItems: 'center', justifyContent: 'center'}}
    //             modal={modal}
    //             overlayOpacity={transparent ? 0 : null}
    //             ref={v => this.overlayView = v}
    //         >
    //             {Elem}
    //         </Overlay.View>
    //     );
    //     Overlay.show(overlayView);
    // }

    // renderOverlay() {
    //     if (!this.state.overlay) return null;
    //     let {Class, params, modal} = this.state.overlay;
    //     // let items = params;
    //     if (!modal) return <Class {...params} />;
    //     return (
    //         <Modal animationType='fade' transparent={true} visible={true} onRequestClose={() => {this.hideOverlay()}}>
    //             <Class {...params} />
    //         </Modal>
    //     );
    // }


    render() {
        console.log('NavigationView');

        let {autoKeyboardInsets, keyboardTopInsets, pageContainerStyle, onLayout, ...others} = this.buildProps();
        return (
            <View {...others}>
                <View style={{flex: 1}}>
                    <View style={pageContainerStyle}>
                        {this.props.navigationLinearGradient ?
                            <LinearGradient colors={['#197CE1', '#197CE1', '#1ABFFC']} style={styles.navStyle}>
                                {this.renderNavigationBar()}
                            </LinearGradient>
                            : null }
                        {this.renderPage()}
                    </View>
                    {this.props.navigationLinearGradient ?null : this.renderNavigationBar() }
                </View>
                {autoKeyboardInsets ? <KeyboardSpace topInsets={keyboardTopInsets}/> : null}
            </View>
        );
    }


}

const styles = {

    navStyle: {
        height: Adapter.isIPhoneX() == true ? 84 : 64,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Adapter.isIPhoneX() == true ? 24 : Adapter.getH(0),

    },

};