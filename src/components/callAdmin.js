import {Linking} from 'react-native';

const makeCall = () => {
    let call;
    call = Linking.openURL('tel:8777111223');
    return call
}

export default makeCall;