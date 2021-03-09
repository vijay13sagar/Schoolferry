
import React, { useState } from "react";
import {
    StyleSheet,
    StatusBar,
    Text,
    View,
    TextInput,
    Button, autoFocus,
    TouchableOpacity,
} from "react-native";
export default function Otpscreen() {
    const [otp, setOtp] = useState(['-', '-', '-', '-', '-', '-']);
    const [otpVal, setOtpVal] = useState('');
    const handlePress = () => {
        if (!value1 || !value2) {
            setError({ value_error: "Password Field Cannot be Empty" })
            return value_error
        }
        if (value1 !== value2) {
            setError({ value_error: "Both Fields should be same" })
            return value_error
        }
    }
    return (
        <View style={styles.container}>
            
            <Text style={styles.tripsTitleText}>Verify Your Mobile Number</Text>
            <Text style={{ marginVertical: 20, fontWeight: "300" }}>Enter your OTP here</Text>
            <TextInput
                onChangeText={value => {
                    if (value.length > 6) {
                        return;
                    }
                    let val =
                        value + '------'.substr(0, 6 - value.length);
                    let a = [...val];
                    setOtpVal(a),
                        setOtp(value),
                        console.log("value", otp);
                }}
                style={{ height: 50 }}
                autoFocus={true}
            />
            <View style={styles.otpBoxesContainer}>
                {[0, 1, 2, 3, 4, 5].map((item, index) => (
                    <Text style={styles.otpBox} key={index}>
                        {otp[item]}
                    </Text>
                ))}
            </View>
            <Text style={{ marginVertical: 20, fontWeight: "300" }}>Didn't receive otp?</Text>
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={{textDecorationLine: 'underline'}}>Resend OTP</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F2F2",
        alignItems: "center",
        justifyContent: 'center'
    },
    tripsTitleText: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: "bold"
    },
    otpBoxesContainer: {
        flexDirection: 'row'
    },
    otpBox: {
        padding: 10,
        marginRight: 10,
        borderWidth: 1,
        fontSize: 25,
        borderColor: 'lightgrey',
        height: 50,
        width: 50,
        textAlign: 'center'
    },
    loginBtn: {
        width: "50%",
        borderRadius: 10,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff5c8d",
        alignSelf: "center",
        marginTop: 20,
    },
});
