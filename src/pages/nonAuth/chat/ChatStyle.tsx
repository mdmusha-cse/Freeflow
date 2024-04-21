
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff90',
    },
    text_input: {
        flex: 1,
        fontSize: 16,
        maxHeight: 100,
        minHeight: 40,
        color: '#000',
        marginLeft: 5
    },
    _btn: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        height: 40,
        width: 40,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    _sender_icon: {
        width: 25,
        height: 25,
        tintColor: '#6563FF'
    },
    _mail_chat_area: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 4,
        marginTop: 4
    },
    _sender_chat_box: {
        padding: 8,
        margin: 5,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        backgroundColor: '#ffffff50',
        width: '90%'
    },
    _receiver_chat_box: {
        padding: 8,
        margin: 5,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 0,
        backgroundColor: '#25D36650',
        width: '90%'
    },
    _chat_box_name: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 16,
        paddingLeft: 8
    },
    _chat_box_msg: {
        color: '#000000',
        fontSize: 12,
        paddingLeft: 8
    },
    _dateTime: {
        position: 'absolute',
        top: 5,
        right: 16,
        fontSize: 10,
        fontWeight: '800',
        color: '#000'
    }
})
