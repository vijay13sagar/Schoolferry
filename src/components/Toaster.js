import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Toaster({message, type}) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(hideToast);
  }, []);

  const hideToast = () => {
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 750,
        useNativeDriver: true,
      }).start();
    }, 4000);
  };

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            }),
          },
        ],
        height: 60,
        width: '95%',
        backgroundColor: '#fff', //'#32cd32', '#ff6347'
        position: 'absolute',
        bottom: 0,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf:'center',
        elevation:1
      }}>
      {Boolean(type == 1) ? (
        <View style={styles.failureWrapper}>
          <Ionicons name="close-circle" color="#fff" size={30} />
        </View>
      ) : (
        <View style={styles.sucessWrapper}>
          <Ionicons name="checkmark-circle" color="#fff" size={30} />
        </View>
      )}
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  failureWrapper: {
    height: '100%',
    width: 68,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sucessWrapper: {
    height: '100%',
    width: 68,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    color: '#000',
    alignSelf: 'center',
    padding:10
  },
});
