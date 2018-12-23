

import React,{Component} from 'react';
import {
    Image,
    View,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import {Label} from 'teaset';
import PropTypes from "prop-types";
import Toast from './../Toast/Toast';


export default class Button extends Component{

    static propTypes = {
        titleSize: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
        onPress:   PropTypes.element,
        titleStyle: PropTypes.element,
        iconStyle: PropTypes.element,
        backgroundImage:PropTypes.element,
        backgroundImageStyle:PropTypes.element,
        enabled:PropTypes.bool,
    }

    static defaultProps = {

        onPress:()=>{},
        icon:'',
        title:'',
        titleSize:'md',
        style:{},
        titleStyle:{},
        iconStyle:{},
        backgroundImage:'',
        backgroundImageStyle:{},
        enabled:true,

    }

    render(){

        let { onPress,enabled, icon, title,titleSize='md',style,titleStyle,iconStyle,backgroundImage,backgroundImageStyle } = this.props;
        if(icon == '') {

            icon = '';
            iconStyle={display:'none'}
        }

        if(title == '') {

            titleStyle={display:'none'}
        }



        return (
            <TouchableOpacity onPress={enabled ? onPress : ()=>Toast.showShortCenter('当前状态按钮不可响应事件')}>
                <ImageBackground
                    style={[{alignItems: 'center',flexDirection:'row'},backgroundImageStyle&&backgroundImageStyle]}
                    source={backgroundImage}
                >
                    <View style={[{alignItems: 'center',flexDirection:'row'}, style&&style]}>
                        <Image
                            source={icon}
                            resizeMode={'stretch'}
                            style={[{width:32,height:32},iconStyle&&iconStyle]}
                        />
                        <Label text={title} size={titleSize}  style={[{margin:5},titleStyle&&titleStyle]} />
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

}