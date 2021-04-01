import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    disabledText: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disabledText: '',
    loading: false,
    disabled: false,
    style: undefined,
  };

  handlePress = (event) => {
    const {loading, disabled, onPress} = this.props;

    if (loading || disabled) {
      return;
    }

    if (onPress) {
      onPress(event);
    }
  };

  render() {
    const {text, disabledText, loading, disabled, style, ...rest} = this.props;

    return (
      <TouchableHighlight
        {...rest}
        style={[styles.button]}
        underlayColor="#1e90ff"
        onPress={this.handlePress}>
        <View>
          {loading && <ActivityIndicator animating size="small" color="#fff" />}
          {!loading && !disabled && <Text style={styles.btnText}>{text}</Text>}
          {!loading && disabled && (
            <Text style={styles.btnText}>{disabledText || text}</Text>
          )}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {  
    height: 42,
    // minWidth: 250,
    width: '60%',
    borderRadius: 10,
    backgroundColor: '#1e90ff',
    justifyContent:'center',
    alignItems: 'center',
   alignSelf:'center',
   marginTop:40,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
  },
});
