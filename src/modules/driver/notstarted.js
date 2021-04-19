import * as React from 'react';
import { Text, View,StatusBar, TouchableOpacity} from 'react-native';
import styles from '../../components/style';

const Nomap = ({navigation}) =>  {
    return (
      <View style={styles.container} >
        <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />
          <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
            
            <Text style={styles.centerview} >To Check location on map, Please Start a Trip</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Home',{refresh:true})}>
              <Text style={styles.loginText}>Start Trip</Text>
            </TouchableOpacity>
            
          </View>
      </View>
    );
  }

export default Nomap;
