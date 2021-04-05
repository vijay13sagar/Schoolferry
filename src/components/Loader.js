import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Modal} from 'react-native';

export default function Loader({loading}) {
  return (
    <Modal
      transparent
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorHolder}>
          <ActivityIndicator animating={loading} size="large" color="#FF5C00" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000060',
  },
  activityIndicatorHolder: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
