import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container:
    {
        flex: 1
    },
    svgContainer: {
        height: height * 0.7,
        width: '90%',
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1,
        margin: 16,
        borderRadius: 10,
        overflow: 'hidden'
    },
    clearButton: {
        flex: 4,
        backgroundColor: '#ffffff90',
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clearButtonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    _chat_view: {
        flex: 1,
        backgroundColor: '#ffffff90',
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    _chat_icon: {
        width: 30,
        height: 30
    }

});