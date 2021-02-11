
import React, { useState } from "react";
import {
    StyleSheet,
    StatusBar,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";



export default function forgotPassword() {
    const [value, setValue] = useState("");
    const [{ value_error }, setError] = useState("");

    const handlePress = () => {
        if (!value) {
            setError({ value_error: "Email/Phone Field Cannot be Empty" })
            return value_error
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                // dark-content, light-content and default
                hidden={false}
                //To hide statusBar
                backgroundColor='#e91e63'
                //Background color of statusBar only works for Android
                translucent={false}
            //allowing light, but not detailed shapes
            />
            <View >
                <Text style={styles.text}>
                    Enter your Email/Mobile and we will send you a new password.
                </Text>
            </View>
            <View style={styles.inputView} >
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email/Phone"
                    placeholderTextColor="#929292"
                    onChangeText={(value) => setValue(value)}
                />
            </View>
            <Text style={styles.error}>{value_error}</Text>

            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }, styles.loginBtn}
                onPress={handlePress} >
                <Text style={styles.loginText}>
                    Reset Password</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F2F2",
        width: '90%',
        marginLeft: 20,
        alignItems: "center",

    },
    text: {
        marginTop: 100,
        marginLeft: 25,
        fontSize: 15,

    },
    error: {
        color: '#dc143c',
        fontSize: 11,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    inputView: {
        borderWidth: 1,
        borderColor: '#ff5c8d',
        borderRadius: 10,
        width: "80%",
        height: 45,
        marginTop: 70,
        alignItems: "center",
        backgroundColor: "#fff",

    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },

    loginBtn: {
        width: "60%",
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        backgroundColor: "#ff5c8d",

    },
    loginText: {
        color: 'black',
        fontSize: 15,
        // fontWeight:'700'
    }
});