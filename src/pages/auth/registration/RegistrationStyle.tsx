import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:
    {
        flex: 1
    },
    mian_view: {
        flex: 1,
        margin: 16,
        alignItems: 'center'
    },
    title_view: {
        width: '90%',
        marginTop: '25%',
        marginBottom: '2%'
    },
    _txt: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '800',
        textAlign: 'center'
    },
    _input_view: {
        marginTop: 16,
        width: '90%',
        height: 50,
        backgroundColor: '#F4FAFC',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 10
    },

    _input_view_img: {
        height: 20,
        width: 20,
        marginLeft: 16,
        tintColor: 'gray'
    },
    _input_view_hide_show_icon: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
    },
    _input_view_hide_show_icon_img: {
        height: 20,
        width: 20,
        tintColor: 'gray'
    },
    _input_view_text_input: {
        width: '90%',
        paddingLeft: 10,
        paddingRight: 16,
        fontSize: 18,
        color: '#000'
    },

    _button: {
        borderRadius: 10,
        width: '90%',
        height: 50,
        marginTop: 25
    },
    _touchableOpacity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    _button_txt: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600'
    },
    _error_view: {
        width: '90%',
        marginTop: 4
    },
    _error_text: {
        color: 'red',
        fontSize: 12,
        marginLeft: 16
    },
    _signup_btn_section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '90%',
        marginTop: 32
    },
    _signup_left_text: {
        fontSize: 14,
        fontWeight: '500'
    },
    _signup_clickable_text: {
        fontSize: 16,
        fontWeight: '800',
        textDecorationLine: 'underline'
    }

});